import { decamelizeKeys } from 'fast-case';
import WebSocket from 'ws';

import { getState } from 'lib/state';
import { WebSocketDoesntExistError, WebSocketNotOpenError } from 'lib/errors';
import { WS_SEND_MESSAGE_RATE_LIMIT } from 'lib/constants';
import { sleep } from 'utils/sleep';
import { createWebSocket } from 'lib/api/websocket';

interface Message {
  type: string;
  data?: Maybe<Record<string, any>>;
  error?: any;
}

/* Message queue */

// let _messageId = 0;
let isProcessing = false;
let queue: Message[] = [];
let history: Message[] = [];

let sendAction = async (type: string, data?: Message['data']) => {
  queue.push({ type, data });
  await processQueue();
};

let processQueue = async () => {
  if (isProcessing) return;

  if (getState().ws?.readyState !== WebSocket.OPEN) {
    console.warn(`Initializing websocket before continuing…`);
    await createWebSocket({}, true);
  }

  while (queue.length > 0) {
    let message = queue.shift();

    console.log('Processing queue item');
    
    if (message) {
      await sendMessage(message);
      // messageId = history.push(message) - 1;
    }

    await sleep(WS_SEND_MESSAGE_RATE_LIMIT);
  }
};

let sendMessage = (data: Message) => new Promise<Message>((resolve, reject) => {
  let ws = getState().ws;
  if (!ws) throw WebSocketDoesntExistError();
  if (ws?.readyState !== WebSocket.OPEN) throw WebSocketNotOpenError();

  
  let message = JSON.stringify(decamelizeKeys(data));

  console.log({ sentMessage: message });

  ws.send(message, (err?: Error) => err ? reject(err) : resolve(data));
});

export { 
  sendAction,
  history,
};

