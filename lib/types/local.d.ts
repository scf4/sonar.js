module 'dotenv/config';
module 'fast-case';
module '2d-array-rotation';

type Maybe<T> = T | null | undefined;

type Assets = Omit<AssetsResponse, 'droppables'> & {
  droppables: Map<string, Droppable>;
}

/* Local message events */

interface JoinRoomPayload {
  id: number;
  users: User[];
  objects: Droppable[];
}

interface BoopPayload {
  roomId: number;
  roomName: string;
  username: string;
}