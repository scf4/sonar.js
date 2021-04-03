import * as request from 'lib/api/request';
import { SocialNetwork } from 'lib/types';

const addPhoto = (image: any) => request.post('/profile/upload', image, 2);

const addSocial = (network: SocialNetwork, username: string) => request.post('/socials', { network, username }, 2);

const editSocial = (network: SocialNetwork, username: string) => request.post('/socials', { network, username }, 2);

const removeSocial = (network: SocialNetwork) => request.delete('/socials', { network }, 2);

export { addPhoto, addSocial, editSocial, removeSocial };
