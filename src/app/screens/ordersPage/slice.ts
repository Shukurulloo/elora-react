import {createSlice} from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";

const initialState: OrdersPageState = { //orderpage scren compga dahldor
    pausedOrders: [], /// boshlang'ich qiymati bo'sh array
    processOrders: [],
    finishedOrders: [],
};

// reducer
const ordersPageSlice = createSlice({ // createSliceni toolkitdan chaqrb 1ta arg hosl qildik
    name: "ordersPage",               // slice nomi
    initialState,                   // yuqorida hosl qilgan boshlang'ich qiymat
    reducers: {                     // 3ta reducerlar hosl qilndi
    /** setPausedOrders ishga tushganda unga state va action beriladi state bu OrdersPageStatedagi dispatch,
      action esa backendan kgan saqlanadigon data, yani uni ichida payload qismidan keladi*/
        setPausedOrders: (state, action) => { 
            // actn payload qsmdan kgan data, initialstateda joylshgan populrdshes nomli keyni valusiga tenglashtrldi(yangilan)  
            state.pausedOrders = action.payload; 
        },
        setProcessOrders: (state, action) => {
            state.processOrders = action.payload;
        },
        setFinishedOrders: (state, action) => {
            state.finishedOrders = action.payload; 
        }
    }
});

/** 3tasini birdan export qilamz yani ordersPageSliceni ichidagi actions qismidan qabul qilamz
 bu reducerlar orderspagedai qismlarda ishlatsh un export qilindi
*/
export const {setPausedOrders, setProcessOrders, setFinishedOrders} = 
    ordersPageSlice.actions;

/** OrersPageReducerni storega bog'lsh un yaxlitligicha reducer orqali export qilamz*/ 
const OrersPageReducer = ordersPageSlice.reducer; 
export default OrersPageReducer;