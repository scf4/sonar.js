require('dotenv/config');

import * as api from 'lib/api';
import { setAuthData } from 'lib/api/auth';
import { getState, updateState } from 'lib/store';
import { ClientArgMissingError } from './errors';

interface ClientArgs {
  authToken: string;
  clientName: string;
  userId: number;
  serverId: number;
  roomId: number;
}

const createClient = async (args: Maybe<Partial<ClientArgs>>, createWebSocket = true): Promise<Client> => {
  updateState(state => {
    state.userId ??= args?.userId ?? Number(process.env.USER_ID);
    state.initialServerId ??= args?.serverId ?? Number(process.env.SERVER_ID) ?? args?.roomId;
  });

  setAuthData(store => {
    store.authToken ??= args?.authToken ?? ClientArgMissingError('authToken');
    store.clientName ??= args?.clientName ?? ClientArgMissingError('clientName');
  });

  await api.launch.stateCheck();
  await api.launch.loadAssets();

  // Open websocket connection and join room
  if (createWebSocket) {
    const serverId = getState().initialServerId;
    await api.rooms.join({ serverId });
  }

  return api;
};

export type Client = typeof api;

export { createClient };
