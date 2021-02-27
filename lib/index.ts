import 'dotenv/config';
import * as api from './api';
import { updateHeaders } from './api/request';
import { ClientArgsMissingError } from './errors';
import {  updateState } from './state';

interface ClientArgs {
  authToken: string;
  clientName: string;
  userId: number;
  roomId: number;
}

let createApiClient = async (roomId: number, args?: ClientArgs) => {
  args ??= {
    authToken: process.env.AUTH_TOKEN!,
    clientName: process.env.CLIENT_NAME!,
    userId: Number(process.env.USER_ID),
    roomId: roomId ?? Number(process.env.ROOM_ID),
  };

  checkArgs(args);
  updateState(state => Object.assign(state, args));
  updateHeaders();

  await api.launch.stateCheck();
  await api.launch.loadAssets();
  
  api.rooms.join({ roomId: args.roomId });
  
  return api;
};

let checkArgs = (args: ClientArgs) => {
  let argsArray = ['authToken', 'clientName', 'userId', 'roomId'];
  let missingArgs = Object.keys(args).filter(key => !argsArray.includes(key));

  if (missingArgs.length) {
    throw ClientArgsMissingError(missingArgs.join(', '));
  }
};

export { createApiClient };

