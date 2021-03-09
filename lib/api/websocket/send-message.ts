import WebSocket from 'ws';
import { getState } from 'lib/state';
import { WebSocketDoesntExistError, WebSocketNotOpenError } from 'lib/errors';
import { WS_SEND_MESSAGE_RATE_LIMIT } from 'lib/constants';
import { sleep } from 'utils/sleep';
import { reject } from 'lodash';

interface Message {
  type: string;
  data?: Maybe<Record<string, any>>;
  error?: any;
}

/* Message queue */
let messageId = 0;
let isProcessing = false;
let queue: Array<Message> = [];
let history: Record<number, Message>;

let sendAction = async (type: string, data?: Message['data']) => {
  queue.push({ type, data });
  await processQueue();
};

let processQueue = async () => {
  if (!isProcessing) {
    while (queue.length) {
      let message = queue.shift();
      
      if (message) {
        await sendMessage(message);
        messageId += 1;
        history[messageId] = message;
      }

      isProcessing = !queue.length;
      await sleep(WS_SEND_MESSAGE_RATE_LIMIT);
    }
  }
};

let sendMessage = (data: Message) => new Promise<Message>(resolve => {
  let ws = getState().ws;
  if (!ws) throw WebSocketDoesntExistError();
  if (ws?.readyState !== WebSocket.OPEN) throw WebSocketNotOpenError();

  let message = JSON.stringify(data, ['type', 'data']);

  let callback = (err?: Error) => err ? reject(err) : resolve(data);
  ws.send(message, callback);
});

export { 
  sendAction,
  history,
};

