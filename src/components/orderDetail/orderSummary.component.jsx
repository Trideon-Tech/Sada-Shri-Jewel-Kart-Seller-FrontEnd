import { Button, Divider, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
const OrderInfoCard = ({ orderDetail }) => {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "30px",
        height: "max-content",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "12px",
          border: "1px solid #e7e7e7",
          overflow: "hidden",
        }}
      >
        <img
          src={`https://api.sadashrijewelkart.com/assets/${orderDetail.images[0]["file"]}`}
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          height: "160px",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          marginLeft: "30px",
        }}
      >
        <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600 }}>
          {orderDetail?.product_name}
        </p>
        <p
          style={{
            margin: 0,
            marginTop: "auto",
            color: "gray",
            lineHeight: "2rem",
            fontWeight: 500,
            fontSize: "1.1rem",
          }}
        >
          Size: {orderDetail?.height} {"     "} Quantity:{" "}
          {orderDetail?.quantity}
        </p>
        <p
          style={{
            margin: 0,
            color: "gray",
            fontWeight: 500,
            lineHeight: "2rem",
            fontSize: "1.1rem",
          }}
        >
          Price :{" "}
          <span style={{ color: "black" }}> Rs: {orderDetail?.price}</span>
        </p>
        <p
          style={{
            margin: 0,
            color: "gray",
            fontWeight: 500,
            lineHeight: "2rem",
          }}
        >
          Deliver By: 2nd May, 2024
        </p>
      </div>
    </div>
  );
};
const OrderSummaryComponent = ({ orderDetails }) => {
  return (
    <div
      style={{
        width: "calc(100% )",
        padding: "40px",
        height: "max-content",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <span
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          height: "max-content",
        }}
      >
        <p
          style={{
            width: "300px",
            fontSize: "2rem",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Order Summary
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100px",
            height: "36px",
            backgroundColor: "#F99B1C59",
            borderRadius: "5px",
            color: "#F99B1C",
          }}
        >
          Unfulfilled
        </div>
      </span>
      {orderDetails?.map((item) => (
        <OrderInfoCard orderDetail={item} />
      ))}

      <div
        style={{
          marginTop: "30px",
          marginBottom: "10px",
          width: "60px",
          height: "30px",
          display: "flex",
          borderRadius: "8px",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e7e7e7",
        }}
      >
        Paid
      </div>
      <div
        style={{
          width: "calc(100% - 20px)",
          padding: "10px",
          height: "200px",
          borderRadius: "10px",
          border: "1px solid #e7e7e7",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            color: "#797979",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          <div style={{ width: "25%" }}>
            <p style={{ textAlign: "left" }}>Subtotal</p>
          </div>
          <div style={{ width: "60%" }}>
            <p style={{ textAlign: "left" }}>{orderDetails?.length} Item</p>
          </div>
          <div style={{ width: "15%" }}>
            <p style={{ textAlign: "right" }}>
              Rs: {orderDetails[0]?.amount}.0
            </p>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            color: "#797979",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          <div style={{ width: "25%" }}>
            <p style={{ textAlign: "left" }}>Discount</p>
          </div>
          <div style={{ width: "60%" }}>
            <p style={{ textAlign: "left" }}>FIRST10</p>
          </div>
          <div style={{ width: "15%" }}>
            <p style={{ textAlign: "right" }}>- Rs: 59.0</p>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            color: "#797979",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          <div style={{ width: "25%" }}>
            <p style={{ textAlign: "left" }}>Shipping</p>
          </div>
          <div style={{ width: "60%" }}>
            <p style={{ textAlign: "left" }}>
              Standart (0.25g: Item: 0.25g , Package 0.0g)
            </p>
          </div>
          <div style={{ width: "15%" }}>
            <p style={{ textAlign: "right" }}>Rs: 0.0</p>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            color: "#797979",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          <div style={{ width: "25%" }}>
            <p style={{ textAlign: "left" }}>
              <b>Total</b>
            </p>
          </div>
          <div style={{ width: "60%" }}>
            <p style={{ textAlign: "left" }}></p>
          </div>
          <div style={{ width: "15%" }}>
            <p style={{ textAlign: "right" }}>
              <b>Rs: {orderDetails[0]?.amount_due}.00</b>
            </p>
          </div>
        </div>
        <Divider />
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            color: "#797979",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          <div style={{ width: "25%" }}>
            <p style={{ textAlign: "left" }}>Paid</p>
          </div>
          <div style={{ width: "60%" }}>
            <p style={{ textAlign: "left" }}></p>
          </div>
          <div style={{ width: "15%" }}>
            <p style={{ textAlign: "right" }}>
              Rs: {orderDetails[0]?.amount_paid}.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryComponent;