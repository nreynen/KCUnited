import { fetch_all as v3fetch_all, fetch_one as v3fetch_one } from "./server_helper";

export async function fetchAll<Type>(
  url: string,
  params: unknown,
  login?: { auth_token: string, email: string, get_domain?: string }
) {
  return new Promise<Type[]>((resolve, reject) => {
    if (login) {
      v3fetch_all<Type>(
        url,
        params,
        (obs, complete_data) => {
          resolve(obs);
        },
        (e) => {
          reject(new Error("Something went wrong"));
        },
        login,
      );
    } else {
      reject(new Error("User is not logged in"));
    }
  });
}

export async function fetchOne<Type>(
  url: string,
  params: unknown,
  login?: { auth_token: string, email: string, get_domain?: string }
) {
  return new Promise<Type>((resolve, reject) => {
    if (login) {
      v3fetch_one<Type>(
        url,
        params,
        (ob, complete_data) => {
          resolve(ob as Type);
        },
        (e) => {
          reject(new Error("Something went wrong"));
        },
        login,
      );
    } else {
      reject(new Error("User is not logged in"));
    }
  });
}