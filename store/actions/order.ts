import { ICartState, IDefaultAction } from "../../models/store";
import { ADD_CART_TO_ORDER, SET_ORDERS } from "./types";
import { AppThunk } from "../../models/firestore";
import { Dispatch } from "redux";
import API from "../api/apiAgent";
import Order from "../../models/order";


const convertCartToOrder = (cart: ICartState, id: string) => {
    const cartItems = [];
    for (const key in cart.items) {
        cartItems.push(cart.items[key])
    }
    return new Order(id, cartItems, cart.totalPrice, cart.date);
}

export const addCartToOrderAction = (cart: ICartState): AppThunk => async (dispatch: Dispatch<IDefaultAction<Order>>): Promise<any> => {
    return API.post('orders.json', cart)
        .then((response) => {
            return dispatch({
                type: ADD_CART_TO_ORDER,
                payload: convertCartToOrder(cart, response.name)
            })
        })
        .catch((err) => {
            console.log(err);
        })
}


export const getOrdersAction = (): AppThunk => async (dispatch: Dispatch<IDefaultAction<Order[]>>): Promise<any> => {
    API.get<ICartState>('orders.json')
        .then((response) => {
            const orders: Order[] = Object.keys(response).map(key => convertCartToOrder(response[key], key));
            return dispatch({
                type: SET_ORDERS,
                payload: orders
            })
        })
        .catch(() => {

        })
}

