import {createSlice} from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
    restaurant: null,  // boshlanish qiymati null
    chosenProduct: null,
    products: [],
}

const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.restaurant = action.payload;// actiondan kelayotgan payload qiymatini tenglaydi
        },
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const { setRestaurant, setChosenProduct, setProducts } = 
productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;  //reducer property oraqali export qilamz storejga
export default ProductsPageReducer;
