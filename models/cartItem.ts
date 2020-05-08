export default class CartItem {
    productId: string;
    productTitle: string;
    productPrice: number; 
    quantity: number;
    totalAmount: number;

    constructor(productId: string, productTitle: string, productPrice: number, quantity: number, totalAmount: number) {
        this.productId = productId;
        this.productTitle = productTitle;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
    }
}