import { ICartState, IDefaultAction } from "../../models/store";
import { ADD_CART_TO_ORDER } from "./types";

export const addCartToOrderAction = (cart: ICartState): IDefaultAction<ICartState>=> {
    return {
        type: ADD_CART_TO_ORDER,
        payload: cart
    }
}