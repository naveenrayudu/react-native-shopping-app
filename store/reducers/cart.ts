import { IDefaultAction, ICartState } from "../../models/store";
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_CART_TO_ORDER, DELETE_PRODUCT } from "../actions/types";
import Product from "../../models/product";
import CartItem from "../../models/cartItem";

const initialState: ICartState = {
    items: {},
    totalPrice: 0,
    date: new Date()
}

const cartReducer = (state = initialState, action: IDefaultAction<any>): ICartState => {
    switch (action.type) {
        case ADD_TO_CART:
            const product = action.payload as Product;
            if(!product)
                return state;

            let productToAdd: CartItem | undefined;
            if(state.items[product.id])
            {
                productToAdd = {...state.items[product.id]};
                productToAdd.totalAmount += productToAdd.productPrice;
                productToAdd.quantity += 1;

                
            }
            else
            {
                productToAdd =  new CartItem(product.id, product.title, product.price, 1, product.price);
            }

            return {
                ...state,
                items: {...state.items, [product.id]: productToAdd},
                totalPrice: state.totalPrice + productToAdd.productPrice
            }

        case REMOVE_FROM_CART:
            const itemsToUpdate =  {...state.items};
            const productToRemove = state.items[action.payload];
            if(productToRemove.quantity === 1) {
                delete itemsToUpdate[action.payload];
            } else {
                itemsToUpdate[action.payload].quantity--;
                itemsToUpdate[action.payload].totalAmount -= productToRemove.productPrice;
            }
            const updatedTotalAmount = state.totalPrice - productToRemove.productPrice;

            return {
                ...state, 
                items: itemsToUpdate,
                totalPrice: updatedTotalAmount > 0 ? updatedTotalAmount : 0
            }

        case ADD_CART_TO_ORDER:
            return initialState;

        case DELETE_PRODUCT:
            const productToDelete = action.payload as Product;
            const cartItemToRemove = state.items[productToDelete.id];
            
            if(!cartItemToRemove)
                return state;

           
            const updatedCartItems = {...state.items};
            delete updatedCartItems[productToDelete.id];

            return {
                ...state,
                items: updatedCartItems,
                totalPrice: state.totalPrice - cartItemToRemove.totalAmount
            }

        default:
            return state;
    }
}

export default cartReducer;