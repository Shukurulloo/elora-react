import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import HomePageReducer from './screens/homePage/slice';
import ProductsPageReducer from './screens/productsPage/slice';
import reduxLogger from 'redux-logger'; // externel packageni yukladik 3.0.

// reduxLogger - yordamchi tool, redux storeni ichida qanday data borligi, qanday o'zrgarayotganini aniq (loggin) consol.logda ko'rsatib beradi

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>  
    // @ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,  // HomePageReducerni olib storega  bog'laymiz
    productsPage: ProductsPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
