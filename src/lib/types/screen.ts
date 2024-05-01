import OrdersPage from "../../app/screens/ordersPage";
import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPageState;
    ordersPage: OrdersPageState;
}

/** HOMEPAGE scren compga dahldor  type integratsiya**/
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/** PRODUCTS PAGE **/
export interface ProductsPageState {
    restaurant: Member | null; // login bo'lgan yoki bo'lmagan
    chosenProduct: Product | null; // tanlangan taom
    products: Product[];
}

/** ORDERS PAGE **/
export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}
