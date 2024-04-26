import React, { useEffect } from "react";
import Statistics from "./Statistic";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";
import MemberService from "../../services/MemberService";

/** REDUX SLICE & SELECTOR **/
// dispatch orqali data reducerga kirb keladi
const actionDispatch = (dispatch: Dispatch) => ({ //vareblga tenglab dispatchni typesi bn kiritib unga 1ta argument
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)), // setPopularDishes dispatchga tushadi uni ichida setPopularDishesni clicedan chaqirib uni ichiga yuboriladigon datani payload qilamz
    setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
    setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});// setPopularDishes comandasini setPopularDishes reducer orqli amalga oshrmiz


export default function HomePage() {
    // actionDispatchni icidan useDispatchni kiritsak bizga setPopularDishes comondasini functional compni ichiga chaqiradi
    const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(
        useDispatch()
    ); 

    useEffect(() => {
        // Backend server data fetch => Data
        const product = new ProductService(); // classdan foydalanib object hosl qilamz
        product  // product objectni getProducts methotini ishga tushir.
            .getProducts({  // inputni qiymtini kiritishga majbur qiladi
            page: 1, /// inputni qiymati
            limit: 4, // maxsimal qiymati
            order: "productViews", // ko'p ko'rilganlarni
            productCollection: ProductCollection.DISH, // faqat dish(taom)lar
        })
        .then(data => {  // backentdan kegan malumotlar data qismida qabl etladi
            setPopularDishes(data); // qabl etgan malumot redux storejga yuklaymz u payload deyiladi
        })
        .catch(err => console.log(err));

        product
            .getProducts({
            page: 1,
            limit: 4,
            order: "createdAt",  // createdAt mantig'i asosida oxrgi qshlgan 4ta taom
            // productCollection: ProductCollection.DISH,
        })
        .then(data => setNewDishes(data))
        .catch(err => console.log(err)); // err hosl bosa print qisn

        const member = new MemberService();
        member
        .getTopUsers()
        .then((data) => setTopUsers(data))
        .catch((err) => console.log(err));
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