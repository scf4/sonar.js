import { getState } from 'lib/state';
import { req1, req2 } from 'lib/api/request';
import { createWebSocket } from 'lib/api/websocket';
import { ListRoomsResponse, CreateRoomResponse, User, GetRoomResponse } from 'lib/types/sonar-types';

let current = () => getState()?.room ?? null;

let join = createWebSocket;

let list = () => req1.get<ListRoomsResponse>('/rooms')
  .then(res => res.data.rooms);

let create = () => req1.post<CreateRoomResponse>('/rooms')
  .then(res => res.data.room);

let rename = (roomId: number, name: string) => req1
  .patch<void>(`/rooms/${roomId}`, { name });

let remove = (roomId: number) => req1
  .delete<void>(`/room-memberships/${roomId}`);

let invite = (roomId: number, userId: number) => req1
  .post<void>(`/rooms/${roomId}/invite`, { userId });

let uninvite = (roomId: number, userId: number) => req1
  .post<void>(`/rooms/${roomId}/uninvite`, { userId });

let uninvitedFriends = (roomId: number) => req1
  .get<User[]>(`/rooms/${roomId}/uninvited-friends`)
  .then(res => res.data);

let ban = (roomId: number, userId: number) => req1
  .post<void>(`/rooms/${roomId}/banned_users/add`, { userId });

let unban = (roomId: number, userId: number) => req1
  .post<void>(`/rooms/${roomId}/banned_users/remove`, { userId });

let addModerator = (roomId: number, userId: number) => req1
  .post<void>(`/rooms/${roomId}/moderators/add`, { userId });

let removeModerator = (roomId: number, userId: number) => req1
  .post<void>(`/rooms/${roomId}/moderators/remove`, { userId });

let lockEditing = (roomId: number) => req1
  .patch<void>(`/rooms/${roomId}`, { droppablesModification_permission: 'creator_only' });

let unlockEditing = (roomId: number) => req1
  .patch<void>(`/rooms/${roomId}`, { droppablesModificationPermission: 'everyone' });

let lock = (roomId: number) => req1
  .post<void>(`/rooms/${roomId}/lock`);

let unlock = (roomId: number) => req1
  .post<void>(`/rooms/${roomId}/unlock`);

let meta = (roomId: number) => req2
  .get<GetRoomResponse>(`/rooms/${roomId}`)
  .then(res => res.data);

let moderators = (roomId: number) => meta(roomId)
  .then(data => data.moderators);

let members = (roomId: number) => meta(roomId)
  .then(data => data.members);

let bannedUsers = (roomId: number) => meta(roomId)
  .then(data => data.banned);

export {
  current,
  list,
  join,
  create,
  rename,
  remove,
  lock,
  unlock,
  invite,
  uninvite,
  uninvitedFriends,
  bannedUsers,
  members,
  moderators,
  ban,
  unban,
  addModerator,
  removeModerator,
  lockEditing,
  unlockEditing,
  meta,
};
