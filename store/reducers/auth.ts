import { IGoogleAuth, IDefaultAction, IAuthState } from "../../models/store";
import { SIGN_IN_USER, SIGN_UP_USER, REFRESH_USER_TOKEN, SIGN_OUT_USER } from "../actions/types";

const initialState: IAuthState = {
    email: '',
    expiresIn: '',
    refreshToken: '',
    idToken: '',
    localId: '',
    isLoggedIn: false
}

const authReducer = (state: IAuthState = initialState, action: IDefaultAction<any>): IAuthState => {
    switch (action.type) {
        case SIGN_IN_USER:
        case SIGN_UP_USER:
        case REFRESH_USER_TOKEN:
            return {
                ...state,
                isLoggedIn: true,
                ...action.payload
            };
        case SIGN_OUT_USER:
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
}

export default authReducer;