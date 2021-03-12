import { request } from 'lib/api/request';
import { ListFriendsResponse } from 'lib/types/sonar-types';

let list = () => request
  .get<ListFriendsResponse>('/friends-list')
  .then(res => res.data.friends);

let requests = () => request
  .get<ListFriendsResponse>('/friends-list')
  .then(res => res.data.requests);

let add = (userId: number) =>
  request.post(`/friendships/${userId}/request`);

let confirm = (userId: number) =>
  request.post(`/friendships/${userId}/confirm`);

let remove = (userId: number) =>
  request.delete(`/friendships/${userId}`);

let boop = (userId: number) => 
  request.post('/poke', { userId });

export {
  list,
  requests,
  add,
  confirm,
  remove,
  boop,
};
