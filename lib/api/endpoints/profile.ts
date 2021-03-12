import { req1 } from 'lib/api/request';
import { SocialNetwork } from 'lib/types/sonar-types';

let addPhoto = (image: any) => 
  req1.post<void>('/profile/upload', image);

let addSocial = (network: SocialNetwork, username: string) =>
  req1.post<void>('/socials', { network, username });

let editSocial = (network: SocialNetwork, username: string) =>
  req1.post<void>('/socials', { network, username });

let removeSocial = (network: SocialNetwork) =>
  req1.delete<void>('/socials', { params: { network } });

export {
  addPhoto,
  addSocial,
  editSocial,
  removeSocial,
};

