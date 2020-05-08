class Product {
    id: string;
    ownerId: string;
    title: string;
    image: string; 
    description: string;
    price: number;

    constructor(id: string, 
                ownerId: string, 
                title: string, 
                image: string, 
                description: string, 
                price: number)
    {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;
    }
}

export default Product;