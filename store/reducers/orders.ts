import { IDefaultAction, IOrderState, ICartState } from "../../models/store";
import { ADD_CART_TO_ORDER } from "../actions/types";
import Order from "../../models/order";

const initialState: IOrderState = {
    orders: []
} 


const orderReducer = (state = initialState, action: IDefaultAction<any>): IOrderState => {
    switch (action.type) {
        case ADD_CART_TO_ORDER:
          const cartInfo = action.payload as ICartState;
          const cartItems = [];
          for (const key in cartInfo.items) {
              cartItems.push(cartInfo.items[key])
          }
          const newOrder = new Order(new Date().toString(), cartItems, cartInfo.totalPrice, new Date())

           return {
               ...state,
               orders: state.orders.concat(newOrder)
           }
        default:
            return state;
    }
}

export default orderReducer;