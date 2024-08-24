import {
  Button,
  Checkbox,
  Dialog,
  Divider,
  Grid,
  Input,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TrackOrderComponent from "./trackOrder.component";
import OrderSummaryComponent from "./orderSummary.component";
import CustomerDetailComponent from "./customerDetail.component";
import { useEffect, useState } from "react";
import { Label } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const OrderDetail = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [logistics, setLogistics] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { data } = await axios.get(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/orders/all.php?type=order_details&order_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("order summary", data.response);
      setOrderDetails(data.response);
    })();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleFulfillOrder = async () => {
    if (!trackingNumber) return;
    if (!logistics) return;

    const formData = new FormData();
    formData.append("type", "create_shipment");
    formData.append("shipment_id", trackingNumber);
    formData.append("logistics", logistics);

    const { data } = await axios.post(
      `https://api.sadashrijewelkart.com/v1.0.0/seller/orders/all.php`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    navigate("/orders");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "max-content",
        backgroundColor: "#e7e7e7",
      }}
    >
      <Dialog
        maxWidth={"lg"}
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
        }}
        open={open}
        onClose={handleClose}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            height: "584px",
            width: "759px",
            borderRadius: "10px",
          }}
        >
          <p style={{ fontSize: "1.7rem", margin: 0, fontWeight: "bold" }}>
            Fulfill Order
          </p>
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
                width: "130px",
                height: "130px",
                borderRadius: "12px",
                border: "1px solid #e7e7e7",
              }}
            >
              <img
                src={`https://api.sadashrijewelkart.com/assets/${orderDetails[0]?.images[0]["file"]}`}
                alt=""
              />
            </div>
            <div
              style={{
                display: "flex",
                height: "130px",
                width: "50%",
                display: "flex",
                flexDirection: "column",
                marginLeft: "30px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600 }}>
                {orderDetails[0]?.product_name}
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
                Size: 12(44mm) {"     "} Quantity: 1
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
                <span style={{ color: "black" }}>
                  {" "}
                  Rs: {orderDetails[0]?.amount_due}
                </span>
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
          <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            Tracking Information
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "47%" }}>
              <p style={{ color: "gray", fontWeight: 600 }}>Tracking Number</p>
              <TextField
                fullWidth
                onChange={(e) => setTrackingNumber(e.target.value)}
              ></TextField>
            </div>
            <div style={{ width: "47%" }}>
              <p style={{ color: "gray", fontWeight: 600 }}>Shipping Carrier</p>
              <TextField
                fullWidth
                onChange={(e) => setLogistics(e.target.value)}
              ></TextField>
            </div>
          </div>
          <Divider style={{ marginTop: "30px" }} />
          <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            Notify customer of shipment
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Checkbox style={{}} />
            <p
              style={{
                width: "70%",
                color: "gray",
                fontSize: "1.2rem",
                fontWeight: 600,
              }}
            >
              Send shipment details to your customer now
            </p>
          </div>
          <div style={{ width: "100%", display: "flex" }}>
            <Button
              style={{
                marginLeft: "auto",
                width: "250px",
                height: "70px",
                color: "white",
                backgroundColor: "#A36E29",
                fontWeight: 600,
              }}
              onClick={() => handleFulfillOrder()}
            >
              FulFill Order
            </Button>
          </div>
        </div>
      </Dialog>
      <Grid
        spacing={5}
        container
        style={{
          paddingTop: "60px",
          paddingLeft: "100px",
          paddingRight: "100px",
          width: "100%",
          height: "max-content",
        }}
      >
        <Grid item xs={12} style={{ height: "100px" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                width: "300px",
                height: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <ArrowBackIcon
                style={{
                  fontSize: "3rem",
                  color: "#797979",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/orders")}
              />
              <div>
                <p style={{ fontSize: "3rem", margin: 0, lineHeight: 1 }}>
                  {orderDetails[0]?.public_id}
                </p>
                <p style={{ margin: 0, color: "gray" }}>02/10/2024 at 4:15pm</p>
              </div>
            </span>
            <div
              style={{
                width: "80px",
                height: "40px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "5px",
                fontSize: "20px",
                border: "1px solid #b7b7b7",
              }}
            >
              <span
                style={{
                  color:
                    orderDetails[0]?.amount_paid == 0 ? "#cc3521" : "#0D9C00",
                }}
              >
                ●
              </span>
              Paid
            </div>
            <Button
              variant="contained"
              style={{
                marginLeft: "auto",
                width: "300px",
                height: "62px",
                backgroundColor: "#A36E29",
              }}
              onClick={() => setOpen(true)}
            >
              FulFill Order
            </Button>
          </div>
        </Grid>
        <Grid item xs={8}>
          <OrderSummaryComponent orderDetails={orderDetails} />
          <div style={{ padding: "40px", paddingTop: 0, paddingBottom: 0 }}>
            <p style={{ fontSize: "2rem", fontWeight: 600 }}> Order Status</p>
          </div>
          <TrackOrderComponent />
        </Grid>
        <Grid item xs={4}>
          <CustomerDetailComponent
            userData={orderDetails[0]?.user_address[0]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetail;
