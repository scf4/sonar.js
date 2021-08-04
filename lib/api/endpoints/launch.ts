import * as request from 'lib/api/request';
import { SONAR_BUILD, SONAR_VERSION } from 'lib/constants';
import { StateCheckError } from 'lib/errors';
import { getState, updateState } from 'lib/store';
import { AssetsResponse, LaunchResponse } from 'lib/types';
import { setAuthData } from '../auth';

const loadAssets = async () => {
  const hash = getState().cache.assets.hash ?? '';
  const path = hash ? `/assets?hash=${hash}` : '/assets';

  let data: AssetsResponse;

  try {
    data = await request.get<AssetsResponse>(path);
  } catch {
    return; // 304 error quick fix
  }

  const droppables = new Map(Object.entries(data.droppables));

  updateState(state => {
    Object.assign(state.cache.assets, data, { droppables });
  });
};

const launch = async () => {
  const path = `/launch?version=${SONAR_VERSION}&build=${SONAR_BUILD}`;
  const resp = await request.get<LaunchResponse>(path);

  if (resp.stateCheck.state !== 'ok') {
    throw StateCheckError(resp.stateCheck.state, resp.stateCheck.message);
  }

  const { user, authToken } = resp.loginInfo

  updateState(state => {
    state.userId ??= user.id;

    if (user.currentRoomId) {
      state.initialServerId = user.currentRoomId;
    }
  });

  setAuthData(store => {
    store.authToken = authToken;
    store.clientName = user.username;
  });
};

export { loadAssets, launch };
