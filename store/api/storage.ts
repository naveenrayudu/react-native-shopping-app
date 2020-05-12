import { AsyncStorage } from 'react-native';;

const AUTH_KEY = 'AUTH_KEY';

export interface IAuthStorage  {
    email: string, 
    refresh_token: string,
    id_token: string
}


export const getSecureTokenFromMachine = async (): Promise<null|IAuthStorage> => {
    return await getData(AUTH_KEY);
}


export const storeSecureTokenToMachine = async (tokenToSave: IAuthStorage) => {
    return storeData(AUTH_KEY, tokenToSave);
}

export const removeSecureTokenFromMachine = async () => {
    return await removeItem(AUTH_KEY);
}

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return Promise.resolve(JSON.parse(value))
    }

    return Promise.resolve(null);
  } catch(e) {
    return Promise.reject(e)
  }
}

const storeData = async (key: string, value: {}) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e)
  }
}

const removeItem = async (key: string) => {
    await AsyncStorage.removeItem(key);
}