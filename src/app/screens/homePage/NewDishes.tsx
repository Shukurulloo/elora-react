import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import AspectRatio from "@mui/joy/AspectRatio";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** SELECTOR **/
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  //yuklangan datani retriever orqali qabul qilis
  newDishes,
}));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever); //useSelector hookiga pas qilib popularDishesni qolga olib uni ishlatamz

  // console.log("newDishes:", newDishes);

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
                newDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume = // agar drink bo'lsa (hajm)litr , aks holda size
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "l"
                      : product.productSize + " size";
                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className={"cards"}
                    >
                      <CardOverflow
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} style={{}} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"} className="titles">
                            <Typography className="title">
                              {product.productName}
                            </Typography>
                            <Divider
                              width="2"
                              height="24"
                              bg="#d9d9d9"
                              mg="0 10px 0 10px"
                            />
                            <Typography className={"price"}>
                              ${product.productPrice}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography className={"views"}>
                              {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px", color: "dark", fontFamily: "Poppins" }}
                              />
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
    </div>
  );
}
