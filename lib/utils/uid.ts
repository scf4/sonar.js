import { NoUserIdError } from 'lib/errors';
import { getState } from 'lib/state';

let sonarIdCount = 0;

const generateUniqueSonarId = () => {
  sonarIdCount += 1;
  const userId = getState().userId ?? NoUserIdError();
  const timestamp = Date.now().toString();
  return `${userId}-${timestamp}.${sonarIdCount}`;
};

export { generateUniqueSonarId };
