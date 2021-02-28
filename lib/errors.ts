let createError = (message?: string) => () => {
  throw new Error(message);
};

export let ClientArgsMissingError = (args: string) => createError(`Missing client args: ${args}`);
export let StateCheckCallError = createError('State check failed');
export let UnauthenticatedError = createError('Not logged in');

export let WebSocketDoesntExistError = createError('No WebSocket instance exists');
export let WebSocketNotOpenError = createError('WebSocket isn\'t open');
export let WebSocketDidntConnectError = createError('WebSocket didn\t connect');

export let NoUserIdError = createError('No user ID in data store');
export let UnexpectedError = (error: string | Error) => createError(`Error: ${error}`);
