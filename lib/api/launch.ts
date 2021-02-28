import { request } from 'lib/api/request';
import { SONAR_BUILD, SONAR_VERSION } from 'lib/constants';
import { StateCheckCallError } from 'lib/errors';
import { updateState } from 'lib/state';

let loadAssets = async () => {
  let res = await request.get<AssetsResponse>('/assets');

  let droppables = new Map<string, Droppable>(Object.entries(res.data.droppables));
  
  updateState(state => state.cache.assets = {
    ...state.cache.assets,
    droppables,
  });
};

let stateCheck = async () => {
  let path = '/state-check?version=' + SONAR_VERSION + '&build=' + SONAR_BUILD;
  let res = await request.get<StateCheckResponse>(path);

  if (res.data.state !== 'ok') {
    throw StateCheckCallError();
  }
};

export {
  loadAssets,
  stateCheck,
};
