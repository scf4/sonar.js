import axios, { AxiosInstance, AxiosRequestConfig as Config, AxiosResponse } from 'axios';
import { camelizeKeysInPlace, decamelizeKeys } from 'fast-case';
import { HTTPS_URL, HTTPS_URL_V2, SONAR_BUILD, SONAR_VERSION } from 'lib/constants';
import { getClientHeaders } from 'lib/api/auth';

const getHeaders = () => ({
  'Accept': '*/*',
  'Accept-Language': 'en-us',
  'Accept-Encoding': 'gzip, deflate, br',
  'Content-Type': 'application/json',
  'version': SONAR_VERSION,
  'build': SONAR_BUILD,
  ...getClientHeaders(),
});

const createAxiosInstance = (baseUrl = HTTPS_URL) =>
  axios.create({
    baseURL: baseUrl,
    responseType: 'json',
    headers: getHeaders(),
    transformRequest: body => body ? JSON.stringify(decamelizeKeys(body)) : body,
    transformResponse: resp => resp ? camelizeKeysInPlace(JSON.parse(resp).data) : resp,
  });

const axiosInstances = [createAxiosInstance(HTTPS_URL), createAxiosInstance(HTTPS_URL_V2)];

type Version = 1 | 2;

function createRequestFn(method: 'get' | 'post' | 'put' | 'patch' | 'delete') {
  async function request<T = void>(path: string, body?: any, prop?: string, version?: Version, config?: Config): Promise<T>;
  async function request<T = void>(path: string, body?: any, version?: Version, config?: Config): Promise<T>;
  async function request<T = void>(path: string, version?: Version, config?: Config): Promise<T>;
  async function request<T = void>(path: string, ...args: (any | Version | string | Config)[]): Promise<T> {

    let prop: string | undefined;
    let version: 1 | 2 = 1;
    let body: any;
    let config: Config = {};

    args.forEach(arg => {
      if ([1, 2].includes(arg)) version = arg;
      if (typeof arg === 'string') prop = arg;
    });

    [body, config] = args.filter(arg => typeof arg === 'object');

    const axiosRequest: AxiosInstance = axiosInstances[version - 1];

    let response: AxiosResponse<T>;

    try { 
      if (['delete', 'get'].includes(method)) {
        response = await axiosRequest[method]<T>(path, { ...config, params: body });
      } else {
        response = await axiosRequest[method]<T>(path, body, config);
      }
      return !prop ? response.data : response.data[prop];
    } catch (error) {
      console.error(error);
      throw new TypeError('Error fetching response.');
    }
  }

  return request;
}

const get = createRequestFn('get');
const post = createRequestFn('post');
const put = createRequestFn('put');
const patch = createRequestFn('patch');
const del = createRequestFn('delete');

export { get, post, put, patch, del as delete, getHeaders };
