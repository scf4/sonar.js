import { req1 } from 'lib/api/request';
import { AuthVerificationResponse } from 'lib/types/sonar-types';

let smsVerification = (number: string) =>
  req1.post('/users/sms-verification', { number });

let codeVerification = (number: string, code: string) =>
  req1.post<AuthVerificationResponse>('/users/code-verification', { number, code });

// let verifyInvite = (code: string) =>
//   request.post<AuthVerificationResponse>('/invites/verify', { code });

export {
  smsVerification,
  codeVerification,
  // verifyInvite,
};
