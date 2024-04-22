import React, { useEffect } from "react";
import Statistics from "./Statistic";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css"

export default function HomePage() {
    // Selector: Store => Data

    useEffect(() => {
        // Backent server data request => Data
        // slice: Data => Store 
    }, []);
    

    return <div className={"homepage"}>
        <Statistics/>
        <PopularDishes/>
        <NewDishes/>
        <Advertisement/>
        <ActiveUsers/>
        <Events/>
    </div>
}