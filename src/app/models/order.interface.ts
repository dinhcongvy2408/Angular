export interface OrderItem {
  productId: number;
  quantity: number;
  productPrice: number;
}

export interface ShippingInfo {
  address: string;
  phoneNumber: string;
  note?: string;
}

export interface Order {
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  shippingInfo: ShippingInfo;
} 