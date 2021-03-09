import { getState } from 'lib/state';

export * as actions from './websocket/actions';
export * as auth from './endpoints/login';
export * as friends from './endpoints/friends';
export * as launch from './endpoints/launch';
export * as rooms from './endpoints/rooms';
export * as users from './endpoints/users';
export { default as events } from './events';

let shutdown = () => getState().ws?.close();

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('uncaughtException', shutdown);