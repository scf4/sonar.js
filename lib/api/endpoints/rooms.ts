import { getState } from 'lib/state';
import { request, request2 } from 'lib/api/request';
import { createWebSocket } from 'lib/api/websocket';

let current = () => getState()?.currentRoom ?? null;

let join = createWebSocket;

let list = () => request
  .get<ListRoomsResponse>('/rooms')
  .then(res => res.data.rooms);

let create = () => request
  .post<CreateRoomResponse>('/rooms')
  .then(res => res.data.room);

let rename = (roomId: number, name: string) => request
  .patch(`/rooms/${roomId}`, { name });

let remove = (roomId: number) => request
  .delete(`/room-memberships/${roomId}`);

let invite = (roomId: number, userId: number) => request
  .post(`/rooms/${roomId}/invite`, { userId });

let uninvite = (roomId: number, userId: number) => request
  .post(`/rooms/${roomId}/uninvite`, { userId });

let uninvitedFriends = (roomId: number) => request
  .get<User[]>(`/rooms/${roomId}/uninvited-friends`)
  .then(res => res.data);

let ban = (roomId: number, userId: number) => request
  .post(`/rooms/${roomId}/banned_users/add`, { userId });

let unban = (roomId: number, userId: number) => request
  .post(`/rooms/${roomId}/banned_users/remove`, { userId });

let addModerator = (roomId: number, userId: number) => request
  .post(`/rooms/${roomId}/moderators/add`, { userId });

let removeModerator = (roomId: number, userId: number) => request
  .post(`/rooms/${roomId}/moderators/remove`, { userId });

let lockEditing = (roomId: number) => request
  .patch(`/rooms/${roomId}`, { droppablesModification_permission: 'creator_only' });

let unlockEditing = (roomId: number) => request
  .patch(`/rooms/${roomId}`, { droppablesModificationPermission: 'everyone' });

let lock = (roomId: number) => request
  .post(`/rooms/${roomId}/lock`);

let unlock = (roomId: number) => request
  .post(`/rooms/${roomId}/unlock`);

let meta = (roomId: number) => request2
  .get(`/rooms/${roomId}`)
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
