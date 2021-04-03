const createError = (...errors: (string | Error | undefined)[]) => {
  const message = errors
    .map(e => e?.toString())
    .filter(e => e)
    .join('\n');
  throw new Error(message);
};

export const StateCheckCallError = (state: string, msg?: string) =>
  createError(`State check error: ${state}`, msg);

export const UnauthenticatedError = () => createError('Not logged in');
export const NoUserIdError = () => createError('No user ID in data store');

export const WebSocketDoesntExistError = () => createError('No WebSocket instance was created');
export const WebSocketNotOpenError = () => createError('WebSocket isn\'t open');
export const WebSocketDidntConnectError = () => createError('WebSocket didn\t connect');

export const LocalStateError = (msg: string, err?: Error) => createError(`Unexpected error: ${msg}`, err);

export const ClientArgMissingError = (arg: string) => createError(`Missing client args: ${arg}`);
export const CantAccessRoomError = () => createError('You don\'t have permission to access this room');
