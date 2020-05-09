import { ThunkAction } from "redux-thunk";
import { IRootState, IDefaultAction } from "./store";

export interface IFireStorePostResponse<T> {
    "name": T
}

export interface IFireStoreGetResponse<T> {
    [key: string]: T
}

export type AppThunk = ThunkAction<Promise<any>, IRootState, unknown, IDefaultAction<any>>