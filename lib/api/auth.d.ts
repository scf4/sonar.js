declare let authData: {
    clientName: string;
    authToken: string;
};
declare let setAuthData: (callback: (data: typeof authData) => void) => void;
declare let getClientHeaders: () => {
    Authorization: string;
    'device-name': string;
    'device-id': string;
    'User-Agent': string;
    platform: any;
};
export { setAuthData, getClientHeaders, };
