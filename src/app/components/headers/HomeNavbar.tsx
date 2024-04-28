import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useState, useEffect }from 'react';
import { CartItem } from "../../../lib/types/search";

interface HomeNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void; // hech narsa return qimaydi yani void
    setLoginOpen: (isOpen: boolean) => void; 
 }
/** hooklar react.16.8
 * ...value
 useState -- class componentni suniy state sini hosil qilib beradi
 useEffect -- har 3 Lifecycle methodi(faza)ni qurib beradi
*/
export default function HomeNavbar(props: HomeNavbarProps) {
    const {cartItems, onAdd, onRemove, onDelete, onDeleteAll, setSignupOpen, setLoginOpen} = props; // destruction usulidan foydalanib qo'lga olamz
    const authMember = null; //true authinticed  bo'lmagan userlar un


    /** HANDLERS **/

    return ( //sintaks
    <div className="home-navbar">
        <Container className="navbar-container">
            <Stack 
            className="menu"
            > 
            {/* box oxirgi induvidual bo'g'in hisoblanadi uni ichia matn kiritiladi */}
                <Box>
                    <NavLink to="/">
                        <img 
                        className="brand-logo" src="/icons/burak.svg" />
                    </NavLink>
                </Box>
                <Stack className="links">
                 <Box className={"hover-line"} >
                    {/* "/" Home pageda bo'lsa automatic underline yonadi shu sabab activeClassName={"underline"} */}
                    <NavLink to="/" activeClassName={"underline"}>Home</NavLink>
                 </Box>   
                 <Box className={"hover-line"}>
                    <NavLink to="/products" activeClassName={"underline"}>Products</NavLink>
                 </Box> 
        {/* authinticed bo'lgan user bo'lsa qo'shimcha narsalar ko'rsatsin */}
                 {authMember ? ( 
                 <Box className={"hover-line"}>
                    <NavLink to="/orders" activeClassName={"underline"}>Orders</NavLink>
                 </Box> 
                 ) : null }
                 {authMember ? ( 
                 <Box className={"hover-line"}>
                    <NavLink to="/member-page" activeClassName={"underline"}>My Page</NavLink>
                 </Box> 
                 ) : null }
                 <Box className={"hover-line"}>
                    <NavLink to="/help" activeClassName={"underline"}>Help</NavLink>
                 </Box>

                <Basket 
                  cartItems={cartItems} 
                  onAdd={onAdd}  
                  onRemove={onRemove} 
                  onDelete={onDelete} 
                  onDeleteAll={onDeleteAll}
                  />

{/* authinticed bo'lmagan user bo'lsa loginni ko'rsatsin*/}
                 {!authMember ? (
                 <Box>
                    <Button 
                        variant="contained" 
                        className="login-button" 
                        onClick={() => setLoginOpen(true)} // login boslsa function ishga tushib login alerti ko'rinadi
                    >
                         Login
                    </Button>
                 </Box>
                 ) : (
                     <img 
                        className="user-avatar"
                        src={"/icons/default-user.svg"}
                        aria-haspopup={"true"}
                     />
                 )}
                </Stack>
            </Stack>
            <Stack className={"header-frame"}>
                <Stack className={"detail"}>
                    <Box className={"head-main-txt"}>World's Most Delicious Cousine</Box>
                    <Box className={"wel-txt"}>The Choice, not just a choice</Box>
                    <Box className={"service-txt"}> 24 hours service</Box>
                    <Box className={"signup"}>
                        {!authMember ? (
                        <Button 
                        variant={"contained"} 
                        className={"signup-button"} 
                        onClick={() => setSignupOpen(true)}>{/* bu boslsa funtion ishga tushib sign up alerti chiqadi */}
                            SIGN UP
                        </Button>
                        ) : null}
                    </Box>
                </Stack>
                <Box className={"logo-frame"}>
                    <div className={"logo-img"}></div>
                </Box>
            </Stack>
        </Container>
    </div>)
}