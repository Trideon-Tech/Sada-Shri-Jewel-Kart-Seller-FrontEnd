import React, { Fragment, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Divider,
  Paper,
  TableContainer,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  createTheme,
  ThemeProvider,
  CircularProgress,
  SwipeableDrawer,
  Button,
  IconButton,
  Box,
  Typography,
  Rating,
  ImageListItem,
  ImageList,
  Grid,
  Checkbox,
  Modal,
  Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "react-toastify/dist/ReactToastify.css";
import {
  Search,
  Edit,
  Delete,
  Add,
  AddAPhoto,
  Done,
  Restore,
  KeyboardArrowDown,
  KeyboardArrowUp,
  CheckBox,
} from "@mui/icons-material";
import axios from "axios";
import Tab, { tabClasses } from "@mui/joy/Tab";
import "./orders.styles.scss";

import InputTextField from "../input-text-field/input-text-field.component";
import { generalToastStyle } from "../../utils/toast.styles";
import MetricBoxComponent from "./metricBox.component";
import { useNavigate } from "react-router-dom";
import { TabList, Tabs } from "@mui/joy";
import { borderRadius } from "@mui/system";
import SettlementModal from "./settlementModel.component";
import PaymentModal from "./paymentModel.component";
import PaymentSettlementModal from "./paymentSettlement.component";

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

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const mockOrders = [
  {
    id: "SS10922",
    customerName: "Sushovan Paul",
    orderDate: "2024-03-12 at 04:18",
    itemName: "Margaret Gold Ring, 16mm",
    price: "Rs: 16,777",
    orderStatus: "Unfulfilled",
  },
  {
    id: "KS10922",
    customerName: "Paul Sushovan",
    orderDate: "2024-03-12 at 04:18",
    itemName: "Margaret Gold Ring, 16mm",
    price: "Rs: 26,777",
    orderStatus: "Fulfilled",
  },
];

const PaymentsComponent = ({ row }) => {
  const [ordersList, setOrdersList] = useState([]);
  const [orderStats, setOrderStats] = useState({});
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState({});

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

      // console.log("sdsd", data.response);
      setShowDataLoading(false);
      setOrdersList(data?.response?.payment_list);

      setPaymentList(data?.response?.payment_list);

      setSettlementList(settlementList?.response?.settlement_list);

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

      <div className="secondary-div">
        <div className="secondary-content"></div>
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
        <PaymentSettlementModal
          modalOpen={openSettlementModal}
          setModalOpen={setOpenSettlementModal}
          orderList={ordersList}
        />
      </div>
      {/* <Grid
        container
        spacing={5}
        style={{
          width: "100%",
          height: "300px",
          paddingLeft: "40px",
          marginBottom: "25px",
        }}
      >
        <Grid item xs={12 / 5}>
          <MetricBoxComponent
            heading={"Total Orders"}
            metric={orderStats.total_orders}
          />
        </Grid>
        <Grid item xs={12 / 5}>
          <MetricBoxComponent
            heading={"Total Sales"}
            metric={`${
              Math.round(Number(orderStats.total_price) / 10000) / 100
            }M`}
          />
        </Grid>
        <Grid item xs={12 / 5}>
          <MetricBoxComponent heading={"Orders In Progress"} metric={"4"} />
        </Grid>
        <Grid item xs={12 / 5}>
          <MetricBoxComponent
            heading={"Orders Completed"}
            metric={orderStats.completed_orders}
          />
        </Grid>
        <Grid item xs={12 / 5}>
          <MetricBoxComponent
            heading={"Orders Refunded"}
            metric={orderStats.refunded_orders}
          />
        </Grid>
      </Grid> */}

      <Box
        sx={{
          width: "95%",
          marginLeft: "40px",
          marginRight: "auto",
          marginTop: "50px",
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
              setOrdersList(paymentList);
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
                  selectedTab === 0 ? "2px solid brown" : "2px solid #BEBEBE",
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
                  selectedTab === 1 ? "2px solid brown" : "2px solid #BEBEBE",
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
                  selectedTab === 2 ? "2px solid brown" : "2px solid #BEBEBE",
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
        {/* <Button
          style={{
            width: "max-content",
            paddingLeft: "60px",
            paddingRight: "60px",
            fontWeight: 600,
            height: "60px",
            backgroundColor: "#a36e29",
            color: "white",
          }}
          onClick={() => setOpenSettlementModal(true)}
        >
          {" "}
          Settle Payment
        </Button> */}
      </Box>

      <ThemeProvider theme={theme}>
        <Paper
          className="table-paper"
          sx={{ width: "95%", overflow: "hidden", height: 1000 }}
        >
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
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Order Id</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Order Item</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
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
                              <TableCell>
                                <Checkbox />
                              </TableCell>
                              <TableCell>{row?.order_id}</TableCell>
                              <TableCell>{row?.user}</TableCell>
                              <TableCell>{row?.updated_at}</TableCell>
                              <TableCell>
                                {row?.productsArray?.length > 0
                                  ? row?.productsArray[0]
                                  : null}
                              </TableCell>
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
                                ⬤ {row?.settlement_status}
                              </TableCell>
                            </TableRow>
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

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
];

export default PaymentsComponent;
