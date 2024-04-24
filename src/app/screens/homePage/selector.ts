import { createSelector } from "reselect"; // external package, toolkit o'zi sozlab olgan bo'ladi
import { AppRootState } from "../../../lib/types/screen";
// ihtiyori joyda ishlatish un

// homepagega dahldor bo'gan storejni qo'lga olamz stateni approt typesi bn belgilaymz
const selectHomePage = (state: AppRootState) => state.homePage; // stateni ichidagi homepagni qo'lga olamz

//  slicedagi initialState hosl bo'gan 3ta qiymatlarni qaul qilishni imkonini beradigon selectorlarni hosl qlamz
export const retrievePopularDishes = createSelector( // export qilindi, retrieve-datani qabul qilsh
    selectHomePage, // 1-argumentga yuqoridagini briktiramz
    (HomePage) => HomePage.popularDishes // qo'lga olingan homepageni ichidan aynan popular dishesni qabul qilndi  
)

export const retrieveNewDishes = createSelector(
    selectHomePage,
    (HomePage) => HomePage.newDishes
)

export const retrieveTopUsers = createSelector(
    selectHomePage,
    (HomePage) => HomePage.topUsers
)