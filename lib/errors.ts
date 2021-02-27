let createError = (message?: string) => () => {
  throw new Error(message);
};

export let ClientArgsMissingError = (argNames: string) =>
  createError(
    'Client initialization failed!\n' + 
    `Missing args required in createApiClient() or environment variables: ${argNames}`
  );

export let StateCheckCallError = createError('State check failed');

export let UnauthenticatedError = createError('Not logged in');
export let WebSocketDoesntExistError = createError('No WebSocket instance exists');
export let WebSocketNotOpenError = createError('WebSocket is not open');
export let WebSocketDidntConnectError = createError('WebSocket didn\t connect');

export let NoUserIdError = createError('No user ID in data store');

export let UnexpectedError = (error: string | Error) => createError(`Error: ${error.toString()}`);
