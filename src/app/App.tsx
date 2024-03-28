import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { HomePage } from './screens/homePage';
import { ProductsPage } from './screens/productsPage';
import { OrdersPage } from './screens/ordersPage';
import { UserPage } from './screens/userPage';
import { HomeNavbar } from './components/headers/HomeNavbar';
import { OtherNavbar } from './components/headers/OtherNavbar';
import { Footer } from './components/footer';
import '../css/app.css';
import "../css/navbar.css"

function App() { // MUI componentlari
  // bu mantiq qaysi page daligimizni aniqlash un
  const location = useLocation() //bu hook uning natijasi object, pathname: orqali pageni bilamz

  return (
    // "<>" bu Fragment
    <> 
    {/* agar homePageda bo'lsa HomeNavbar aks holde Othernavbar ochiladi */}
      { location.pathname === "/" ? <HomeNavbar/> : <OtherNavbar/> }
{/* svitch(yo'naltirish) mantigi pathni solishtiryapti qiymati bir xil bo'lsa ochib beryapti */}
    <Switch>
      <Route path="/products">
        <ProductsPage />
      </Route>
      <Route path="/orders">
        <OrdersPage />
      </Route>
      <Route path="/member-page">
        <UserPage />
      </Route>
      <Route path="/help">
        <UserPage />
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
