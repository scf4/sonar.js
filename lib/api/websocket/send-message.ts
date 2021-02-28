import WebSocket from 'ws';
import { decamelizeKeys } from 'fast-case';
import { WebSocketDoesntExistError, WebSocketNotOpenError } from '../../errors';
import { getState } from '../../state';
import { sleep } from '../../utils/sleep';

let sendMessage = (message: string) => new Promise<void>((res, rej) => {
  let { ws } = getState();
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    throw WebSocketDoesntExistError();
  }

  ws.send(message, (err) => {
    if (!err) res();
    rej(err);
  });
});

// Message queue

let queue: string[] = [];
let delay = 400;
let processing = false;

let processQueue = async () => {
  if (processing) return;
  processing = true;

  // This should all be refactored eventually
  for(let i = 0; i <= 5; i += 1) {
    if (getState().ws!.readyState === WebSocket.OPEN) {   
      break;
    } else {
      sleep(750);
    }
    if (i === 5) throw WebSocketNotOpenError();
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

