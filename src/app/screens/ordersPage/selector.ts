import { createSelector } from "reselect"; // external package, toolkit o'zi sozlab olgan bo'ladi
import { AppRootState } from "../../../lib/types/screen";
// ihtiyori joyda ishlatish un

// homepagega dahldor bo'gan storejni qo'lga olamz stateni approt typesi bn belgilaymz
const selectOrdersPage = (state: AppRootState) => state.ordersPage; // stateni ichidagi homepagni qo'lga olamz

//  slicedagi initialState hosl bo'gan 3ta qiymatlarni qaul qilishni imkonini beradigon selectorlarni hosl qlamz
export const retrievePausedOrders = createSelector( // export qilindi, retrieve-datani qabul qilsh
    selectOrdersPage, // 1-argumentga yuqoridagini briktiramz
    (OrdersPage) => OrdersPage.pausedOrders // qo'lga olingan homepageni ichidan aynan popular dishesni qabul qilndi  
);

export const retrieveProcessOrders = createSelector(
    selectOrdersPage,
    (OrdersPage) => OrdersPage.processOrders
);

export const retrieveFinishedOrders = createSelector(
    selectOrdersPage,
    (OrdersPage) => OrdersPage.finishedOrders
);