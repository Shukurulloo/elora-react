import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useState, useEffect }from 'react';
import { CartItem } from "../../../lib/types/search";

interface HomeNavbarProps {
    cartItems: CartItem[];
 }
/** hooklar react.16.8
 * ...value
 useState -- class componentni suniy state sini hosil qilib beradi
 useEffect -- har 3 Lifecycle methodi(faza)ni qurib beradi
*/
export default function HomeNavbar(props: HomeNavbarProps) {
    const {cartItems} = props; // destruction usuli
    const authMember = null; //true authinticed  bo'lmagan userlar un
    const [count, setcount] = useState<number>(0); //o'zgaruvci va uni o'zgartruvchiga tenglab
// value varebli va o'zgartruvchi methodni hosl qilib usega tenglab boshlng'ch qiymatini bln true qilamz typeni yozamz
    const [value, setvalue] = useState<boolean>(true);

// bu birinchi 1marta ishga tushadi array dependensy[]ni ichiga biror valueni qo'ysak yana qayta ishga tushadi
    useEffect(() => { // 2ta argumenti bor 1-callback func. 2-array dependensy[]
        console.log("componentDidMount", count);  // DATA FETCH(data olish)
        setcount(count + 1); // birinchi kirib keganda 1taga oshryapti

        return () => {  // return mantiq orqali componentWillUnmount fazasini xosil qilish mumkin
            console.log("componentWillUnmount");
        }
    }, [value]); // componentDidUpdate: valuni qiymati o'zgarsa useeffect qata ishga tushadi buni qo'masak muammo bo'aldi


    /** HANDLERS **/

// bu function, buton bosilsa tru bo'lsa false(qarama qarshi) qiladi
    const buttonHandler = () => {
        setvalue(!value);
    }

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

                <Basket cartItems={cartItems} />

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
                        onClick={buttonHandler}>{/* +1(!false,!true) bu soddalashgani agar argumnet bo'lsa to'liq bshi kk */}
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