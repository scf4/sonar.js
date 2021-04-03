import * as request from 'lib/api/request';
import { AuthVerificationResponse } from 'lib/types';

const smsVerification = (number: string) => request.post('/users/sms-verification', { number });

const codeVerification = (number: string, code: string) =>
  request.post<AuthVerificationResponse>('/users/code-verification', { number, code });

// let verifyInvite = (code: string) =>
//   request.post<AuthVerificationResponse>('/invites/verify', { code });

export { smsVerification, codeVerification };
