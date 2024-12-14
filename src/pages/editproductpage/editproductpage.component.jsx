import { Divider } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import CustomDrawer from "../../components/drawer/drawer.component";
import EditProduct from "../products/editProduct.component";
import "./editproductpage.styles.scss";

function EditProductPage() {
  let { section } = useParams();
  return (
    <div className="addproduct-component">
      <CustomDrawer section={"products"} />
      <Divider orientation="vertical" className="divider" />
      <div className="component">
        <EditProduct />
      </div>
    </div>
  );
}

export default EditProductPage;
