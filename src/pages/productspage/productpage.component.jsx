import React from 'react';
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import './productpage.styles.scss';
import CustomDrawer from '../../components/drawer/drawer.component';
import Products from '../products/products.component';

function ProductPage() {
  let { section } = useParams();
  return (
    <div className="product-component">
      <CustomDrawer section={"products"} />
      <Divider orientation="vertical" className="divider" />
      <div className="component">
        <Products />
      </div>
    </div>
  );
}

export default ProductPage;