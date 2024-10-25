import {
  Button,
  CircularProgress,
  createTheme,
  Divider,
  Paper,
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
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { Delete, Edit } from "@mui/icons-material";
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

  const rowClicked = (row) => {
    //setCategoryClicked(products.indexOf(row));
    // setShowDrawer(true);
  };

  const handleAddNewProduct = () => {
    navigate("/products/add");
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
                    <TableCell>Name</TableCell>
                    <TableCell>Total Variants</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Created On</TableCell>
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
                          <TableCell
                            className="name-content"
                            onClick={() => rowClicked(row)}
                          >
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
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.price}</TableCell>
                          <TableCell>{row.created_at}</TableCell>
                          <TableCell className="actions-content">
                            <Edit
                              className="allow"
                              onClick={() =>
                                navigate(
                                  `/products/edit/${row.hash}/${row.name}`
                                )
                              }
                            />
                            <Delete
                              className="delete"
                              onClick={() => {
                                handleDeleteProduct(row.id);
                              }}
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
    </div>
  );
};

export default Products;
