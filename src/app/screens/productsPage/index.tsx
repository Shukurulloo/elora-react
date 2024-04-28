import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Container } from "@mui/material";
import ChosenProduct from './ChosenProduct';
import Products from './Products';
import "../../../css/products.css"
import { CartItem } from '../../../lib/types/search';

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

// screen comp
export default function ProductsPage(props: ProductsPageProps) {
    const {onAdd} = props;
  // bu hook ichidan path qiymatini olamz u orqali nested routin hosil qilamz
    const products = useRouteMatch();
    console.log("products", products);
    return <div className={"products-page"}>
      <Switch>
        {/*  nested(ikkilamci) routing 2 xil path orqali qilndi
          yuqoridagi productsni ichidan pathni olib url da yashaydigon
          "/:" params tushunchasini kiritldi*/}
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd}/>
        </Route>

        <Route path={`${products.path}`}>
          <Products onAdd={onAdd}/>
          </Route>
      </Switch>
      </div>;
  }