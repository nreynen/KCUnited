import { atom } from "jotai";
import { User, LOGIN_URL, RENEW_URL, LOGOUT_URL } from "../models/User";
import { fetch_one } from "./server_helper";
import { getCookie, setCookie } from 'react-use-cookie';

export const loginAtom = atom<User|undefined>(undefined);

export default function do_login(username: string, password: string, cb:(z:User|undefined) => void) {
  fetch_one<User>(`/nl${LOGIN_URL}`, {
    fields: ['id', 'first_name', 'last_name', 'vennoot_number', 'auth_token', 'admin_auth_token', 'email', 'is_admin', 'is_helper_admin', 'extra_data', 'otp_provisioning', 'mfa_status'],
    username: username,
    password: password,
    priv: 1
  }, (x, y) => {
    if (!!x?.admin_auth_token) x.auth_token = x?.admin_auth_token;
    setCookie('kcunited_token', (x?.admin_auth_token || x?.auth_token));
    setCookie('kcunited_email', x?.email);
    cb(x);
    return x;
  }, (x) => {
    cb(undefined);
  });
}

export function do_login_otp(username: string, password: string, otp: string, cb:(z:User|undefined) => void) {
  fetch_one<User>(`/nl${LOGIN_URL}`, {
    fields: ['id', 'first_name', 'last_name', 'vennoot_number', 'auth_token', 'admin_auth_token', 'email', 'is_admin', 'is_helper_admin', 'extra_data', 'otp_provisioning', 'mfa_status'],
    username: username,
    password: password,
    otp_code: otp,
    priv: 1
  }, (x, y) => {
    if (!!x?.admin_auth_token) x.auth_token = x?.admin_auth_token;
    setCookie('kcunited_token', (x?.admin_auth_token || x?.auth_token));
    setCookie('kcunited_email', x?.email);
    cb(x);
    return x;
  }, (x) => {
    cb(undefined);
  });
}

export function do_logout(cb:(z:User|undefined) => void) {
  fetch_one<User>(`/nl${LOGOUT_URL}`, {
    fields: [],
    priv: 1
  }, (x, y) => {
    setCookie('kcunited_token', '');
    setCookie('kcunited_email', '');
    cb(undefined);
  }, (x) => {
    setCookie('kcunited_token', '');
    setCookie('kcunited_email', '');
    cb(undefined);
  }, {auth_token: getCookie('kcunited_token'), email: getCookie('kcunited_email')});
}

export function renew_sign_in(cb:(z:User|undefined) => void) {
  fetch_one<User>(`/nl${RENEW_URL}`, {
    fields: ['id', 'first_name', 'last_name', 'vennoot_number', 'auth_token', 'admin_auth_token', 'email', 'is_admin', 'is_helper_admin', 'extra_data', 'otp_provisioning', 'mfa_status'],
    priv: 1
  }, (x, y) => {
    cb(x);
    return x;
  }, (x) => {
    cb(undefined);
  }, {auth_token: getCookie('kcunited_token'), email: getCookie('kcunited_email')});
}