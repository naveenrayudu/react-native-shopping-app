import CartItem from "./cartItem";
import moment from 'moment';

export default class Order {
    orderId: string;
    cart: CartItem[];
    totalPrice: number;
    createdAt: Date;
    
    constructor(orderId: string, cart: CartItem[], totalPrice: number, createdAt: Date) {
        this.orderId = orderId;
        this.cart = cart;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
    }

    readableDate() {
        return moment(this.createdAt).format('MMM Do YYYY, hh:mm');
    }
}