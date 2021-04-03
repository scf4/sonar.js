import { PLATFORM, SONAR_BUILD } from 'lib/constants';
import { ClientArgMissingError } from 'lib/errors';

const authData = {
  clientName: process.env.CLIENT_NAME,
  authToken: process.env.AUTH_TOKEN,
};

const setAuthData = (callback: (data: typeof authData) => void) => {
  callback(authData);
  if (!authData.clientName) throw ClientArgMissingError('clientName');
  if (!authData.authToken) throw ClientArgMissingError('authToken');
};

const getClientHeaders = () => ({
  'Authorization': authData.authToken,
  'device-name': authData.clientName,
  'device-id': authData.clientName,
  'User-Agent': `Sonar/${SONAR_BUILD} ${authData.clientName} (${PLATFORM})`,
  'platform': PLATFORM,
});

export { 
  setAuthData,
  getClientHeaders,
};
