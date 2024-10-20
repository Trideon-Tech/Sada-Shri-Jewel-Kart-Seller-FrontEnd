import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Dialog,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerDetailComponent from "./customerDetail.component";
import DelhiveryLogo from "./delhivery_logo.png";
import OrderSummaryComponent from "./orderSummary.component";
import SequelLogo from "./sequel_logo.png";
import TrackOrderComponent from "./trackOrder.component";

const ProductCardSmall = ({ orderDetails }) => {
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
          width: "130px",
          height: "130px",
          borderRadius: "12px",
          border: "1px solid #e7e7e7",
        }}
      >
        <img
          src={`https://api.sadashrijewelkart.com/assets/${orderDetails?.images[0]["file"]}`}
          alt=""
          style={{
            borderRadius: "12px",
          }}
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
        <p
          style={{
            margin: 0,
            fontSize: "1.4rem",
            fontWeight: 600,
            fontFamily: '"Work Sans", sans-serif',
          }}
        >
          {orderDetails?.product_name}
        </p>
        <p
          style={{
            margin: 0,
            color: "gray",
            fontWeight: 500,
            lineHeight: "2rem",
            fontSize: "1.1rem",
            fontFamily: '"Work Sans", sans-serif',
          }}
        >
          Price :{" "}
          <span style={{ color: "black" }}> Rs. {orderDetails?.price}</span>
        </p>
        <p
          style={{
            margin: 0,
            color: "gray",
            fontWeight: 500,
            lineHeight: "2rem",
            fontFamily: '"Work Sans", sans-serif',
          }}
        >
          Deliver By: {Date(orderDetails?.estimated_date)}
        </p>
      </div>
    </div>
  );
};

const OrderDetail = ({ id }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [logistics, setLogistics] = useState("");
  const [logs, setLogs] = useState();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      console.log(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/orders/all.php?type=order_details&order_id=${id}`
      );
      const { data } = await axios.get(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/orders/all.php?type=order_details&order_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("order summary", data?.response);
      setOrderDetails(data?.response);

      setLogs(JSON.parse(data?.response[0]?.shipment_details));
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
        minHeight: "100vh",
        height: "max-content",
        backgroundColor: "#F8F5F0",
      }}
    >
      <Dialog
        maxWidth={"lg"}
        style={{
          width: "100%",
          height: "max-content",
          margin: "auto",
        }}
        open={open}
        onClose={handleClose}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            height: "max-content",
            width: "759px",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontSize: "1.7rem",
              margin: 0,
              fontWeight: 600,
              color: "#333333",
              fontFamily: '"Work Sans", sans-serif',
            }}
          >
            Fulfill Order
          </p>
          <div
            style={{
              width: "100%",
              height: "max-content",
              minHeight: "150px",
              maxHeight: "320px",
              overflowY: "scroll",
              marginBottom: "20px",
            }}
          >
            {orderDetails.map((orderData) => (
              <ProductCardSmall orderDetails={orderData} />
            ))}
          </div>
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              fontFamily: '"Work Sans", sans-serif',
              marginBottom: "14px",
              marginTop: "10px",
            }}
          >
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
              <p
                style={{
                  color: "gray",
                  fontWeight: 600,
                  fontFamily: '"Work Sans", sans-serif',
                  marginBottom: "10px",
                }}
              >
                Tracking Number
              </p>
              <TextField
                fullWidth
                onChange={(e) => setTrackingNumber(e.target.value)}
              ></TextField>
            </div>
            <div style={{ width: "47%" }}>
              <p
                style={{
                  color: "gray",
                  fontWeight: 600,
                  fontFamily: '"Work Sans", sans-serif',
                  marginBottom: "10px",
                }}
              >
                Shipping Partner
              </p>
              <FormControl fullWidth>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  onChange={(event) => setLogistics(event.target.value)}
                  input={<OutlinedInput label="Name" />}
                >
                  {[
                    { name: "Sequel Logistics", logo: SequelLogo },
                    { name: "Delhivery Logistics", logo: DelhiveryLogo },
                  ].map((item) => (
                    <MenuItem key={item.name} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div style={{ width: "100%", display: "flex" }}>
            <Button
              style={{
                marginLeft: "auto",
                width: "250px",
                height: "60px",
                color: "white",
                backgroundColor: "#A36E29",
                fontWeight: 600,
                marginTop: "30px",
                fontFamily: '"Work Sans", sans-serif',
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
                alignItems: "flex-start",
              }}
            >
              <ArrowBackIcon
                style={{
                  fontSize: "3rem",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/orders")}
              />
              <div>
                <p
                  style={{
                    fontSize: "3rem",
                    margin: 0,
                    lineHeight: 1,
                    marginLeft: "20px",
                  }}
                >
                  {orderDetails[0]?.public_id}
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "gray",
                    fontSize: "1.2rem",
                    marginLeft: "20px",
                    paddingTop: "10px",
                    fontWeight: 600,
                  }}
                >
                  Ordered on :{" "}
                  {new Date(
                    orderDetails[0]?.order_created_at
                  ).toLocaleDateString("en-GB")}
                </p>
              </div>
            </span>
            <div
              style={{
                minWidth: "80px",
                width: "max-content",

                marginLeft: "30px",
                height: "40px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "5px",
                fontSize: "20px",
                padding: "10px",
                paddingTop: "20px",
                paddingBottom: "20px",
                border: "1px solid #b7b7b7",
              }}
            >
              <span
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingRight: "10px",
                  color:
                    orderDetails[0]?.amount_paid == 0 ? "#cc3521" : "#0D9C00",
                }}
              >
                ●
              </span>
              {orderDetails[0]?.amount_paid == 0 ? "Unpaid" : "Paid"}
            </div>
            <Button
              variant="contained"
              style={{
                marginLeft: "auto",
                width: "300px",
                height: "62px",
                fontWeight: 700,
                backgroundColor: "#A36E29",
              }}
              onClick={() => setOpen(true)}
            >
              FulFill Order
            </Button>
          </div>
        </Grid>
        <Grid item xs={8} style={{ marginTop: "30px" }}>
          <OrderSummaryComponent
            orderDetails={
              typeof orderDetails === "undefined" || orderDetails === null
                ? []
                : orderDetails
            }
          />
          <div
            style={{ padding: "40px", paddingTop: "50px", paddingBottom: 0 }}
          >
            <p
              style={{
                fontSize: "2rem",
                fontWeight: 600,
                marginBottom: "20px",
              }}
            >
              {" "}
              Order Status
            </p>
          </div>
          <TrackOrderComponent
            logs={typeof logs === "undefined" || logs === null ? {} : logs}
          />
        </Grid>
        <Grid item xs={4} style={{ marginTop: "30px" }}>
          <CustomerDetailComponent
            userData={orderDetails[0]?.user_address[0]}
            orderData={orderDetails[0]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetail;
