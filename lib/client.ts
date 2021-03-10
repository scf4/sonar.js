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

let createApiClient = async (args?: Partial<ClientArgs>, createWebSocket = true) => {
  updateState(state => {
    state.userId ??= args?.userId ?? Number(process.env.USER_ID);
    state.initialRoomId ??= args?.roomId ?? Number(process.env.ROOM_ID);
    state.roomId ??= state.initialRoomId;
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
    void api.rooms.join({ roomId });
  }
  
  return api;
};

export {
  createApiClient,
};
