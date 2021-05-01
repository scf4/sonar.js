import { decamelizeKeys } from 'fast-case';
import WebSocket from 'ws';

import { getState } from 'lib/store';
import { WebSocketDoesntExistError, WebSocketNotOpenError } from 'lib/errors';
import { WS_RATE_LIMIT } from 'lib/constants';
import { sleep } from 'utils/sleep';

interface Message {
  type: string;
  data?: Maybe<Record<string, any>>;
  error?: any;
}

/* Message queue */
const isProcessing = false;
const queue: Message[] = [];

const sendAction = async (type: string, data?: Message['data']) => {
  queue.push({ type, data });
  await processQueue();
};

const processQueue = async () => {
  if (isProcessing) return;

  const { ws } = getState();

  if (!ws || ws.readyState < 2) throw WebSocketNotOpenError();

  while (queue.length > 0) {
    const message = queue.shift();

    if (!message) continue;

    try {
      await sendMessage(message);
    } catch (e) {
      console.error('sendMessage error:');
      console.error(e);
    }
    await sleep(WS_RATE_LIMIT);
  }
};

const sendMessage = (data: Message) =>
  new Promise<Message>((resolve, reject) => {
    const ws = getState().ws;

    if (!ws) throw WebSocketDoesntExistError();
    if (ws.readyState !== WebSocket.OPEN) throw WebSocketNotOpenError();

    const message = JSON.stringify(decamelizeKeys(data));

    ws.send(message, (err?: Error) => (err ? reject(err) : resolve(data)));
  });

export { sendAction };
