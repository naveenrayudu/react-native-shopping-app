import Product from './product';
import CartItem from './cartItem';
import Order from './order';



export interface IRootState {
    products: IProductsState,
    cart: ICartState,
    orders: IOrderState
}

export interface IProductsState {
    availableProducts: Product[],
    userProducts: Product[]
}

export interface ICartState {
    items: {
        [id: string]: CartItem
    },
    totalPrice: number
}

export interface IOrderState {
    orders: Order[]
}

export interface IDefaultAction<T> {
    type: string,
    payload: T
}
