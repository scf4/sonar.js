import axios from 'axios';
import { camelizeKeysInPlace, decamelizeKeysInPlace } from 'fast-case';
import { HTTPS_URL, HTTPS_URL_V2, SONAR_BUILD, SONAR_VERSION } from 'lib/constants';
import { getClientHeaders } from './auth';

let defaultHeaders = {
  'Accept': '*/*',
  'Accept-Language': 'en-us',
  'Accept-Encoding': 'gzip, deflate, br',
  'Content-Type': 'application/json',
  'version': SONAR_VERSION,
  'build': SONAR_BUILD,
  ...getClientHeaders(),
};

let createAxiosInstance = (baseUrl = HTTPS_URL) =>
  axios.create({
    baseURL: baseUrl,
    responseType: 'json',
    headers: defaultHeaders,
    transformRequest: (data, _headers) => decamelizeKeysInPlace(data),
    transformResponse: body => camelizeKeysInPlace(JSON.parse(body).data),
  });

let request = createAxiosInstance(HTTPS_URL);
let request2 = createAxiosInstance(HTTPS_URL_V2);

[request, request2].forEach(req => req.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
  };
  return config;
}));

export {
  defaultHeaders,
  request,
  request2,
};
