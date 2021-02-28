import WebSocket from 'ws';
import { encode } from 'querystring';
import { camelizeKeysInPlace, decamelizeKeys } from 'fast-case';

import { getHeaders } from 'lib/api/request';
import { WSS_URL } from 'lib/constants';
import { updateState } from 'lib/state';
import { handleMessage, ReceivedMessage } from './handle-message';
import * as actions from './actions';

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
  
  let state = {
    ws: null as WebSocket | null,
    didInitiallyConnect: false,
    didReceiveMessage: false,
  };
  
  if (state.ws?.readyState === WebSocket.OPEN) {
    console.warn('WebSocket already open.');
    await actions.closeWebsocket();
  }

  let queryString = encode(decamelizeKeys(args));
  let url = WSS_URL + '/join-room?' + queryString;
  let ws = new WebSocket(url, { headers: getHeaders() });

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

  await new Promise<void>((resolve) => {
    ws.onopen = () => resolve();
    if (ws.readyState === WebSocket.OPEN) resolve();
  });

  updateState(state => {
    state.ws = ws;
  });

  return { actions };
};

let closeWebSocket = async (reason = 'unknown') => {
  let ws: WebSocket | undefined;
  if (ws?.readyState === WebSocket.OPEN) {
    await actions.closeWebsocket(reason);
    ws.close();
  }
};

process.on('beforeExit', closeWebSocket);

export { createWebSocket, actions };
