import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  Divider,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { Close, Done, Edit } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generalToastStyle } from "../../utils/toast.styles";
import "./products.styles.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a36e29",
    },
  },
  typography: {
    fontFamily: '"Work Sans", sans-serif',
  },
});

const Products = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [products, setProducts] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingId, setEditingId] = useState();
  const [editQuantity, setEditQuantity] = useState();

  const getProductList = () => {
    axios
      .get(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/all.php?type=item",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.response);
        setProductsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        // toast.warn(error.response.data.message, generalToastStyle);
        setProductsLoaded(true);
      });
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/all.php",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          data: {
            product_id: productId,
          },
        }
      )
      .then((_) => {
        toast("Product deleted successfully!", generalToastStyle);
        navigate(0);
      })
      .catch((err) => {
        toast(err.response.data.message, generalToastStyle);
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddNewProduct = () => {
    navigate("/products/add");
  };

  const openDeleteDialog = (productId) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = () => {
    handleDeleteProduct(productToDelete);
    handleCloseDeleteDialog();
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="Products">
      <ToastContainer />
      <div className="head">
        <div className="head-txt">Products</div>

        <Button className="button" onClick={handleAddNewProduct}>
          Add New Product +
        </Button>
      </div>
      <Divider />
      <ThemeProvider theme={theme}>
        <Paper
          className="table-paper"
          sx={{ width: "95%", overflow: "hidden" }}
        >
          {productsLoaded === false ? (
            <CircularProgress
              style={{
                margin: "auto",
                display: "flex",
                height: "100%",
              }}
            />
          ) : products && products.length > 0 ? (
            <TableContainer sx={{ maxHeight: 850 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Created On</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Admin Verified</TableCell>
                    <TableCell>View in Store</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell>{row.created_at}</TableCell>
                          <TableCell className="name-content">
                            <img
                              className="company-img"
                              alt="org"
                              src={
                                row.images
                                  ? `https://api.sadashrijewelkart.com/assets/${row.images[0]["file"]}`
                                  : process.env.PUBLIC_URL + "/assets/fav.png"
                              }
                            />
                            {row.name}
                          </TableCell>
                          <TableCell>
                            ₹{row.customizations.variants.options[0]?.price}
                          </TableCell>
                          <TableCell style={{ position: "relative" }}>
                            {editingId === row.id ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <TextField
                                  value={editQuantity}
                                  onChange={(e) =>
                                    setEditQuantity(e.target.value)
                                  }
                                  size="small"
                                  type="number"
                                  inputProps={{ min: 0 }}
                                  style={{ width: "100px" }}
                                />
                                <Done
                                  sx={{
                                    color: "green",
                                    cursor: "pointer",
                                  }}
                                  onClick={async () => {
                                    try {
                                      await axios.put(
                                        "https://api.sadashrijewelkart.com/v1.0.0/seller/inventory/inventory.php",
                                        JSON.stringify({
                                          product_id: row.id,
                                          quantity: editQuantity,
                                        }),
                                        {
                                          headers: {
                                            Authorization: `Bearer ${localStorage.getItem(
                                              "token"
                                            )}`,
                                            "Content-Type": "application/json",
                                          },
                                        }
                                      );
                                      row.quantity = editQuantity;
                                      setEditingId(null);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                />
                                <Close
                                  sx={{
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setEditingId(null)}
                                />
                              </div>
                            ) : (
                              <>
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {row.quantity} pieces
                                  <Edit
                                    sx={{
                                      marginLeft: "10px",
                                      opacity: 0,
                                      transition: "opacity 0.2s",
                                      ".MuiTableRow-hover &": {
                                        opacity: 1,
                                      },
                                      cursor: "pointer",
                                      color: "grey",
                                    }}
                                    onClick={() => {
                                      setEditingId(row.id);
                                      setEditQuantity(row.quantity);
                                    }}
                                  />
                                </span>
                              </>
                            )}
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "5px 15px",
                                backgroundColor:
                                  row.admin_verified === "1"
                                    ? "#cffbcf"
                                    : "#ffcfcf",
                                borderRadius: "5px",
                                color:
                                  row.admin_verified === "1"
                                    ? "#008000"
                                    : "#ff0000",
                                height: "24px",
                                width: "fit-content",
                              }}
                            >
                              {row.admin_verified === "1" ? "Yes" : "No"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <a
                              href={`https://sadashrijewelkart.com/item/${row.category}/${row.name}-${row.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#a36e29",
                                textDecoration: "none",
                              }}
                            >
                              View
                            </a>
                          </TableCell>

                          <TableCell className="actions-content">
                            <Close
                              className="block"
                              onClick={() => openDeleteDialog(row.id)}
                            />
                          </TableCell>
                        </TableRow>
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
                No Products Added
              </Typography>
            </Paper>
          )}
          <TablePagination
            sx={{ position: "sticky", zIndex: 2 }}
            rowsPerPageOptions={[25, 50, 100, 200]}
            component="div"
            count={products?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </ThemeProvider>

      <Modal open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            width: 400,
            backgroundColor: "white",
            p: 4,
          }}
        >
          <Typography
            style={{
              fontWeight: 700,
              marginBottom: "20px",
              fontFamily: '"Open Sans", sans-serif',
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this product? This action cannot be
            undone.
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <Button
              variant="outlined"
              style={{
                width: "48%",
                fontWeight: "bold",
                border: "2px solid #a36e29",
                color: "#a36e29",
                fontFamily: '"Open Sans", sans-serif',
                fontSize: "0.8rem",
              }}
              onClick={handleCloseDeleteDialog}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{
                width: "48%",
                fontWeight: "bold",
                background: "#a36e29",
                fontFamily: '"Open Sans", sans-serif',
                fontSize: "0.8rem",
              }}
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Products;
