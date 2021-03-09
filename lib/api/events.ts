import EventEmitter from 'node:events';
import TypedEmitter from 'typed-emitter';

interface GameMessageEvent {
  join_room: (data: JoinRoomPayload) => void;
  boop: (data: BoopPayload) => void;
  friend_request: (data: FriendRequest) => void;
  user_join: (data: User) => void;
  user_leave: (data: User) => void;
  user_move: (data: User) => void;
  user_text: (data: User) => void;
  user_horn: (data: User) => void;
  user_self_mute: (data: User) => void;
  user_self_unmute: (data: User) => void;
}

let events: TypedEmitter<GameMessageEvent> = new EventEmitter();

export default events;
