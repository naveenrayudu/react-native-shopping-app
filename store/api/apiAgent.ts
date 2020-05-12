import {
  IFireStorePostResponse,
  IFireStoreGetResponse,
} from "../../models/firestore";
import { IGoogleAuth } from "../../models/store";
import store from '../reducers';
import { REFRESH_USER_TOKEN } from "../actions/types";
import { getSecureTokenFromMachine, storeSecureTokenToMachine } from "./storage";

// Update URI and GoogleTokenKey to point to your server.
const URI = '';
const GoogleTokenKey =  '';
const authQueryParam = 'auth=';


const getAuthorizedURL = async (url: string) => {
  const token = await getSecureTokenFromMachine();
  if(!token)
    return url;

  const queryParam = url.indexOf('?') > -1 ? '&' : '?';
 
  return `${url}${queryParam + authQueryParam + token.id_token}`;
}

const refreshHandler = async <T>(input: RequestInfo, init?: RequestInit | undefined, retryCount?: number): Promise<T>  => {
    const authResponse = await RefreshTokenHandler();

    store.dispatch({
        type: REFRESH_USER_TOKEN,
        payload: authResponse
    })

    if(!retryCount) {
      // update the refresh token
      if(typeof input === 'string') {
          if(input.indexOf('&'+ authQueryParam) > -1 || input.indexOf('?' + authQueryParam) > -1 ) {
            let currentIndex = (input.indexOf("&" + authQueryParam) > -1 ? input.indexOf("&" + authQueryParam): input.indexOf("?" + authQueryParam)); 
            currentIndex = currentIndex + ('?' + authQueryParam).length;

            input = input.slice(0, currentIndex) 
                        + authResponse.idToken 
                        + (input.indexOf('&', currentIndex) === -1 ? '' : input.slice(input.indexOf('&', currentIndex)));
          
          }
      }

      return fetchHandler(input, init, 1);
    }

    return Promise.reject('Session expired');
}


const fetchHandler = async <T>(input: RequestInfo, init?: RequestInit | undefined, retryCount?: number): Promise<T> => {
    try {
      const response = await fetch(input, init);

      if(!response.ok) {
        const errors = await response.json();
        
     
        if(errors.error === 'Auth token is expired') {
            // Refresh token
            const refreshToken = store.getState().auth.refreshToken;
            if(!refreshToken)
                return Promise.reject(errors);

            return refreshHandler(input, init, retryCount);

        } 
        return Promise.reject(errors);
      }

      const responseData: T = await response.json();
      return Promise.resolve(responseData);

    } catch (error) {
      return Promise.reject(error)
    }
}

const Post = async <T>(url: any, data: T) => {
  try {
    const response = await fetchHandler<IFireStorePostResponse<string> >(`${URI}/${await getAuthorizedURL(url)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const Get = async <T>(url: any) => {
  try {
    const response = await fetchHandler<IFireStoreGetResponse<T>>(`${URI}/${await getAuthorizedURL(url)}`);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const Patch = async <T>(url: any, data: T) => {
  try {
    const response = await fetchHandler<IFireStorePostResponse<string>>(`${URI}/${await getAuthorizedURL(url)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const Delete = async <T>(url: any) => {
  try {
    const response = await fetchHandler<IFireStorePostResponse<string>>(`${URI}/${await getAuthorizedURL(url)}`, {
      method: "DELETE",
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(error);
  }
};

const AuthHandler = async <T>(authType: 'signInWithPassword' | 'signUp', email: string, password: string): Promise<IGoogleAuth> => {
  try {
    const authResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:${authType}?key=${GoogleTokenKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        }),
      }
    );

    if(!authResponse.ok)
    {
        const authError = await authResponse.json();
        return Promise.reject(authError.error.message);
    }

      const data = await authResponse.json();

      await storeSecureTokenToMachine({
        email: data.email,
        refresh_token: data.refreshToken,
        id_token: data.idToken
      });
     
      return Promise.resolve(data);
    
  } catch (error) {
    return Promise.reject('Error occured');
  }
};

const RefreshTokenHandler = async () => {
  try {
    const token = await getSecureTokenFromMachine();

    if(!token || !token.refresh_token)
      return Promise.reject(null);

    const authResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/token?key=${GoogleTokenKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: token?.refresh_token
        }),
      }
    );

      if(!authResponse.ok)
      {
          const authError = await authResponse.json();
          return Promise.reject(authError.error.message);
      }
      

      const data = await authResponse.json();
      const authData: Partial<IGoogleAuth> = {
        idToken: data.id_token,
        expiresIn: data.expires_in,
        localId: data.user_id,
        refreshToken: data.refresh_token
      }

      await storeSecureTokenToMachine({
        email: token?.email || '',
        refresh_token: data.refresh_token,
        id_token: data.id_token
      });
      
      return Promise.resolve(authData);
    
  } catch (error) {
    return Promise.reject('Error occured');
  }
}

const API = {
  post: Post,
  get: Get,
  patch: Patch,
  delete: Delete,
  authHandler: AuthHandler,
  refreshTokenHandler: RefreshTokenHandler
};

export default API;
