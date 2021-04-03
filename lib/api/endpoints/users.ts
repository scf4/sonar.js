import * as request from 'lib/api/request';
import { User, UserItemsResponse, NotificationSetting } from 'lib/types';

const search = (query: string) => request.post<{ data: User[] }>('/search/users?query=' + query);

const items = (userId: number) => request.post<UserItemsResponse>('/users/items', { userId });

const mute = (userId: number) => request.post(`/mutes/${userId}`);

const unmute = (userId: number) => request.delete(`/mutes/${userId}`);

const setNotificationSetting = (userId: number, notificationSetting: NotificationSetting) =>
  request.post('/notifs/modify-user-setting', {
    userId,
    notificationSetting,
  });

const findByNames = (usernames: string[]) =>
  request.post<{ users: User[] }>('/users/search', { usernames }, 'users');

export { search, findByNames, items, mute, unmute, setNotificationSetting };
