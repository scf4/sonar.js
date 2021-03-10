import axios from 'axios';
import { camelizeKeysInPlace, decamelizeKeys } from 'fast-case';
import { HTTPS_URL, HTTPS_URL_V2, SONAR_BUILD, SONAR_VERSION } from 'lib/constants';
import { getClientHeaders } from './auth';

let getHeaders = () => ({
  'Accept': '*/*',
  'Accept-Language': 'en-us',
  'Accept-Encoding': 'gzip, deflate, br',
  'Content-Type': 'application/json',
  'version': SONAR_VERSION,
  'build': SONAR_BUILD,
  ...getClientHeaders(),
});

let createAxiosInstance = (baseUrl = HTTPS_URL) =>
  axios.create({
    baseURL: baseUrl,
    responseType: 'json',
    headers: getHeaders(),
    transformRequest: data => JSON.stringify(decamelizeKeys(data)),
    transformResponse: body => body && camelizeKeysInPlace(JSON.parse(body).data),
  });

let request = createAxiosInstance(HTTPS_URL);
let request2 = createAxiosInstance(HTTPS_URL_V2);

export {
  getHeaders,
  request,
  request2,
};
