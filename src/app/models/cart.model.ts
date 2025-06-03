export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    productName: string;
    productPrice: number;
    images: string;
}

export interface Cart {
    id: number;
    userId: number;
    items: CartItem[];
} 