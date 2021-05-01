import WebSocket from 'ws';
import { Assets, CurrentRoomPayload, RoomUser } from 'lib/types';

type State = typeof globalState;

const globalState = {
  ws: null as WebSocket | null,
  
  userId: 0,
  initialServerId: 0,
  room: null as CurrentRoomPayload | null,
  moveId: 0,
  
  cache: {
    users: new Map<number, RoomUser>(),
    assets: {} as Assets,
  },
};

const getState = () => globalState as Readonly<State>;

const updateState = (callback: (state: State) => void) => {
  callback(globalState);
  return globalState as Readonly<State>;
};

export { getState, updateState };
