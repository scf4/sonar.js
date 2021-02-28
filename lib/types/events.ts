type EventName = 
| 'join_room'
| 'boop'
| 'friend_request'
| 'user_join'
| 'user_leave'
| 'user_move'
| 'user_text'
| 'user_horn'
| 'user_mute'
| 'user_unmute'

type EventHandler = (data: any) => Promise<void> | void;

interface BoopData {
  roomId: number;
  roomName: string;
  username: string;
}