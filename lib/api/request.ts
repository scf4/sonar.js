import axios from 'axios';
import { camelizeKeysInPlace, decamelizeKeysInPlace } from 'fast-case';
import { getState } from 'lib/state';
import { HTTPS_URL, SONAR_BUILD, SONAR_VERSION } from 'lib/constants';
import { platform } from 'utils/platform';

let getHeaders = () => {
  let { clientName, authToken } = getState();

  return {
    'User-Agent': `Sonar/${SONAR_BUILD} ${clientName}`,
    'Accept': '*/*',
    'Accept-Language': 'en-us',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json',
    'version': SONAR_VERSION,
    'build': SONAR_BUILD,
    'platform': platform,
    'device-name': clientName,
    'device-id': clientName,
    'Authorization': authToken,
  };
};

let request = axios.create({
  baseURL: HTTPS_URL,
  method: 'GET',
  responseType: 'json',
  headers: getHeaders(),
  transformRequest: (data) => decamelizeKeysInPlace(data),
  transformResponse: (data) => camelizeKeysInPlace(JSON.parse(data).data),
});

let updateHeaders = () => {
  request.defaults.headers = getHeaders();
};

export { request, getHeaders, updateHeaders };
