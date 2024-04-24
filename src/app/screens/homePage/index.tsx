import React, { useEffect } from "react";
import Statistics from "./Statistic";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css"

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPopularDishes } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SLICE & SELECTOR **/
// dispatch orqali data reducerga kirb keladi
const actionDispatch = (dispatch: Dispatch) => ({ //vareblga tenglab dispatchni typesi bn kiritib unga 1ta argument
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});// setPopularDishes comandasini setPopularDishes reducer orqli amalga oshrmiz


export default function HomePage() {
    // actionDispatchni icidan useDispatchni kiritsak bizga setPopularDishes comondasini functiona compni ichiga chaqiradi
    const {setPopularDishes} = actionDispatch(useDispatch()); 

    useEffect(() => {
        // Backend server data fetch => Data
        const product = new ProductService();
        product.getProducts({
            page: 1,
            limit: 4,
            order: "productViews",
            productCollection: ProductCollection.DISH,
        })
        .then(data => {
            setPopularDishes(data);
        })
        .catch(err => console.log(err));
    }, []); // 3xil lifesicle

    return <div className={"homepage"}>
        <Statistics/>
        <PopularDishes/>
        <NewDishes/>
        <Advertisement/>
        <ActiveUsers/>
        <Events/>
    </div>
}