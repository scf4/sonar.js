import { getState } from 'lib/store';
import * as request from 'lib/api/request';
import { createWebSocket } from 'lib/api/websocket';
import { User, ListRoomsResponse, CreateRoomResponse, GetRoomResponse } from 'lib/types/index';

const current = () => getState()?.room ?? null;

const join = createWebSocket;

const list = () => request.get<ListRoomsResponse['rooms']>('/rooms', 'rooms');

const create = () => request.post<CreateRoomResponse>('/rooms', 'room');

const rename = (serverId: number, name: string) =>
  request.patch(`/rooms/${serverId}`, { name });

const remove = (serverId: number) =>
  request.delete(`/rooms/${serverId}`, 2);

const invite = (serverId: number, userId: number) =>
  request.post(`/rooms/${serverId}/invite`, { userId });

const uninvite = (serverId: number, userId: number) =>
  request.post(`/rooms/${serverId}/uninvite`, { userId });

const inviteFriendsList = (serverId: number) =>
  request.get<User[]>(`/rooms/${serverId}/uninvited-friends`);

const ban = (serverId: number, userId: number) =>
  request.post(`/rooms/${serverId}/banned_users/add`, { userId });

const unban = (serverId: number, userId: number) =>
  request.post(`/rooms/${serverId}/banned_users/remove`, { userId });

const addModerator = (serverId: number, userId: number) =>
  request.post(`/rooms/${serverId}/moderators/add`, { userId });

const removeModerator = (serverId: number, userId: number) =>
  request.post(`/rooms/${serverId}/moderators/remove`, { userId });

const lockEditing = (serverId: number) =>
  request.patch(`/rooms/${serverId}`, {
    droppablesModification_permission: 'creator_only',
  });

const unlockEditing = (serverId: number) =>
  request.patch(`/rooms/${serverId}`, {
    droppablesModificationPermission: 'everyone',
  });

const lock = (serverId: number) => request.post(`/rooms/${serverId}/lock`);

const unlock = (serverId: number) => request.post(`/rooms/${serverId}/unlock`);

const meta = (serverId: number, prop?: string) =>
  request.get<GetRoomResponse>(`/rooms/${serverId}`, prop, 2);

const moderatorList = (serverId: number) => meta(serverId, 'moderators');

const memberList = (serverId: number) => meta(serverId, 'members');

const bannedUserList = (serverId: number) => meta(serverId, 'banned');

const setHomeServer = (homeServerId: number) => request.post('/set-home-server', { homeServerId });

const unsetHomeServer = () => request.post('/clear-home-server');

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

  bannedUserList,
  memberList,
  moderatorList,

  inviteFriendsList,

  ban,
  unban,
  addModerator,
  removeModerator,
  lockEditing,
  unlockEditing,
  meta,

  setHomeServer,
  unsetHomeServer,
};
