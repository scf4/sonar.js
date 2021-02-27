import { request } from '../api/request';

let smsVerification = (number: string) =>
  request.post('/users/sms-verification', { number });

let codeVerification = (number: string, code: string) =>
  request.post<AuthVerificationResponse>('/users/code-verification', { number, code });

let verifyInvite = (code: string) =>
  request.post<AuthVerificationResponse>('/invites/verify', { code });

export {
  smsVerification,
  codeVerification,
  verifyInvite,
};
