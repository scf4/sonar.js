import { CurrentRoomPayload, RoomUser, ObjectEntity } from './sonar';

export interface GameMessageEvent {
  joinedServer: (room: JoinedServerPayload) => void;
  receivedPing: (boop: PingPayload) => void;
  receivedFriendRequest: (user: { name: string, id: Maybe<number> }) => void;
  userJoined: (data: RoomUser) => void;
  userLeft: (data: RoomUser) => void;
  userMoved: (data: RoomUser) => void;
  userUpdatedStatusText: (data: RoomUser) => void;
  userHorn: (data: RoomUser) => void;
  userMutedSelf: (data: RoomUser) => void;
  userUnmutedSelf: (data: RoomUser) => void;
  objectSpawned: (data: ObjectEntity) => void;
  objectDespawned: (data: ObjectEntity) => void;
  objectDropped: (data: Pick<ObjectEntity, 'id' | 'name' | 'position'>) => void;
}

export interface PingPayload {
  roomId: number;
  roomName: string;
  username: string;
}

export type JoinedServerPayload = CurrentRoomPayload;

export * from './sonar';
