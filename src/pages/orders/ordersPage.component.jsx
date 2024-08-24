import React from "react";
import { Box, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomDrawer from "../../components/drawer/drawer.component";
import OrdersComponent from "../../components/orders/orders.component";
import "./productpage.styles.scss";

const OrdersPage = () => {
  let { section } = useParams();

  return (
    <div className="product-component">
      <CustomDrawer section={"orders"} />

      <div className="component">
        <OrdersComponent />
      </div>
    </div>
  );
};

export default OrdersPage;
