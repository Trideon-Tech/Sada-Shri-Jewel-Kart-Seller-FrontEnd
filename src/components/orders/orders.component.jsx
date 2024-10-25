import {
  CircularProgress,
  createTheme,
  Divider,
  Grid,
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
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./orders.styles.scss";

import { useNavigate } from "react-router-dom";
import MetricBoxComponent from "./metricBox.component";
import PaymentModal from "./paymentModel.component";

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

const OrdersComponent = ({ row }) => {
  const [ordersList, setOrdersList] = useState([]);
  const [orderStats, setOrderStats] = useState({});

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/orders/all.php?type=seller_orders&seller_id=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setOrderStats(data?.response?.dashboard_details);
      if (data?.response?.order_list !== null) {
        setOrdersList(
          data?.response?.order_list.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at); // Sort in descending order by updated_at
          })
        );
      }

      setShowLoading(false);
    })();
  }, []);

  const navigate = useNavigate();

  const [showLoading, setShowLoading] = useState(true);

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
        <div className="head-txt">Orders</div>
      </div>

      <div>
        <PaymentModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </div>
      <Grid
        container
        spacing={3}
        style={{
          width: "100%",
          height: "300px",
          paddingLeft: "25px",
          marginBottom: "25px",
        }}
      >
        <Grid item xs={12 / 5}>
          <MetricBoxComponent
            heading={"Total Orders"}
            metric={orderStats?.total_orders}
          />
        </Grid>
        <Grid item xs={12 / 5}>
          <MetricBoxComponent
            heading={"Total Sales"}
            metric={`${
              Math.round(Number(orderStats?.total_price) / 100) / 10
            }K`}
          />
        </Grid>
        <Grid item xs={12 / 5}>
          <MetricBoxComponent heading={"Orders In Progress"} metric={"0"} />
        </Grid>
        <Grid item xs={12 / 5}>
          <MetricBoxComponent
            heading={"Orders Completed"}
            metric={orderStats?.completed_orders}
          />
        </Grid>
        <Grid item xs={12 / 5}>
          <MetricBoxComponent
            heading={"Orders Refunded"}
            metric={orderStats?.refunded_orders}
          />
        </Grid>
      </Grid>
      <Divider />

      <ThemeProvider theme={theme}>
        <Paper
          className="table-paper"
          sx={{ width: "95%", overflow: "hidden", height: 950 }}
        >
          {showLoading ? (
            <CircularProgress
              style={{
                margin: "auto",
                display: "flex",
                height: "100%",
              }}
            />
          ) : ordersList && ordersList?.length > 0 ? (
            <TableContainer style={{ height: "90%" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order Id</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Order</TableCell>
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
                              onClick={() =>
                                navigate(`/order-detail/${row.order_record_id}`)
                              }
                            >
                              <TableCell>
                                {row?.order_detail_items[0]["public_id"]}
                              </TableCell>
                              <TableCell>{row?.user_name}</TableCell>
                              <TableCell>{row?.created_at}</TableCell>
                              <TableCell>
                                {row?.order_detail_items.length} Product(s)
                              </TableCell>
                              <TableCell>₹ {row?.order_price}</TableCell>
                              <TableCell
                                style={{
                                  fontWeight: 800,
                                  color:
                                    row?.shipment_status !== "ORDER_CREATED"
                                      ? "green"
                                      : "gray",
                                }}
                              >
                                ⬤ {row?.shipment_status}
                              </TableCell>
                            </TableRow>
                          </Fragment>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Paper
              style={{
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "none",
              }}
            >
              <img
                src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/animasi-emptystate.gif"
                alt="No products added"
                style={{ width: "150px", marginBottom: "16px" }}
              />
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                No Orders Yet
              </Typography>
            </Paper>
          )}
          <TablePagination
            sx={{ position: "sticky", zIndex: 2 }}
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

export default OrdersComponent;
