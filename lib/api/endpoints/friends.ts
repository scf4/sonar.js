import { req1 } from 'lib/api/request';
import { ListFriendsResponse, FriendRequestResponse } from 'lib/types/sonar-types';

let list = () => req1.get<ListFriendsResponse>('/friends-list')
  .then(res => res.data.friends);

let requests = () => req1.get<ListFriendsResponse>('/friends-list')
  .then(res => res.data.requests);

let add = (userId: number) => req1.post<FriendRequestResponse>(`/friendships/${userId}/request`);

let confirm = (userId: number) => req1.post(`/friendships/${userId}/confirm`);

let remove = (userId: number) => req1.delete(`/friendships/${userId}`);

let boop = (userId: number) =>  req1.post('/poke', { userId });

export {
  list,
  requests,
  add,
  confirm,
  remove,
  boop,
};
