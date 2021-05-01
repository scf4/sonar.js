import { getState } from 'lib/store';

export * as actions from './websocket/actions';
export * as auth from './endpoints/login';
export * as friends from './endpoints/friends';
export * as launch from './endpoints/launch';
export * as rooms from './endpoints/servers';
export * as servers from './endpoints/servers';
export * as profile from './endpoints/profile';
export * as users from './endpoints/users';
export { events } from './events';

export { getState as getInternalState };

const shutdown = () => {
  const { ws } = getState();
  ws?.terminate();
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
