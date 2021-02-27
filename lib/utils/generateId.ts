import { NoUserIdError } from '../errors';
import { getState } from '../state';

let generatedIdCount = 0;

let generateId = () => {
  generatedIdCount += 1;

  let userId = getState().userId ?? NoUserIdError(); 

  let timestamp = Date.now().toString();
  
  return `${userId}-${timestamp}.${++generatedIdCount}`;
};

export { generateId };