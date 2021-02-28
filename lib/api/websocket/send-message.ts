import WebSocket from 'ws';
import { decamelizeKeys } from 'fast-case';
import { WebSocketDoesntExistError, WebSocketNotOpenError } from 'lib/errors';
import { getState } from 'lib/state';
import { sleep } from 'utils/sleep';

let sendMessage = (message: string) => new Promise<void>((resolve, reject) => {
  let { ws } = getState();

  if (!ws || ws.readyState !== WebSocket.OPEN) {
    throw WebSocketDoesntExistError();
  }

  ws.send(message, (err) => {
    if (!err) resolve();
    reject(err);
  });
});

/* Message queue */

let queue: string[] = [];
let delay = 275;
let processing = false;

let processQueue = async () => {
  if (processing) return;
  processing = true;

  // This should all be refactored eventually
  for(let i = 0; i <= 5; i += 1) {
    if (getState().ws!.readyState === WebSocket.OPEN) break;
    if (i === 5) throw WebSocketNotOpenError();
    sleep(1000);
  }

  while (queue.length) {
    await sleep(delay);
    let item = queue.shift();
    if (item) await sendMessage(item);
  }

  processing = false;
};

let dispatchAction = async (type: string, data?: Record<string, any>) => {
  let action = decamelizeKeys({ type, data });
  let json = JSON.stringify(action);
  queue.push(json);
  await processQueue();
};

export { 
  dispatchAction,
};

