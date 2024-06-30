import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

// sectional comp

/** REDUX SLICE & SELECTOR **/
// dispatch orqali data reducerga kirb keladi
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)), //
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props; // distraction
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    // maxsus object
    page: 1, // birichi sahifa
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH, // 1-pageda dishga tegishli 8ta data kelsin
    search: "", //bo'sh bo'lsin
  });
  const [searchText, setSearchText] = useState<string>(""); // text qirish boshlangic qiymati bo'sh string
  const history = useHistory();

  useEffect(() => {
    // backentdan datani olish
    const product = new ProductService();
    product
      .getProducts(productSearch) //product servicedan kelgan datani reduxga set qilamz
      .then((data) => setProducts(data)) // set qilamz
      .catch((err) => console.log(err));
  }, [productSearch]); // productSearchni qiymati har safar o'zgarsa backentdan datani oladi array debendensy

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS ishlab chiqishlar **/
  // button bosilsa boshqa turdagi menu ciqsh
  const searchCollectionHandler = (collection: ProductCollection) => {
    // parametr
    productSearch.page = 1; //2,3-page turib butoni bossa 1ga o'tsin
    productSearch.productCollection = collection; // productsearchni productCollectionini kirib kegan colectionga tengla
    setProductSearch({ ...productSearch }); // spredOpertor o-li productSearch objni qiymayangi object ocilsin
  }; // spredOpertor o-li productSearch objni qiymatidan yangi object ocilsin va useefect qayta ishga tushadi

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order; // orderni o'zgarsin
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    // text qidirish
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    //pagination
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className="top-text">
              <p>Elora Reastaurant</p>
              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText} // yuqoridagini kiritamz
                  onChange={(e) => setSearchText(e.target.value)} // event orqali inputga yozilgan qiymatni qo'lga olamz
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler(); // enterni bossa qidiradi
                  }}
                />
                <Button
                  className={"single-button-search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler} // qidirsh buttoni bosilsa searchProductHandler ishga tushadi
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                className={`order ${
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }`}
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                className={`order ${
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }`}
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                className={`order ${
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }`}
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
            {/* <Stack className={"dishes-filter-box"}>
                    <Button      
                        variant={"contained"}
                        className={"order"}
                        color={
                            productSearch.order === "createdAt" ? "primary" : "secondary"
                        }// button bosilsasearchOrderHandler ishga tushsin
                        onClick={() => searchOrderHandler("createdAt")} // yangi ochilganlar birinchi
                    >
                        New
                    </Button>
                    <Button
                        variant={"contained"}
                        className={"order"}
                        color={
                            productSearch.order === "productPrice" 
                            ? "primary" 
                            : "secondary"
                        }
                        onClick={() => searchOrderHandler("productPrice")}
                    >
                        Price
                    </Button>
                    <Button
                        variant={"contained"}
                        className={"order"}
                        color={
                            productSearch.order === "productViews" 
                            ? "primary" 
                            : "secondary"
                        }
                        onClick={() => searchOrderHandler("productViews")}
                    >
                        Views
                    </Button>
                </Stack> */}
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button
                  variant={"contained"}
                  className={`order ${
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  } `}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
                <Button
                  variant={"contained"}
                  className={`order ${
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "primary"
                      : "secondary"
                  } `}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  Dessert
                </Button>
                <Button
                  variant={"contained"}
                  className={`order ${
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  } `}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Drink
                </Button>
                <Button
                  variant={"contained"}
                  className={`order ${
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  } `}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  Salad
                </Button>
                <Button
                  variant={"contained"}
                  className={`order ${
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  } `}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  Dish
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`; // har bir productni ichidan imgni qo'lga olamz
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK // agar drink bo'lsa litr aks holda size
                      ? product.productVolume + " litre"
                      : product.productSize + " size";
                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button
                          className={"shop-btn"} // bu savatcha buttoni
                          onClick={(e) => {
                            // bosilganda eventni qo'lga olib
                            onAdd({
                              //onAdd ishga tushuib inputni pass qilamz
                              _id: product._id,
                              quantity: 1, // doim bitta tavar qo'shishi kerak
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0], // birinchi productni qiymatini pass qilamz
                            });
                            e.stopPropagation(); // bo'limga bosilsa chosen pagega o'tishini to'xtatadi
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            {/* Pagination bu karusel */}
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  className={"pagination"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Container className="family-brands">
          <Box className="category-title">Our Family Brands</Box>
          <Stack className="brand-list">
            <Box className="review-box">
              <img src="/img/EloraBrand.jpg" alt="Gurme" />
            </Box>
            <Box className="review-box">
              <img src="/img/elorabrand2.png" alt="Sweets" />
            </Box>
            <Box className="review-box">
              <img src="/img/elorabrand3.jpg" alt="Seafood" />
            </Box>
            <Box className="review-box">
              <img src="/img/elorabrand4.jpg" alt="Doner" />
            </Box>
            <Box className="review-box">
              <img src="/img/elorabrand5.png" alt="Doner" />
            </Box>
            <Box className="review-box">
              <img src="/img/elorabrand6.png" alt="Doner" />
            </Box>
          </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            {/* iframe bu orqali googe-map ochiladi */}
            <iframe
              style={{
                marginTop: "60px",
                border: "none",
                boxShadow: " 16px 14px 13px rgba(73, 172, 218, 0.1)",
              }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
              width="1120"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
