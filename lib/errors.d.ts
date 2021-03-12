export declare let StateCheckCallError: (state: string, msg?: string | undefined) => never;
export declare let UnauthenticatedError: () => never;
export declare let NoUserIdError: () => never;
export declare let WebSocketDoesntExistError: () => never;
export declare let WebSocketNotOpenError: () => never;
export declare let WebSocketDidntConnectError: () => never;
export declare let UnexpectedError: (msg: string, err?: Error | undefined) => never;
export declare let ClientArgMissingError: (arg: string) => never;
