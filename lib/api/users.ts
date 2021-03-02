import { request } from 'lib/api/request';

let searchUsers = (usernames: string[]) => 
  request.post<SearchUsersResponse>('/users/search', { usernames })
    .then(res => res.data);

export {
  searchUsers as search,
};
