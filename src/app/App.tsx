import React, { useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './screens/homePage';
import ProductsPage from './screens/productsPage';
import OrdersPage from './screens/ordersPage';
import UserPage from './screens/userPage';
import HomeNavbar from './components/headers/HomeNavbar';
import OtherNavbar from './components/headers/OtherNavbar';
import Footer from './components/footer';
import HelpPage from './screens/helpPage';
import '../css/app.css';
import "../css/navbar.css";
import "../css/footer.css"
import Test from './screens/Test';
import { CartItem } from '../lib/types/search';

function App() { // MUI componentlari
  // bu mantiq qaysi page daligimizni aniqlash un
  const location = useLocation() //bu hook uning natijasi object, pathname: orqali pageni bilamz

  const cartJson: string | null = localStorage.getItem("cartdata"); // localstorajedan qabul qilamz
  const currentCart = cartJson ? JSON.parse(cartJson) : []; // jsondan objectga aylantrib
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart); // boshlang'ich qiymatini cartItemsga tengladik

  /** HANDLERS **/
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id); // cartItemsdan krib kegan inputni  borligini tekshirib
    if(exist) {
      const cartUpdate = cartItems.map((item: CartItem) => // mavjud bo'lsa faqat productni quantitysi cartda yangilanadi
        item._id === input._id 
        ? {...exist, quantity: exist.quantity + 1} 
        : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartdata", JSON.stringify(cartUpdate)); 
    }else {
      const cartUpdate = [...cartItems, {...input}]; // mavjud bo'lmasa yuqoridagi cart items yangilanadi
      setCartItems(cartUpdate);
      localStorage.setItem("cartdata", JSON.stringify(cartUpdate)); // va localStorham yangilanadi
    }
  }

  return (
    // "<>" bu Fragment
    <> 
    {/* agar homePageda bo'lsa HomeNavbar aks holde Othernavbar ochiladi */}
      { location.pathname === "/" ? (
      <HomeNavbar cartItems={cartItems}/>
      ) : (
      <OtherNavbar cartItems={cartItems} />
      )}
{/* svitch(yo'naltirish) mantigi pathni solishtiryapti qiymati bir xil bo'lsa ochib beryapti */}
    <Switch>
      <Route path="/products">
        <ProductsPage onAdd={onAdd} />
      </Route>
      <Route path="/orders">
        <OrdersPage />
      </Route>
      <Route path="/member-page">
        <UserPage />
      </Route>
      <Route path="/help">
        <HelpPage />
      </Route>
   {/* rout o'zak link (path="/") doim oxirida bo'lishi kerak */}
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
    <Footer/>
  </>
  );
}


export default App;
