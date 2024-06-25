import React, { useState, useEffect }from 'react';
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
    cartItems: CartItem[]; // kelishi takidlaymz
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void; // hech narsa return qimaydi yani void
    setLoginOpen: (isOpen: boolean) => void;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void;
 }
/** hooklar react.16.8
 * ...value
 useState -- class componentni suniy state sini hosil qilib beradi
 useEffect -- har 3 Lifecycle methodi(faza)ni qurib beradi
*/
export default function HomeNavbar(props: HomeNavbarProps) {
    const {
        cartItems, 
        onAdd, // destruction usulidan foydalanib qo'lga olamz
        onRemove, 
        onDelete, 
        onDeleteAll, 
        setSignupOpen, 
        setLoginOpen,
        handleLogoutClick,
        anchorEl,
        handleCloseLogout,
        handleLogoutRequest,
    } = props; 
    const {authMember} = useGlobals(); // authinticed  bo'gan bo'lmagan userlar un


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
                  <h1>ELORA</h1>
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

                <Basket // basketga props orqali pass qilamz
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
                        src={
                            authMember.memberImage 
                            ? `${serverApi}/${authMember.memberImage}` 
                            : "/icons/default-user.svg"
                        }
                        aria-haspopup={"true"}
                        onClick={handleLogoutClick}
                     />
                 )}

                <Menu
                    anchorEl={anchorEl} // imgga bosilsa anchorEl shu ishga tushib logout ko'rinsin
                    id="account-menu"
                    open={Boolean(anchorEl)}
                    onClose={handleCloseLogout}
                    onClick={handleCloseLogout}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleLogoutRequest}>
                        <ListItemIcon>
                            <Logout fontSize="small" style={{ color: 'red' }} />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>

                </Stack>
            </Stack>
            <Stack className={"header-frame"}>
                <Stack className={"detail"}>
                    <Box className={"head-main-txt"}>Discover Culinary Excellence</Box>
                    <Box className={"wel-txt"}>Where Choice Meets Perfection</Box>
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
                    {/* <div className={"logo-img"}></div> */}
                </Box>
            </Stack>
        </Container>
    </div>)
}