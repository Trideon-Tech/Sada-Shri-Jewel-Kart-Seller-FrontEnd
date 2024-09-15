import React from "react";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import "./addnewproductpage.styles.scss";
import CustomDrawer from "../../components/drawer/drawer.component";
import Products from "../products/products.component";
import EditProduct from "../products/editProduct.component";

function EditProductPage() {
  let { section } = useParams();
  return (
    <div className="addproduct-component">
      <CustomDrawer section={"products/add"} />
      <Divider orientation="vertical" className="divider" />
      <div className="component">
        <EditProduct />
      </div>
    </div>
  );
}

export default EditProductPage;
