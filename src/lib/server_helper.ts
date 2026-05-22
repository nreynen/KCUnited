import server from './server';
import { getCookie, setCookie } from 'react-use-cookie';

let api_url: string = 'https://api.kcunited.be';
if (!!(window.location.host.indexOf('localhost') > -1 || window.location.host.indexOf('staging.') > -1)) api_url = 'https://api-staging.kcunited.be';


export function fetch_all<Type>(
  url: string,
  params: unknown,
  callback: (z:Type[], y:ApiMultiResult<Type>) => void,
  error_callback: (z:string) => void,
  login?: {admin_auth_token?: string, auth_token: string, email: string}
) {
  let h = {};
  if (!!login) {
    h = {
      "Auth-Token": login.admin_auth_token || login.auth_token,
      "Auth-Email": login.email
    };
    // h = {auth_token: getCookie('kcunited_token'), email: getCookie('kcunited_email')};
  }

  return server.post<ApiMultiResult<Type>>(url, params, {
    headers: h
  }).then((_response) => {
    var _data = _response.data;
    if (_data.success) {
      let r = _data.data;
      if (!!r && typeof(r) === 'object' && 'result' in r) r = r.result;
      if (callback !== undefined && typeof(r) === 'object') callback(r, _data);
    } else {
      if (error_callback !== undefined && typeof(_data.data) === 'string') error_callback(_data.data);
    }
  }).catch(_error => {
    if (error_callback !== undefined) error_callback(!!_error.response ? _error.response.data : {});
  });
}

export function fetch_one<Type>(
  url: string,
  params: unknown,
  callback: (z:Type, y:ApiSingleResult<Type>) => void,
  error_callback: (z:string, y:any) => void,
  login?: {admin_auth_token?: string, auth_token: string, email: string}
) {
  let h = {};
  if (!!login) {
    h = {
      "Auth-Token": login.admin_auth_token || login.auth_token,
      "Auth-Email": login.email
    };
    // h = {auth_token: getCookie('kcunited_token'), email: getCookie('kcunited_email')};
  }

  return server.post<ApiSingleResult<Type>>(url, params, {
    headers: h
  }).then((_response) => {
    var _data = _response.data;
    if (_data.success) {
      let r = _data.data;
      if (!!r && typeof(r) === 'object' && 'result' in r) r = r.result;
      if (callback !== undefined && typeof(r) === 'object') callback(r, _data);
      if (callback !== undefined && typeof(r) === 'boolean') callback(r, _data);
    } else {
      if (error_callback !== undefined && typeof(_data.data) === 'string') error_callback(_data.data, {});
    }
  }).catch(_error => {
    if (error_callback !== undefined) error_callback(!!_error.response ? _error.response.data : {}, _error);
  });
}

export async function fetch_with_count<Type>(
  url: string,
  params: unknown,
  login?: {admin_auth_token?: string, auth_token: string, email: string}
) {
  return new Promise<{count: number; result: Type[]}>((resolve, reject) => {
    let h = {};
    if (!!login) {
      h = {
        "Auth-Token": login.admin_auth_token || login.auth_token,
        "Auth-Email": login.email
      };
      // h = {auth_token: getCookie('kcunited_token'), email: getCookie('kcunited_email')};
    }

    // return server.post<ApiMultiResult<Type>>(url, params, {
    //   headers: h
    // }).then((_response) => {
    //   var _data = _response.data;
    //   if (_data.success) {
    //     let r = _data.data;
    //     if (!!r && typeof(r) === 'object' && 'result' in r) r = r.result;
    //     if (callback !== undefined && typeof(r) === 'object') callback(r, _data);
    //   } else {
    //     if (error_callback !== undefined && typeof(_data.data) === 'string') error_callback(_data.data);
    //   }
    // }).catch(_error => {
    //   if (error_callback !== undefined) error_callback(!!_error.response ? _error.response.data : {});
    // });

    fetch(`${api_url}${url}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        ...((params instanceof FormData) ? {} : { "Content-Type": "application/json" }),
        "X-KANGA-KEY": "nwuziog6JX0J9K", // ENV?
        ...h
      },
      referrerPolicy: "no-referrer",
      body: (params instanceof FormData) ? params : JSON.stringify(params),
    })
    .then(res => res.json())
    .then(e => {
      // @ts-ignore
      window.reported_version = e.version;
      if (e.success) {
        resolve(e.data);
        // let r = e.data;
        // if (!!r && typeof (r) === 'object' && 'result' in r) r = r.result;
        // if (typeof (r) === 'object') resolve(r);
      } else {
        if (e.data === 'not_authenticated') {
          setCookie('kcunited_token', '');
          setCookie('kcunited_email', '');
          window.location.href = "/";
        }
        reject(e);
      }
    });
  });
}

export type ApiResult = {
  data: unknown;
  server_timestamp: string;
  success: boolean;
}

export type ApiMultiResult<Type> = ApiResult & {
  data: Type[] | string | {result : Type[]; count: number;};
}

export type ApiSingleResult<Type> = ApiResult & {
  data: Type | string | {result : Type; count: number;};
}