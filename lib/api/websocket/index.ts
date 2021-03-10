import WebSocket from 'ws';
import { encode } from 'querystring';
import { camelizeKeysInPlace, decamelizeKeys } from 'fast-case';

import { getHeaders } from 'lib/api/request';
import { WSS_URL } from 'lib/constants';
import { updateState, getState } from 'lib/state';
import * as actions from './actions';
import { handleMessage, ReceivedMessage } from './handle-message';

type Params = {
  roomId?: number;
  joinSilently?: boolean;
  viewportWidth?: number;
  viewportHeight?: number;
};

let createWebSocket = async (args: Params = {}) => {
  args.viewportWidth ??= 31;
  args.viewportHeight ??= 31;
  args.joinSilently ??= true;

  if (getState().ws?.readyState === WebSocket.OPEN) {
    console.warn('WebSocket already open');
    getState().ws?.close();
  }

  let queryString = encode(decamelizeKeys(args));
  let url = WSS_URL + '/join-room?' + queryString;

  console.log(url);

  // Create websocket
  let ws = new WebSocket(url, { headers: getHeaders() });

  ws.addEventListener('message', msg => {
    let data: ReceivedMessage = JSON.parse(msg.data);
    camelizeKeysInPlace(data);
    handleMessage(data);
  });

  ws.addEventListener('close', ({ wasClean, code, reason }) => {
    updateState(state => state.wsStatus = ws.readyState);
    console.warn('Websocket closed:' + JSON.stringify({ code, reason, wasClean }));
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
      // ws.send('Ping');
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
