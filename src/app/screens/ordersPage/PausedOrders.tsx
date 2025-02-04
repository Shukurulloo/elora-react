import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

/** REDUX SLICE & SELECTOR **/
const pausedOrdersRetriever = createSelector( //yuklangan datani retriever orqali qabul qilish
    retrievePausedOrders, // 1-argument
    (pausedOrders) => ({ pausedOrders }) // 2-argument
);

interface PausedOrdersProps {
    setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) { 
    const { setValue } = props;
    const {authMember, setOrderBuilder} = useGlobals();
    const {pausedOrders} = useSelector(pausedOrdersRetriever);  //useSelector hookiga pas qilib pausedOrdersni qolga olamz
    
    /** HANDLERS **/
    const deleteOrderHandler = async (e: T) => {
        try{
            if(!authMember) throw new Error(Messages.error2)
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId, 
                orderStatus: OrderStatus.DELETE,
            };
            
            const confirmation = window.confirm("Do you want to delete the order?"); // anqi o'chirmoqchimisz mantig'i
            if(confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);

                // ORDER REBUID refresh mantig'i
                setOrderBuilder(new Date());
            }
        }catch(err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    }

    const processOrderHandler = async (e: T) => {
        try{
            if(!authMember) throw new Error(Messages.error2)
            //PAYMENT PROCESS

            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId, 
                orderStatus: OrderStatus.PROCESS, //PROCESSGA o'zgartir
            };
            
            const confirmation = window.confirm("Do you want to process with payment?"); // anqi o'chirmoqchimisz mantig'i
            if(confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);

                // => PROCESS ORDER ishga tushsa 2ga o'zgar
                setValue("2");
                setOrderBuilder(new Date()); // Refresh
            }
        }catch(err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    }
    

    return(
        <TabPanel value={"1"}>
            <Stack>
                {/* pausedOrders orderlarni soni */}
                {pausedOrders?.map((order: Order) => {
                    return(
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"} >
                              {order?.orderItems?.map((item: OrderItem) => {
                                const product: Product = order.productData.filter(
                                (ele: Product) => item.productId === ele._id
                                )[0];
                                const imagePath = `${serverApi}/${product.productImages[0]}`
                                return(
                                <Box key={item._id} className={"order-box-price"}>
                                    <img 
                                        src={imagePath}
                                        className={"order-dish-img"}
                                    />
                                    <p className={"title-dish"}>{product.productName}</p>
                                    <Box className={"price-box"}>
                                        <p>${item.itemPrice}</p>
                                        <img src={"/icons/close.svg"}/>
                                        <p>{item.itemQuantity}</p>
                                        <img src={"/icons/pause.svg"}/>
                                        <p style={{ marginLeft: "15px"}}>
                                            ${item.itemQuantity * item.itemPrice}
                                            </p>
                                    </Box>
                                </Box>
                                );
                            })}
                            </Box>

                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>${order.orderTotal - order.orderDelivery}</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px"}}/>
                                    <p>Delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img 
                                        src={"/icons/pause.svg"} 
                                        style={{ marginLeft: "20px"}}/>
                                    <p>ToTal</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                                <Button
                                    value={order._id}
                                    variant="contained"
                                    className={"cancel-button"}
                                    onClick={deleteOrderHandler}
                                >
                                   Cancel
                                </Button>
                                <Button 
                                    value={order._id}
                                    variant="contained" 
                                    className={"pay-button"}
                                    onClick={processOrderHandler}
                                >
                                   Payment
                                </Button>
                            </Box>
                        </Box>
                        );
                     })}
                     {!pausedOrders || (pausedOrders.length === 0 && (
                        <Box 
                            display={"flex"} 
                            flexDirection={"row"} 
                            justifyContent={"center"}>
                            <img 
                                src={"/icons/noimage-list.svg"} 
                                style={{ width: 300, height: 300}}/>
                        </Box>
                        ))}
            </Stack>
        </TabPanel>
    );
  }