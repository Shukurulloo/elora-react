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
import Test from './screens/Test';
import useBasket from './hooks/useBasket';
import AuthenticationModal from './components/auth';
import '../css/app.css';
import "../css/navbar.css";
import "../css/footer.css"
import { T } from '../lib/types/common';
import { sweetErrorHandling, sweetTopSuccessAlert } from '../lib/sweetAlert';
import { Messages } from '../lib/config';
import MemberService from './services/MemberService';
import { useGlobals } from './hooks/useGlobals';

function App() { // MUI componentlari

  // bu mantiq qaysi page daligimizni aniqlash un
  const location = useLocation() //bu hook uning natijasi object, pathname: orqali pageni bilamz
  const {setAuthMember} = useGlobals();
  const {cartItems, onAdd, onRemove, onDelete, onDeleteAll} = useBasket(); //useBasket customized hookdan qabul qilamz
  const [signupOpen, setSignupOpen] = useState<boolean>(false); // boshlang/ich qiymati false
  const [loginOpen, setLoginOpen] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS */

  const handleSignupClose = () => setSignupOpen(false); // handleSignupClose ishga tushsa false bo'lsin
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget); //currentTargetni qiymatini qabul qilamz
  }
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try{
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);

    }catch(err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  }

  return (
    // "<>" bu Fragment
    <> 
    {/* agar homePageda bo'lsa HomeNavbar aks holde Othernavbar ochiladi */}
      { location.pathname === "/" ? (
      <HomeNavbar 
        cartItems={cartItems} // hanldeklarni navbarga pass qilamz
        onAdd={onAdd}  
        onRemove={onRemove} 
        onDelete={onDelete} 
        onDeleteAll={onDeleteAll}
        setSignupOpen={setSignupOpen}
        setLoginOpen={setLoginOpen}
        anchorEl={anchorEl}
        handleLogoutClick={handleLogoutClick}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}
      />
      ) : (
      <OtherNavbar 
        cartItems={cartItems}
        onAdd={onAdd} 
        onRemove={onRemove} 
        onDelete={onDelete} 
        onDeleteAll={onDeleteAll}
        setSignupOpen={setSignupOpen}
        setLoginOpen={setLoginOpen}
        anchorEl={anchorEl}
        handleLogoutClick={handleLogoutClick}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}
      />
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

    <AuthenticationModal // import qoilamz
      signupOpen={signupOpen}
      loginOpen={loginOpen}
      handleLoginClose={handleLoginClose}
      handleSignupClose={handleSignupClose}/>
  </>
  );
}


export default App;
