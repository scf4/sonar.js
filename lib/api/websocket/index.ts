import WebSocket from 'ws';
import { encode } from 'querystring';
import { camelizeKeysInPlace, decamelizeKeys } from 'fast-case';

import { getHeaders } from 'lib/api/request';
import { WSS_URL } from 'lib/constants';
import { updateState, getState } from 'lib/store';
import * as actions from './actions';
import { handleMessage, ReceivedMessage } from './handle-message';
import { sleep } from 'lib/utils/sleep';
import { omit } from 'lodash';

type Params = {
  roomId?: number;
  serverId?: number;
  joinSilently?: boolean;
  viewportWidth?: number;
  viewportHeight?: number;
};

// Keep alive
let timeout: NodeJS.Timeout;

const heartbeat = (ws: WebSocket) => {
  clearTimeout(timeout);
  timeout = setTimeout(ws.terminate, 35_000);
};

const createWebSocket = async (args: Params = {}) => {
  args.viewportWidth ??= 35;
  args.viewportHeight ??= 35;
  args.joinSilently ||= undefined;
  args.roomId = args.serverId;

  const readyState = getState().ws?.readyState;

  if (readyState === WebSocket.OPEN || readyState === WebSocket.CONNECTING || readyState === WebSocket.CLOSING) {
    getState().ws?.close(1001);
    await sleep(1200);
    getState().ws?.terminate();
    await sleep(1200);
  }

  const queryString = encode(decamelizeKeys(omit(args, 'serverId')));
  const url = WSS_URL + '/join-room?' + queryString;

  console.log(`WS connecting to ${url}`);

  // Create websocket instance
  const ws = new WebSocket(url, { headers: getHeaders() });

  const connectionPromise = new Promise<void>(resolve => {
    ws.addEventListener('open', () => (heartbeat(ws), resolve()));
  });

  updateState(state => state.ws = ws);

  ws.addEventListener('error', ({ error, message, type }) => {
    console.error('Websocket error event: ' + JSON.stringify({ error, message, type }));
    process.exit(500);
  });

  ws.addEventListener('message', msg => {
    const data: ReceivedMessage = JSON.parse(msg.data);
    camelizeKeysInPlace(data);

    try {
      handleMessage(data);
    } catch(e) {
      console.error('Websocket message event error:');
      console.error(e);
    }
  });

  ws.addEventListener('close', ({ wasClean, code, reason }) => {
    clearTimeout(timeout);
    console.info('Websocket closed event: ' + JSON.stringify({ code, reason, wasClean }));
  });

  // Wait for WS connection
  await connectionPromise;

  return { actions };
};

export { createWebSocket, actions };
