import { req1 } from 'lib/api/request';
import { SONAR_BUILD, SONAR_VERSION } from 'lib/constants';
import { StateCheckCallError } from 'lib/errors';
import { getState, updateState } from 'lib/state';
import { AssetsResponse, StateCheckResponse } from 'lib/types/sonar-types';

let loadAssets = async () => {
  let hash = getState().cache.assets.hash ?? '';
  let path = hash ? `/assets?hash=${hash}` : '/assets';

  let res = await req1.get<AssetsResponse>(path);
  let droppables = new Map(Object.entries(res.data.droppables));

  updateState(state => {
    Object.assign(state.cache.assets, res.data, { droppables });
  });
};

let stateCheck = async () => {
  let path = `/state-check?version=${SONAR_VERSION}&build=${SONAR_BUILD}`;
  let res = await req1.get<StateCheckResponse>(path);

  if (res.data.state !== 'ok') {
    throw StateCheckCallError(res.data.state, res.data.message);
  }
};

export {
  loadAssets,
  stateCheck,
};
