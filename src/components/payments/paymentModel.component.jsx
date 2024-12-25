import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, Divider, Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const PaymentModal = ({ modalOpen, setModalOpen, selectedPaymentId }) => {
  const [payementDetails, setPaymentDetails] = useState({});
  const [sellerBankDetails, setSellerBankDetails] = useState();
  useEffect(() => {
    (async () => {
      console.log(selectedPaymentId);
      const token = localStorage.getItem("token");
      if (!selectedPaymentId) return;
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

      setPaymentDetails(data?.response?.payment_list[0]);
      setSellerBankDetails(data?.response?.payment_list[0]?.seller_bank[0]);
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
          width: "60%",
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
              <CloseIcon style={{ fontSize: "2rem", color: "#A36E29" }} />
            </Button>
          </div>
          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "#333333",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              <b>Order : {payementDetails?.order_id}</b>
            </div>
            <div
              style={{
                fontWeight: 800,
                color: "gray",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              {new Date(payementDetails?.updated_at).toLocaleDateString(
                "en-GB"
              )}
            </div>
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
            <p
              style={{
                fontWeight: 800,
                color: "gray",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              SETTLEMENT ID
            </p>
            <p
              style={{
                color: "#333333",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
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
              <p
                style={{
                  fontWeight: 800,
                  color: "gray",
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                STATUS:
              </p>
              <p
                style={{
                  backgroundColor:
                    payementDetails?.settlement_status === "NOT_SETTLED"
                      ? "#F99B1CDF"
                      : "#87c914",
                  marginLeft: "20px",
                  padding: "7px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  color: "white",
                  borderRadius: "5px",
                  fontFamily: '"Roboto", sans-serif',
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
              <p
                style={{
                  fontWeight: 800,
                  color: "gray",
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                PAYMENT:
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#333333",
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                <b>Rs. {payementDetails?.total_amount}</b>
              </p>
            </div>
          </div>
        </div>
        <Divider />
        {payementDetails?.settlement_status === "NOT_SETTLED" ? (
          <div></div>
        ) : (
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
                  fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
                    }}
                  >
                    {new Date(
                      payementDetails?.settlement_date
                    ).toLocaleDateString("en-GB")}
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
                      fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
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
                      fontFamily: '"Roboto", sans-serif',
                    }}
                  >
                    {sellerBankDetails?.ac_ifsc}
                  </p>
                </div>
              </div>
            </div>
            <Divider />
          </>
        )}
        <div
          style={{
            width: "100%",
            padding: "50px",
            paddingTop: "25px",
            paddingBottom: "25px",
          }}
        >
          <p
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "#333333",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Customer Details
          </p>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            padding: "50px",
            paddingTop: "0px",
            paddingBottom: "30px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "48%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                  fontFamily: '"Roboto", sans-serif',
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
                  fontFamily: '"Roboto", sans-serif',
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
                marginTop: "8px",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Email Id
              </p>
              <p
                style={{
                  width: "75%",
                  fontFamily: '"Roboto", sans-serif',
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
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Phone
              </p>
              <p
                style={{
                  width: "75%",
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: "1.1rem",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                }}
              >
                +{payementDetails?.user_details?.mobile}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                User Since
              </p>
              <p
                style={{
                  width: "75%",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 500,
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: "1.1rem",
                }}
              >
                {new Date(
                  payementDetails?.user_details?.created_at
                ).toLocaleDateString("en-GB")}
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
          <p
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "#333333",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Payment Details
          </p>
        </div>
        <Card
          elevation={3}
          style={{
            width: "95%",
            height: "max-content",
            display: "flex",
            justifyContent: "space-between",
            margin: "auto",
            borderRadius: "10px",
            padding: "40px",
            marginTop: "20px",
            marginBottom: "40px",
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
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Payment Received :{" "}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "green",
                  fontSize: "1.2rem",
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Rs. {payementDetails?.total_amount}
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
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Platform Charge :{" "}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "red",
                  fontSize: "1.2rem",
                  fontFamily: '"Roboto", sans-serif',
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
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                PG Charge :
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "red",
                  fontSize: "1.2rem",
                  fontFamily: '"Roboto", sans-serif',
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
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Final Amount :
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "green",
                  fontSize: "1.2rem",
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Rs {payementDetails?.settlement_amount}
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
                  color: "gray",
                  width: "250px",
                  fontSize: "1.2rem",
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                TDS :
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "red",
                  fontSize: "1.2rem",
                  fontFamily: '"Roboto", sans-serif',
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
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                TCS :
              </p>
              <p
                style={{
                  fontWeight: 600,
                  color: "red",
                  fontSize: "1.2rem",
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Rs {payementDetails?.tcs_perc}
              </p>
            </div>
          </Box>
        </Card>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
