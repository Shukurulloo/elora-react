import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import {CssVarsProvider} from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import AspectRatio from "@mui/joy/AspectRatio";

const newDishes = [
    { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab.webp" },
    { productName: "Lavash", imagePath: "/img/lavash.webp" },
];


export default function NewDishes() {
    return (
        <div className="new-products-frame">
            <Container>
                <Stack className={"main"}>
                    <Box className={"category-title"}>Fresh Menu</Box>
                    <Stack className="cards-frame">
                      <CssVarsProvider>
               {/* agar  newDishesni ichida product mavjud bo'lsa products ko'rinadi 
                    agar  mavjud bo'lmasa pastda yozilgan text ko'rinadi*/}
                        {newDishes.length !== 0 ? ( 
                         newDishes.map((ele, index) => {
                         return (
                            <Card key={index} variant="outlined" className={"card"}>
                                <CardOverflow>
                                    <div className="product-sale">Normal size</div>
                                    <AspectRatio ratio="1">
                                        <img src={ele.imagePath} alt=""/>
                                    </AspectRatio>
                                </CardOverflow>

                                <CardOverflow variant="soft" className="product-detail">
                                <Stack className="info">
                                     <Stack flexDirection={"row"} >
                                <Typography className="info">
                                    {ele.productName}
                                </Typography>
                                <Divider width="2" height="24" bg="#d9d9d9" mg="0 10px 0 10px" />
                                 <Typography className={"price"}>$12</Typography>
                                  </Stack>
                                    <Stack>
                                     <Typography className={"views"}>
                                        20
                                        <VisibilityIcon 
                                        sx={{fontSize: 20, marginLeft: "5px"}}/>
                                     </Typography>
                                    </Stack>
                                 </Stack>
                                </CardOverflow>
                            </Card> 
                            );
                         })
                        ) : ( 
                        <Box className="no-data">New products are not available!</Box>
                        )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>);
}