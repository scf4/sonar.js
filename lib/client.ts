require('dotenv/config');

import * as api from './api';
import { setAuthData } from './api/auth';
import { ClientArgMissingError } from './errors';
import { getState, updateState } from './state';

interface ClientArgs {
  authToken: string;
  clientName: string;
  userId: number;
  roomId: number
}

export type Client = typeof api;

let createClient = async (args?: Partial<ClientArgs>, createWebSocket = true): Promise<Client> => {
  updateState(state => {
    state.userId ??= args?.userId ?? Number(process.env.USER_ID);
    state.initialRoomId ??= args?.roomId ?? Number(process.env.ROOM_ID);
  });

  setAuthData(store => {
    store.authToken ??= args?.authToken ?? ClientArgMissingError('authToken');
    store.clientName ??= args?.clientName ?? ClientArgMissingError('clientName');
  });
  
  await api.launch.stateCheck();
  await api.launch.loadAssets();
  
  // Open websocket connection and join room
  if (createWebSocket) {
    let roomId = getState().initialRoomId;
    await api.rooms.join({ roomId });
  }
  
  return api;
};

export { createClient };
