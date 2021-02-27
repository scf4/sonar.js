import type WebSocket from 'ws';

// TODO: Replace with proper state management in the future

interface State {
  ws: Maybe<WebSocket>;

  authToken: string;
  clientName: string;
  initialRoomId?: number;

  userId: number;
  moveId: number;

  currentRoom?: {
    x: number,
    y: number,
    data: Room,
    entities: Droppable[]
  };

  friends: Set<number>;
  friendRequests: Set<number>;
  rooms: Set<number>;

  /* Cache */
  assets: Assets;
  asssetsHash?: string;
  cache: {
    users: Map<number, any>;
    rooms: Map<number, any>;
  };
}

let state = {
  ws: null,
  friends: new Set(),
  friendRequests: new Set(),
  rooms: new Set(),
  cache: {
    users: new Map(),
    rooms: new Map(),
  }
} as State;

let getState = () => state as Readonly<State>;

// TODO
let updateState = (callback: (data: State) => any) => {
  return callback(state);
};

export { getState, updateState };
