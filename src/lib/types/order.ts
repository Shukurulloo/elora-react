import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";

export interface OrderItemInput {
    itemQuantity: number;
    itemPrice: number;
    productId: string;
    orderId?: string;   // bu bizni postmanimizdan kemedi o'zimz hosl qilamz
}

export interface OrderItem {
    _id: string;
    itemQuantity: number;
    itemPrice: number;
    orderId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Order {
    _id: string; 
    orderTotal: number;
    orderDelivery: number;
    orderStatus: OrderStatus;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;
    /** from aggregation **/
    orderItems: OrderItem[];
    productData: Product[];  // productdan tashkil topgan array
}

export interface OrderInquiry {  // kirib kelayotgan malumotlar uchn
    page: number;
    limit: number;
    orderStatus: OrderStatus; // enum
}

export interface OrderUpdateInput {
    orderId: string;
    orderStatus: OrderStatus;
}