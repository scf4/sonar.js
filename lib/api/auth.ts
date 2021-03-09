import { SONAR_BUILD } from "lib/constants";
import { platform } from "lib/utils/platform";
import { ClientArgMissingError } from "lib/errors";

let authData = {
  clientName: process.env.CLIENT_NAME!,
  authToken: process.env.AUTH_TOKEN!,
};

let setAuthData = (callback: (data: typeof authData) => void) => {
  callback(authData);
  if (!authData.clientName) throw ClientArgMissingError('clientName');
  if (!authData.authToken) throw ClientArgMissingError('authToken');
}

let getClientHeaders = () => ({
  'Authorization': authData.authToken,
  'device-name': authData.clientName,
  'device-id': authData.clientName,
  'User-Agent': `Sonar/${SONAR_BUILD} ${authData.clientName} (${platform})`,
  'platform': platform,
});

export {
  setAuthData,
  getClientHeaders,
};
