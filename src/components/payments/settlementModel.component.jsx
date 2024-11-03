import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  createTheme,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a36e29",
    },
  },
  typography: {
    fontFamily: '"Work Sans", sans-serif',
  },

  background: {
    paper: "#a36e29",
  },
  text: {
    primary: "#a36e29",
    secondary: "#a36e29",
  },
  action: {
    active: "#a36e29",
  },
  success: {
    dark: "#a36e29",
  },
});

const SettlementModal = ({ modalOpen, setModalOpen, selectedPaymentId }) => {
  const [payementDetails, setPaymentDetails] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [sellerBankDetails, setSellerBankDetails] = useState();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/orders/all.php?type=settlement_detail&settlement_public_id=${selectedPaymentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPaymentDetails(data?.response?.settlement);
      setOrderList(
        Object.values(data?.response?.settlement?.orders).map((item) => item[0])
      );
      setSellerBankDetails(orderList[0]?.seller_bank[0]);
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
          width: "60%",
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
              <CloseIcon style={{ fontSize: "2rem", color: "#A36E29" }} />
            </Button>
          </div>
          <div
            style={{
              width: "55%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginRight: "auto",
            }}
          >
            <p
              style={{
                fontWeight: 800,
                color: "#333333",
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              <b>Settlement : {orderList[0]?.settlement_public_id}</b>
            </p>
            <p
              style={{
                fontWeight: 800,
                color: "gray",
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              {new Date(orderList[0]?.settlement_date).toLocaleDateString(
                "en-GB"
              )}
            </p>
          </div>
          <div
            style={{
              width: "20%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginRight: "auto",
            }}
          >
            <p
              style={{
                fontWeight: 800,
                color: "gray",
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              Settlement ID
            </p>
            <p
              style={{
                color: "#333333",
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              <b>{orderList[0]?.settlement_public_id} </b>
            </p>
          </div>
          <div
            style={{
              width: "12%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginLeft: "auto",
              marginRight: "20px",
            }}
          >
            <p
              style={{
                fontWeight: 800,
                color: "gray",
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              Settlement Amount
            </p>
            <p
              style={{
                color: "#333333",
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              <b>{Number(payementDetails?.total_settled_amount).toFixed(2)} </b>
            </p>
          </div>
        </div>
        <Divider />
        <>
          <div
            style={{
              width: "100%",

              padding: "50px",
              paddingTop: "25px",
              paddingBottom: "0px",
            }}
          >
            <p
              style={{
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "#333333",
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
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
                    fontFamily: '"Work Sans", sans-serif',
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
                    fontFamily: '"Work Sans", sans-serif',
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
                    fontFamily: '"Work Sans", sans-serif',
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
                    fontFamily: '"Work Sans", sans-serif',
                  }}
                >
                  {new Date(orderList[0]?.settlement_date).toLocaleDateString(
                    "en-GB"
                  )}
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
                    fontFamily: '"Work Sans", sans-serif',
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
                    fontFamily: '"Work Sans", sans-serif',
                  }}
                >
                  {sellerBankDetails?.ac_number?.replace(/.(?=.{4})/g, "*")}
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
                    fontFamily: '"Work Sans", sans-serif',
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
                    fontFamily: '"Work Sans", sans-serif',
                  }}
                >
                  {orderList[0]?.utr_number}
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
                    fontFamily: '"Work Sans", sans-serif',
                  }}
                >
                  Bank Name
                </p>
                <p
                  style={{
                    width: "75%",
                    fontSize: "1.1rem",
                    color: "rgba(0,0,0,0.8)",
                    fontWeight: 500,
                    fontFamily: '"Work Sans", sans-serif',
                  }}
                >
                  {sellerBankDetails?.ac_bank_name}
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
                    fontFamily: '"Work Sans", sans-serif',
                  }}
                >
                  IFSC Code
                </p>
                <p
                  style={{
                    width: "75%",
                    color: "rgba(0,0,0,0.8)",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    fontFamily: '"Work Sans", sans-serif',
                  }}
                >
                  {sellerBankDetails?.ac_ifsc}
                </p>
              </div>
            </div>
          </div>
          <Divider />
        </>
        <div
          style={{
            width: "100%",
            padding: "50px",
            paddingTop: "25px",
          }}
        >
          <p
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "#333333",
              fontFamily: '"Work Sans", sans-serif',
            }}
          >
            Settlement Against Orders
          </p>
        </div>
        <ThemeProvider theme={theme}>
          <TableContainer
            component={Card}
            elevation={4}
            style={{
              width: "90%",
              margin: "auto",
              borderRadius: "20px",
              marginBottom: "50px",
            }}
          >
            <Table sx={{ minWidth: "650" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <b>Date</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Order Id</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Order Item(s)</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Settlement Amount</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Total Amount</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList?.map((row) => (
                  <TableRow
                    key={row}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left">{row?.created_at}</TableCell>
                    <TableCell align="left">{row?.order_id}</TableCell>
                    <TableCell align="left">
                      {row?.productsArray?.length > 0
                        ? row.productsArray.length > 1
                          ? `${row.productsArray[0]} + ${
                              row.productsArray.length - 1
                            } others`
                          : row.productsArray[0]
                        : "-"}
                    </TableCell>
                    <TableCell align="left">
                      Rs. {Number(row?.settlement_amount).toFixed(2)}
                    </TableCell>
                    <TableCell align="left">
                      Rs. {Number(row?.total_amount).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
      </Box>
    </Modal>
  );
};

export default SettlementModal;
