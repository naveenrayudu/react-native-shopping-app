import Product from './product';
import CartItem from './cartItem';
import Order from './order';



export interface IRootState {
    products: IProductsState,
    cart: ICartState,
    orders: IOrderState,
    auth: IAuthState
}

export interface IProductsState {
    availableProducts: Product[],
    userProducts: Product[]
}

export interface ICartState {
    items: {
        [id: string]: CartItem
    },
    totalPrice: number,
    date: Date
}

export interface IOrderState {
    orders: Order[]
}

export interface IAuthState extends IGoogleAuth {
    isLoggedIn: boolean
}

export interface IGoogleAuth {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}

export interface IDefaultAction<T> {
    type: string,
    payload: T
}
