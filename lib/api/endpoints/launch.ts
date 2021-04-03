import * as request from 'lib/api/request';
import { SONAR_BUILD, SONAR_VERSION } from 'lib/constants';
import { StateCheckCallError } from 'lib/errors';
import { getState, updateState } from 'lib/state';
import { AssetsResponse, StateCheckResponse } from 'lib/types';

const loadAssets = async () => {
  const hash = getState().cache.assets.hash ?? '';
  const path = hash ? `/assets?hash=${hash}` : '/assets';

  const data = await request.get<AssetsResponse>(path);
  const droppables = new Map(Object.entries(data.droppables));

  updateState(state => {
    Object.assign(state.cache.assets, data, { droppables });
  });
};

const stateCheck = async () => {
  const path = `/state-check?version=${SONAR_VERSION}&build=${SONAR_BUILD}`;
  const resp = await request.get<StateCheckResponse>(path);

  if (resp.state !== 'ok') {
    throw StateCheckCallError(resp.state, resp.message);
  }
};

export { loadAssets, stateCheck };
