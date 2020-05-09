import { IDefaultAction, IOrderState, ICartState } from "../../models/store";
import { ADD_CART_TO_ORDER, SET_ORDERS } from "../actions/types";
import Order from "../../models/order";

const initialState: IOrderState = {
    orders: []
} 


const orderReducer = (state = initialState, action: IDefaultAction<any>): IOrderState => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload as Order[]
            }
        case ADD_CART_TO_ORDER:
            const newOrder = action.payload as Order;
        
           return {
               ...state,
               orders: state.orders.concat(newOrder)
           }
        default:
            return state;
    }
}

export default orderReducer;