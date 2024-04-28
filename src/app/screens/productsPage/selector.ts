import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

// ProductsPage dahldor bo'gan storejni qo'lga olamz stateni approt typesi bn belgilaymz
const selectProductsPage = (state: AppRootState) => state.productsPage; // productsPageni qo'lga olamz

export const retrieveRestaurant = createSelector(
    selectProductsPage, 
    (ProductsPage) => ProductsPage.restaurant // sliceda o'zgargan datani olib yuboramz
);


export const retrieveChosenProduct = createSelector(
    selectProductsPage, 
    (ProductsPage) => ProductsPage.chosenProduct
);


export const retrieveProducts = createSelector(
    selectProductsPage, 
    (ProductsPage) => ProductsPage.products
);