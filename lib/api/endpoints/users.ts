import { request } from 'lib/api/request';
import { SearchUsersResponse, UserItemsResponse, NotificationSetting } from 'lib/types/sonar-types';

let search = (usernames: string[]) => request
  .post<SearchUsersResponse>('/users/search', { usernames })
  .then(res => res.data.users);

let items = (userId: number) => request
  .post<UserItemsResponse>('/users/items', { userId })
  .then(res => res.data);

let mute = (userId: number) => request
  .post(`/mutes/${userId}`);

let unmute = (userId: number) => request
  .delete(`/mutes/${userId}`);

let setNotificationSetting = (userId: number, notificationSetting: NotificationSetting) => request
  .post(`/notifs/modify-user-setting`, { userId, notificationSetting });

export {
  search,
  items,
  mute,
  unmute,
  setNotificationSetting,
};
