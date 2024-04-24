import React, { useEffect } from "react";
import Statistics from "./Statistic";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css"

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR **/
// dispatch orqali data reducerga kirb keladi
const actionDispatch = (dispatch: Dispatch) => ({ //vareblga tenglab dispatchni typesi bn kiritib unga 1ta argument
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});// setPopularDishes comandasini setPopularDishes reducer orqli amalga oshrmiz
const popularDishesRetriever = createSelector( //yuklangan datani retriever orqali qabul qilish
    retrievePopularDishes, // 1-argument
    (popularDishes) => ({ popularDishes }) // 2-argument
);

export default function HomePage() {
    // actionDispatchni icidan useDispatchni kiritsak bizga setPopularDishes comondasini functiona compni ichiga chaqiradi
    const {setPopularDishes} = actionDispatch(useDispatch()); 
    const {popularDishes} = useSelector(popularDishesRetriever);  //useSelector hookiga pas qilib popularDishesni qolga olamz


    useEffect(() => {}, []); // 3xil lifesicle

    return <div className={"homepage"}>
        <Statistics/>
        <PopularDishes/>
        <NewDishes/>
        <Advertisement/>
        <ActiveUsers/>
        <Events/>
    </div>
}