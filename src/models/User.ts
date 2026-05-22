export const LOGIN_URL = '/v3/users/login';
export const LOGOUT_URL = '/v3/users/logout';
export const RENEW_URL = '/v3/users/renew_sign_in';

export type User = {
  id?: number;

  email: string;
  first_name?: string;
  last_name?: string;
  admin_auth_token?: string;
  auth_token: string;

  extra_data?: {
    
  }
}