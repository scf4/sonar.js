import axios from 'axios';
import { camelizeKeysInPlace, decamelizeKeysInPlace, } from 'fast-case';
import { getState } from '../state';
import { HTTPS_URL, SONAR_BUILD, SONAR_VERSION } from '../constants';
import { getPlatform } from '../utils/get-platform';

let getHeaders = () => ({
  'User-Agent': `Sonar/${SONAR_BUILD} ${getState().clientName}`,
  'Accept': '*/*',
  'Accept-Language': 'en-us',
  'Accept-Encoding': 'gzip, deflate',
  'Content-Type': 'application/json',
  'version': SONAR_VERSION,
  'build': SONAR_BUILD,
  'platform': getPlatform(),
  'device-name': getState().clientName,
  'device-id': getState().clientName,
  'Authorization': getState().authToken,
});

let request = axios.create({
  baseURL: HTTPS_URL,
  method: 'GET',
  responseType: 'json',
  headers: getHeaders(),
  
  transformRequest: [(data) => {
    return decamelizeKeysInPlace(data);
  }, ...axios.defaults.transformRequest as any],

  transformResponse: [(data) => {
    return camelizeKeysInPlace(JSON.parse(data).data);
  }, ...axios.defaults.transformResponse as any],
});

let updateHeaders = () => request.defaults.headers = getHeaders();

export { request, getHeaders, updateHeaders };
