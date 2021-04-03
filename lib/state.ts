import type WebSocket from 'ws';
import { Assets, CurrentRoomPayload } from 'lib/types';

interface State {
  userId: number;

  ws: Maybe<WebSocket>;
  wsStatus: number;
  retryCount: number;
  shuttingDown: boolean;

  initialServerId?: number;
  room?: CurrentRoomPayload;
  moveId: number;

  friends: Set<number>;
  friendRequests: Set<number>;
  rooms: Set<number>;

  cache: {
    assets: Assets;
    users: Map<number, any>;
    rooms: Map<number, any>;
  };
}

const globalState = {
  ws: null,
  wsStatus: 0,
  retryCount: 0,
  shuttingDown: false,

  friends: new Set(),
  friendRequests: new Set(),
  rooms: new Set(),

  cache: {
    assets: {},
    users: new Map(),
    rooms: new Map(),
  },
} as State;

const getState = () => globalState as Readonly<State>;

const updateState = (callback: (state: State) => void) => {
  callback(globalState);
  return globalState as Readonly<State>;
};

export { getState, updateState };
