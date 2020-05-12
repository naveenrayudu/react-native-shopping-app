import { AppThunk } from "../../models/firestore";
import { Dispatch } from "react";
import { IDefaultAction, IGoogleAuth } from "../../models/store";
import API from "../api/apiAgent";
import { SIGN_UP_USER, SIGN_IN_USER, REFRESH_USER_TOKEN, SIGN_OUT_USER } from "./types";
import { removeSecureTokenFromMachine } from "../api/storage";

export const signUpAction = (email: string, password: string):AppThunk => async (dispatch: Dispatch<IDefaultAction<IGoogleAuth>>): Promise<any> => {
   return API.authHandler( 'signUp', email, password)
        .then((res) => {
            dispatch({
                type: SIGN_UP_USER,
                payload: res
            })
        })
        .catch((err) => {
           return Promise.reject(err);
        })
}

export const signInAction = (email: string, password: string):AppThunk => async (dispatch: Dispatch<IDefaultAction<IGoogleAuth>>): Promise<any> => {
    return API.authHandler('signInWithPassword', email, password)
         .then((res) => {
            dispatch({
                type: SIGN_IN_USER,
                payload: res
            })
         })
         .catch((err) => {
            return Promise.reject(err);
         })
 }

 export const refreshUserTokenAction = ():AppThunk => async (dispatch: Dispatch<IDefaultAction<Partial<IGoogleAuth>>>): Promise<any> => {
    return API.refreshTokenHandler()
        .then((res) => {
            dispatch({
                type: REFRESH_USER_TOKEN,
                payload: res
            })
        })
        .catch((err) => {
            return Promise.reject(err);
        })

 }


 export const signOutAction = ():AppThunk => async (dispatch: Dispatch<IDefaultAction<null>>): Promise<void> => {
    try {
        await removeSecureTokenFromMachine();
        dispatch({
            type: SIGN_OUT_USER,
            payload: null
        })

        return Promise.resolve()

    } catch (error) {
        return Promise.reject(error);
    }
 }