import {createSlice} from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = { //homapage scren compga dahldor
    popularDishes: [], /// boshlang'ich qiymati bo'sh array
    newDishes: [],
    topUsers: [],
};

// reducer
const homePageSlice = createSlice({ // createSliceni toolkitdan chaqrb 1ta arg hosl qildik
    name: "homePage",               // slice nomi
    initialState,                   // yuqorida hosl qilgan boshlang'ich qiymat
    reducers: {                     // 3ta reducerlar hosl qilndi
    /** setPopularDishes ishga tushganda unga state va action beriladi state bu hompagesatedagi dispatch,
      action esa backendan kgan saqlanadigon data, yani uni ichida payload qismidan keladi*/
        setPopularDishes: (state, action) => { 
            // actn payload qsmdan kgan data, initialstateda joylshgan populrdshes nomli keyni valusiga tenglashtrldi(yangilan)  
            state.popularDishes = action.payload; 
        },
        setNewDishes: (state, action) => {
            state.popularDishes = action.payload;
        },
        setTopUsers: (state, action) => {
            state.popularDishes = action.payload; 
        }
    }
});

/** 3tasini birdan export qilamz yani homePageSliceni ichidagi actions qismidan qabul qilamz
 bu reducerlar homepagedai qismlarda ishlatsh un export qilindi
*/
export const {setPopularDishes, setNewDishes, setTopUsers} = 
    homePageSlice.actions;

/** HomePageReducerni storega bog'lsh un yaxlitligicha reducer orqali export qilamz*/ 
const HomePageReducer = homePageSlice.reducer; 
export default HomePageReducer;