import * as request from 'lib/api/request';

import { ListFriendsResponse, FriendRequestResponse } from 'lib/types';

const list = () => request.get<ListFriendsResponse['friends']>('/friends-list', 'friends');

const requests = () => request.get<ListFriendsResponse['requests']>('/friends-list', 'requests');

const add = (userId: number) => request.post<FriendRequestResponse>(`/friendships/${userId}/request`);

const confirm = (userId: number) => request.post(`/friendships/${userId}/confirm`);

const remove = (userId: number) => request.delete(`/friendships/${userId}`);

const boop = (userId: number) => request.post('/poke', { userId });

export { list, requests, add, confirm, remove, boop };
