import WebSocket from 'ws';
import { encode } from 'querystring';
import { camelizeKeysInPlace, decamelizeKeys } from 'fast-case';

import { defaultHeaders } from 'lib/api/request';
import { WSS_URL } from 'lib/constants';
import { updateState, getState } from 'lib/state';
import { handleMessage, ReceivedMessage } from './handle-message';
import * as actions from './actions';

type Params = {
  roomId?: number;
  joinSilently?: boolean;
  viewportWidth?: number;
  viewportHeight?: number;
};

let createWebSocket = async (args: Params = {}) => {
  args.viewportWidth ??= 32;
  args.viewportHeight ??= 32;
  args.joinSilently ??= true;

  if (getState().ws?.readyState === WebSocket.OPEN) {
    console.warn('WebSocket already open');
    getState().ws?.close();
  }

  let queryString = encode(decamelizeKeys(args));
  let url = WSS_URL + '/join-room?' + queryString;

  // Create WebSocket
  let ws = new WebSocket(url, { headers: defaultHeaders });

  ws.addEventListener('message', (raw) => {
    let json = raw.data.toString();
    let message: ReceivedMessage = JSON.parse(json);
    camelizeKeysInPlace(message);
    handleMessage(message);
  });

  ws.addEventListener('close', ({ code, reason }) => {
    updateState(state => state.wsStatus = ws.readyState);
    console.warn('Websocket closed:' + JSON.stringify({ code, reason }));
  });

  ws.addEventListener('error', ({ error, message, type }) => {
    console.error('Websocket error: ' + JSON.stringify({ error, message, type }));
  });

  // Wait for WS connection
  await new Promise<void>(resolve => {
    if (ws.readyState === WebSocket.OPEN) {
      updateState(state => state.wsStatus = WebSocket.OPEN);
      resolve();
    }

    ws.addEventListener('open', () => {
      updateState(state => state.wsStatus = ws.readyState);
      resolve();
      ws.removeEventListener('open');
    });  
  });

  updateState(state => {
    state.ws = ws;
    state.wsStatus = ws.readyState;
  });

  return { actions };
};

export { createWebSocket, actions, updateState };
