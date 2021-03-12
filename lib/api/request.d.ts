declare let getHeaders: () => {
    Authorization: string;
    'device-name': string;
    'device-id': string;
    'User-Agent': string;
    platform: any;
    Accept: string;
    'Accept-Language': string;
    'Accept-Encoding': string;
    'Content-Type': string;
    version: any;
    build: any;
};
declare let request: import("axios").AxiosInstance;
declare let request2: import("axios").AxiosInstance;
export { getHeaders, request, request2, };
