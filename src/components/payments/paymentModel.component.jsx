import {
  Box,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useEffect, useState } from "react";
const PaymentModal = ({ modalOpen, setModalOpen, selectedPaymentId }) => {
  const [payementDetails, setPaymentDetails] = useState({});
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { data } = await axios.get(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/orders/all.php?type=payment_detail&order_record_id=${selectedPaymentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(
        "data?.response?.payment_list[0]",
        data?.response?.payment_list[0]
      );

      setPaymentDetails(data?.response?.payment_list[0]);
    })();
  }, [selectedPaymentId]);
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "0px solid white",
          width: "70%",
          height: 1000,
          bgcolor: "background.paper",
          border: "2px solid #fff",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "5%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={() => setModalOpen(false)}>
              <CloseIcon style={{ fontSize: "2.5rem" }} />
            </Button>
          </div>
          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginRight: "auto",
            }}
          >
            <p
              style={{
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "rgba(0,0,0,0.8)",
              }}
            >
              <b>Order : {payementDetails?.order_id}</b>
            </p>
            <p style={{ fontWeight: 800, color: "gray" }}>
              {payementDetails?.updated_at}
            </p>
          </div>
          <div
            style={{
              width: "20%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginRight: "auto",
            }}
          >
            <p style={{ fontWeight: 800, color: "gray" }}>SETTLEMENT ID</p>
            <p>
              <b>{payementDetails?.settlement_public_id}</b>
            </p>
          </div>
          <div
            style={{
              width: "15%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginLeft: "auto",
              marginRight: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontWeight: 800, color: "gray" }}>STATUS:</p>
              <p
                style={{
                  backgroundColor: "#F99B1CDF",
                  marginLeft: "20px",
                  padding: "7px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                <b>{payementDetails?.settlement_status}</b>
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontWeight: 800, color: "gray" }}>PAYMENT:</p>
              <p style={{ fontSize: "1.2rem" }}>
                <b>{payementDetails?.total_amount}</b>
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <div
          style={{
            width: "100%",

            padding: "50px",
            paddingTop: "25px",
            paddingBottom: "0px",
          }}
        >
          <p style={{ fontWeight: 800, fontSize: "1.5rem" }}>
            Settlement Details
          </p>
        </div>

        <div
          style={{
            width: "100%",
            minHeight: "150px",
            height: "max-content",

            display: "flex",
            padding: "50px",
            paddingTop: "0px",
            paddingBottom: "0px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "48%",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Type
              </p>
              <p
                style={{
                  width: "75%",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                  fontSize: "1.1rem",
                }}
              >
                Normal Settlement
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Period
              </p>
              <p
                style={{
                  width: "75%",
                  fontSize: "1.1rem",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                }}
              >
                {payementDetails.created_at}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Account
              </p>
              <p
                style={{
                  width: "75%",
                  fontSize: "1.1rem",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                }}
              >
                *********SSFDF
              </p>
            </div>
          </div>

          <div
            style={{
              width: "48%",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                UTR No.
              </p>
              <p
                style={{
                  width: "75%",
                  fontSize: "1.1rem",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                }}
              >
                {payementDetails?.utr_number}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Setted On
              </p>
              <p
                style={{
                  width: "75%",
                  fontSize: "1.1rem",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                }}
              >
                {payementDetails.created_at}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                IFSC CODE
              </p>
              <p
                style={{
                  width: "75%",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                  fontSize: "1.1rem",
                }}
              >
                BOB0VJRAN120
              </p>
            </div>
          </div>
        </div>
        <Divider />

        <Divider />
        <div
          style={{
            width: "100%",

            padding: "50px",
            paddingTop: "25px",
            paddingBottom: "0px",
          }}
        >
          <p style={{ fontWeight: 800, fontSize: "1.5rem" }}>
            Customer Details
          </p>
        </div>

        <div
          style={{
            width: "100%",
            minHeight: "150px",
            display: "flex",
            padding: "50px",
            paddingTop: "0px",
            paddingBottom: "0px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "48%",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Name
              </p>
              <p
                style={{
                  width: "75%",
                  fontSize: "1.1rem",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                }}
              >
                {payementDetails?.user_details?.name}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Email Id
              </p>
              <p
                style={{
                  width: "75%",

                  fontSize: "1.1rem",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                }}
              >
                {payementDetails?.user_details?.email}
              </p>
            </div>
          </div>

          <div
            style={{
              width: "48%",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Phone
              </p>
              <p
                style={{
                  width: "75%",

                  fontSize: "1.1rem",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                }}
              >
                {payementDetails?.user_details?.mobile}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Mode Of Payment
              </p>
              <p
                style={{
                  width: "75%",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,

                  fontSize: "1.1rem",
                }}
              >
                UPI
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <div
          style={{
            width: "100%",

            padding: "50px",
            paddingTop: "25px",
            paddingBottom: "0px",
          }}
        >
          <p style={{ fontWeight: 800, fontSize: "1.5rem" }}>
            Settlement Details
          </p>
        </div>
        <Card
          elevation={3}
          style={{
            width: "95%",
            height: "max-content",
            display: "flex",
            justifyContent: "space-between",
            minHeight: "250px",
            margin: "auto",
            borderRadius: "10px",
            padding: "40px",
            marginTop: "40px",
          }}
        >
          <Box
            style={{
              width: "47%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  color: "gray",
                  width: "250px",
                  fontSize: "1.2rem",
                }}
              >
                Payment Received :{" "}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "green",
                  fontSize: "1.2rem",
                }}
              >
                Rs {payementDetails?.settlement_amount}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                paddingTop: "20px",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  color: "gray",
                  width: "250px",
                  fontSize: "1.2rem",
                }}
              >
                Transaction Amount :{" "}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "red",
                  fontSize: "1.2rem",
                }}
              >
                Rs {payementDetails?.settlement_amount}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  color: "gray",
                  width: "250px",
                  fontSize: "1.2rem",
                }}
              >
                Platform Charge :{" "}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "red",
                  fontSize: "1.2rem",
                }}
              >
                Rs {payementDetails?.commission_perc}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  color: "gray",
                  width: "250px",
                  fontSize: "1.2rem",
                }}
              >
                Payment Gateway Charge :{" "}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "red",
                  fontSize: "1.2rem",
                }}
              >
                Rs {payementDetails?.commission_gst}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  color: "gray",
                  width: "250px",
                  fontSize: "1.2rem",
                }}
              >
                Final Amount :{" "}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "green",
                  fontSize: "1.2rem",
                }}
              >
                Rs {payementDetails?.total_amount}
              </p>
            </div>
          </Box>
          <Box
            style={{
              width: "47%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  color: "white",
                  width: "250px",
                  fontSize: "1.2rem",
                }}
              >
                l
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "white",
                  fontSize: "1.2rem",
                }}
              >
                l
              </p>
            </div>

            <div
              style={{
                width: "100%",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  color: "gray",
                  width: "250px",
                  fontSize: "1.2rem",
                }}
              >
                TDS :{" "}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "red",
                  fontSize: "1.2rem",
                }}
              >
                Rs {payementDetails?.tds_perc}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  color: "gray",
                  width: "250px",
                  fontSize: "1.2rem",
                }}
              >
                TCS :{" "}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "red",
                  fontSize: "1.2rem",
                }}
              >
                Rs {payementDetails?.tcs_perc}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  color: "gray",
                  width: "250px",
                  fontSize: "1.2rem",
                }}
              ></p>
              <p
                style={{
                  fontWeight: 600,
                  color: "green",
                  fontSize: "1.2rem",
                }}
              >
                {" "}
              </p>
            </div>
          </Box>
        </Card>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
