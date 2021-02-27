import { request } from './request';
import { createWebSocket } from './websocket';

let listRooms = () => request
  .get<ListRoomsResponse>('/rooms')
  .then(res => res.data.rooms);

let createRoom = () => request
  .post<CreateRoomResponse>('/rooms')
  .then(res => res.data.room);

let joinRoom = createWebSocket;

export {
  listRooms as list,
  createRoom as create,
  joinRoom as join,
};
