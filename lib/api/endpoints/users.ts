import { NotificationSetting, User, UserItemsResponse } from "lib/types/sonar-types";
import { req1, req2 } from "../request";

let search = (query: string) =>
  req2.post<{ data: User[] }>('/search/users?query=' + query)
  .then(res => res.data);

let items = (userId: number) =>
  req1.post<UserItemsResponse>('/users/items', { userId })
  .then(res => res.data);

let mute = (userId: number) =>
  req1.post<void>(`/mutes/${userId}`);

let unmute = (userId: number) =>
  req1.delete<void>(`/mutes/${userId}`);

let setNotificationSetting = (userId: number, notificationSetting: NotificationSetting) =>
  req1.post<void>(`/notifs/modify-user-setting`, { userId, notificationSetting });

let findByNames = (usernames: string[]) =>
  req1.post<{ users: User[] }>('/users/search', { usernames })
  .then(res => res.data.users);

export {  
  search,
  findByNames,
  items,
  mute,
  unmute,
  setNotificationSetting,
};
