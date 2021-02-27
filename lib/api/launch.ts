import { request } from '../api/request';
import { SONAR_BUILD, SONAR_VERSION } from '../constants';
import { StateCheckCallError } from '../errors';
import { updateState } from '../state';

let loadAssets = async () => {
  let res = await request.get<AssetsResponse>('/assets');

  let droppables = new Map<string, Droppable>(Object.entries(res.data.droppables));
  
  updateState(state => state.assets = {
    ...state.assets,
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
