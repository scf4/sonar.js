import { request } from '../api/request';

let listFriends = () => 
  request.get<ListFriendsResponse>('/friends-list')
    .then(res => res.data);
  
let addFriend = (userId: string | number) =>
  request.post(`/friendships/${userId}/request`);

let confirmFriend = (userId: string | number) =>
  request.post(`/friendships/${userId}/confirm`);
        
let removeFriend = (userId: string | number) =>
  request.delete(`/friendships/${userId}`);

export {
  listFriends,
  addFriend,
  confirmFriend,
  removeFriend,
};
