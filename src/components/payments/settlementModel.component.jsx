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
const SettlementModal = ({ modalOpen, setModalOpen, selectedPaymentId }) => {
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
          width: "70%",
          height: 800,
          borderRadius: "20px",
          bgcolor: "background.paper",
          border: "0px solid #fff",
          boxShadow: 24,
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
              width: "55%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginRight: "auto",
            }}
          >
            <p style={{ fontWeight: 800 }}>
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
              <b>{payementDetails?.settlement_public_id} </b>
            </p>
          </div>
          <div
            style={{
              width: "12%",
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
                  padding: "10px",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                {payementDetails?.settlement_status}
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
              <p style={{}}>
                <b>{payementDetails?.settlement_amount}</b>
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
            paddingBottom: "25px",
          }}
        >
          <p style={{ fontWeight: 800, fontSize: "1.5rem" }}>
            Settlement Details
          </p>
        </div>

        <div
          style={{
            width: "100%",
            minHeight: "250px",
            display: "flex",
            padding: "50px",
            paddingTop: "0px",
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
                  fontWeight: 800,
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
                  fontWeight: 800,
                  fontSize: "1.1rem",
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
                  fontWeight: 800,
                  fontSize: "1.1rem",
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
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                {payementDetails.utr}
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
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                {payementDetails.updated_at}
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
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                BOB0VJRAN120
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",

            padding: "50px",
            paddingTop: "25px",
            paddingBottom: "25px",
          }}
        >
          <p style={{ fontWeight: 800, fontSize: "1.5rem" }}>
            Settlement Against Orders
          </p>
        </div>
        <Divider />
        <TableContainer
          component={Card}
          elevation={4}
          style={{
            width: "90%",
            margin: "auto",
            borderRadius: "20px",
            marginTop: "50px",
          }}
        >
          <Table sx={{ minWidth: "650" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <b>Order Id</b>
                </TableCell>
                <TableCell align="left">
                  <b>Date</b>
                </TableCell>
                <TableCell align="left">
                  <b>Order Item</b>
                </TableCell>
                <TableCell align="left">
                  <b>Price&nbsp;(Rs)</b>
                </TableCell>
                <TableCell align="left">
                  <b>Status</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payementDetails?.productsArray?.map((row) => (
                <TableRow
                  key={row}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row}</TableCell>
                  <TableCell align="left">{row}</TableCell>
                  <TableCell align="left">{row}</TableCell>
                  <TableCell align="left">{row}</TableCell>
                  <TableCell align="left">
                    <b style={{ color: "gray" }}>{row}</b>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default SettlementModal;
