import Product from "../../models/product";
import { IDefaultAction } from "../../models/store";
import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export const addToCartAction = (product: Product): IDefaultAction<Product> => {
    return {
        type: ADD_TO_CART,
        payload: product
    }   
}

export const removeFromCartAction = (productId: string): IDefaultAction<string> => {
    return {
        type: REMOVE_FROM_CART,
        payload: productId
    }
}