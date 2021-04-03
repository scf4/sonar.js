import { FriendRequestPayload, CurrentRoomPayload, RoomUser, Droppable } from './sonar';

export interface GameMessageEvent {
  join_room: (room: CurrentRoomPayload) => void;
  boop: (boop: BoopPayload) => void;
  friend_request: (data: FriendRequestPayload) => void;
  user_join: (data: RoomUser) => void;
  user_leave: (data: RoomUser) => void;
  user_move: (data: RoomUser) => void;
  user_text: (data: RoomUser) => void;
  user_horn: (data: RoomUser) => void;
  user_self_mute: (data: RoomUser) => void;
  user_self_unmute: (data: RoomUser) => void;
  object_spawn: (data: Droppable) => void;
}

export interface BoopPayload {
  roomId: number;
  roomName: string;
  username: string;
}

export type JoinRoomPayload = CurrentRoomPayload;

export * from './sonar';
