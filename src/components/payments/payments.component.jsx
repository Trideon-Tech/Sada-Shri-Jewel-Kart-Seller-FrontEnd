import Tab, { tabClasses } from "@mui/joy/Tab";
import {
  Box,
  CircularProgress,
  createTheme,
  Paper,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./orders.styles.scss";

import { TabList, Tabs } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./paymentModel.component";
import SettlementModal from "./settlementModel.component";

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

const PaymentsComponent = ({ row }) => {
  const [ordersList, setOrdersList] = useState([]);
  const [orderStats, setOrderStats] = useState({});
  const [selectedPaymentId, setSelectedPaymentId] = useState("");

  const [paymentList, setPaymentList] = useState([]);
  const [settlementList, setSettlementList] = useState([]);
  const [refundList, setRefundList] = useState([]);
  const [showDataLoading, setShowDataLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { data } = await axios.get(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/orders/all.php?type=payment_list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data: settlementList } = await axios.get(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/orders/all.php?type=settlement_list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("settlementList", settlementList?.response?.settlement_list);

      setShowDataLoading(false);
      setOrdersList(data?.response?.payment_list);

      setPaymentList(
        data?.response?.payment_list.sort((a, b) => {
          return new Date(b.updated_at) - new Date(a.updated_at);
        })
      );

      setSettlementList(
        settlementList?.response?.settlement_list.sort((a, b) => {
          return new Date(b.updated_at) - new Date(a.updated_at);
        })
      );

      setRefundList(
        data?.response?.payment_list?.filter(
          (item) => item?.shipment_status === "REFUND_LIST"
        )
      );

      setOrderStats(data?.response?.dashboard_details);
    })();
  }, []);

  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [openSettlementModal, setOpenSettlementModal] = useState(false);

  const [showLoading, setShowLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showDrawer, setShowDrawer] = useState(false);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="category-component">
      <ToastContainer />

      {/* Swipable Drawer */}
      <ThemeProvider theme={theme}>
        <SwipeableDrawer
          anchor="right"
          open={showDrawer}
          onClose={() => {
            setShowLoading(false);

            setShowDrawer(false);
          }}
          onOpen={() => setShowDrawer(true)}
        ></SwipeableDrawer>
      </ThemeProvider>

      {/* Main Content */}
      <div className="head">
        <div className="head-txt">Payments</div>
      </div>

      <div>
        {selectedTab === 0 ? (
          <PaymentModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedPaymentId={selectedPaymentId}
          />
        ) : (
          <SettlementModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedPaymentId={selectedPaymentId}
          />
        )}
      </div>
      <Box
        sx={{
          width: "95%",
          marginLeft: "40px",
          marginRight: "auto",
          marginBottom: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs
          aria-label="tabs"
          defaultValue={0}
          onChange={(event, value) => {
            setSelectedTab(value);
            if (value === 0) {
              setOrdersList(() => paymentList);
            }
            if (value === 1) {
              setOrdersList(settlementList);
            }
            if (value === 3) {
              setOrdersList(refundList);
            }
          }}
          sx={{
            bgcolor: "transparent",
            borderColor: "green",
          }}
        >
          <TabList
            disableUnderline
            sx={{
              p: 0.5,

              gap: 0,
              borderRadius: "xl",
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: "sm",
                bgcolor: "background.surface",
                border: "2px solid brown",
              },
            }}
          >
            <Tab
              value={0}
              disableIndicator
              style={{
                minWidth: "300px",
                padding: "20px",
                borderRadius: "5px",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                border:
                  selectedTab === 0 ? "2px solid #A36E29" : "2px solid #BEBEBE",
              }}
            >
              <p
                style={{
                  fontWeight: 550,
                  color: selectedTab === 0 ? "#A36E29" : "gray",
                }}
              >
                Payment
              </p>
            </Tab>
            <Tab
              value={1}
              disableIndicator
              style={{
                minWidth: "300px",
                padding: "20px",
                borderRadius: 0,
                border:
                  selectedTab === 0 ? "2px solid #A36E29" : "2px solid #BEBEBE",
              }}
            >
              <p
                style={{
                  fontWeight: 550,
                  color: selectedTab === 1 ? "#A36E29" : "gray",
                }}
              >
                Settlement
              </p>
            </Tab>
            <Tab
              value={2}
              disableIndicator
              style={{
                minWidth: "300px",
                padding: "20px",
                borderRadius: "5px",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                border:
                  selectedTab === 0 ? "2px solid #A36E29" : "2px solid #BEBEBE",
              }}
            >
              <p
                style={{
                  fontWeight: 550,
                  color: selectedTab === 2 ? "#A36E29" : "gray",
                }}
              >
                {" "}
                Refund
              </p>
            </Tab>
          </TabList>
        </Tabs>
      </Box>

      <ThemeProvider theme={theme}>
        <Paper sx={{ width: "95%", overflow: "hidden", margin: "auto" }}>
          {showDataLoading ? (
            <CircularProgress
              style={{
                margin: "auto",
                display: "flex",
                height: "100%",
              }}
            />
          ) : (
            <TableContainer style={{ height: "100%" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  {selectedTab === 0 ? (
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Payment Id</TableCell>
                      <TableCell>Order Id</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Settlement Id</TableCell>
                      <TableCell>Settlement Amount</TableCell>
                      <TableCell>Total Amount</TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {ordersList?.length > 0 &&
                    ordersList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((row) => {
                        return (
                          <Fragment key={row.id}>
                            {selectedTab === 0 ? (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}
                                onClick={() => {
                                  if (selectedTab === 1) {
                                    setSelectedPaymentId(
                                      row?.settlement_public_id
                                    );
                                  } else {
                                    setSelectedPaymentId(row?.order_record_id);
                                  }
                                  setModalOpen(true);
                                }}
                              >
                                <TableCell>{row?.updated_at}</TableCell>
                                <TableCell>{row?.payment_public_id}</TableCell>
                                <TableCell>{row?.order_id}</TableCell>
                                <TableCell>{row?.settlement_amount}</TableCell>
                                <TableCell
                                  style={{
                                    fontWeight: 800,
                                    color:
                                      row?.settlement_status !== "NOT_SETTLED"
                                        ? "green"
                                        : "gray",
                                  }}
                                >
                                  {row?.settlement_status}
                                </TableCell>
                              </TableRow>
                            ) : (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}
                                onClick={() => {
                                  if (selectedTab === 1) {
                                    setSelectedPaymentId(
                                      row?.settlement_public_id
                                    );
                                  } else {
                                    setSelectedPaymentId(row?.order_record_id);
                                  }
                                  setModalOpen(true);
                                }}
                              >
                                <TableCell>{row?.updated_at}</TableCell>
                                <TableCell>
                                  {row?.settlement_public_id}
                                </TableCell>
                                <TableCell>{row?.settlement_amount}</TableCell>
                                <TableCell>{row?.total_amount}</TableCell>
                              </TableRow>
                            )}
                          </Fragment>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <TablePagination
            style={{ marginTop: "auto" }}
            rowsPerPageOptions={[25, 50, 100, 200]}
            component="div"
            count={ordersList?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default PaymentsComponent;
