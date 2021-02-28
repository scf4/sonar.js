import WebSocket from 'ws';
import { encode } from 'querystring';
import { camelizeKeysInPlace, decamelizeKeys } from 'fast-case';

import { getHeaders } from '../request';
import { WSS_URL } from '../../constants';
import { updateState } from '../../state';
import { handleMessage, ReceivedMessage } from './handle-message';
import * as actions from './actions';
import { WebSocketDidntConnectError } from '../../errors';
import { sleep } from '../../utils/sleep';

type Params = {
  roomId?: number;
  joinSilently?: boolean;
  viewportWidth?: number;
  viewportHeight?: number; 
};

let createWebSocket = async (args: Params) => {
  args.viewportWidth ??= 32;
  args.viewportHeight ??= 32;
  args.joinSilently ??= true;
  
  let didConnect = false;

  let state = {
    ws: null as WebSocket | null,
    didInitiallyConnect: false,
    didReceiveMessage: false,
  };

  let queryString = encode(decamelizeKeys(args) as Record<string, any>);
  let url = WSS_URL + '/join-room?' + queryString;

  let ws = new WebSocket(url, {
    headers: getHeaders(),
  });

  updateState(state => state.ws = ws);

  if (state.ws?.readyState === WebSocket.OPEN) {
    console.warn('WebSocket already open.');
    actions.closeWebsocket();
    await sleep(1000);
  }

  ws.onopen = async () => {
    didConnect = true;
  };

  ws.onmessage = (raw) => {  
    let json = raw.data.toString();
    let message: ReceivedMessage = JSON.parse(json);

    camelizeKeysInPlace(message);
    handleMessage(message);
  };

  ws.onclose = ({ code, reason }) => {
    console.warn('Websocket closed:' + JSON.stringify({ code, reason }));
  };

  ws.onerror = ({ error, message, type }) => {
    console.error('Websocket error: ' + JSON.stringify({ error, message, type }));
  };

  let isConnectedPromise = new Promise<boolean>((res, rej) => {
    let i = 0;

    setInterval(() => {
      i += 1;
      if (didConnect) res(true);
      if (i === 10 && !didConnect) rej(WebSocketDidntConnectError());
    }, 500);
  });

  await isConnectedPromise;
  
  return { ws, actions };
};

// let closeWebSocket = (reason = 'unknown') => {
//   let ws = {} as any;
//   try {
//     if (ws?.readyState === WebSocket.OPEN) {
//       actions.closeWebsocket(reason);
//       ws.close();
//     }
//   } catch {}
// };

// process.on('exit', closeWebSocket);
// process.on('beforeExit', closeWebSocket);

export { createWebSocket, actions };
