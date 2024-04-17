import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useState, useEffect }from 'react';

export default function HomeNavbar() {
    const authMember = null; // authinticed  bo'lmagan userlar un
    const [count, setcount] = useState<number>(0);
    const [value, setvalue] = useState<boolean>(true);

    useEffect(() => {
        console.log("componentDidMount", count);  // DATA FETCH
        setcount(count + 1);

        return () => {
            console.log("componentWillUnmount");
        }
    }, [value]);
    

    /** HANDLERS **/

    const buttonHandler = () => {
        setvalue(!value);
    }

    return (
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

                 <Basket/>

{/* authinticed bo'lmagan user bo'lsa loginni ko'rsatsin*/}
                 {!authMember ? (
                 <Box>
                    <Button variant="contained" className="login-button">
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
                    <Box className={"service-txt"}> {count} hours service</Box>
                    <Box className={"signup"}>
                        {!authMember ? (
                        <Button 
                        variant={"contained"} 
                        className={"signup-button"} 
                        onClick={buttonHandler}>
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