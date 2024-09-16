import React from "react";
import { Box, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomDrawer from "../../components/drawer/drawer.component";
import OrdersComponent from "../../components/orders/orders.component";
import "./productpage.styles.scss";
import PaymentsComponent from "../../components/payments/payments.component";

const PaymentsPage = () => {
  let { section } = useParams();

  return (
    <div className="product-component">
      <CustomDrawer section={"payments"} />

      <div className="component">
        <PaymentsComponent />
      </div>
    </div>
  );
};

export default PaymentsPage;
