import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Divider,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
import { generalToastStyle } from "../../utils/toast.styles";
import "./products.styles.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const getCategories = () => {
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
        toast.warn(error.response.data.message, generalToastStyle);
      });
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
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
    navigate("/home/addNewProduct");
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="Products">
      <ToastContainer />
      <div className="head">
        <div className="head-txt">
          Products <strong>12</strong>
        </div>

        <Button className="button" onClick={handleAddNewProduct}>
          Add New Product +
        </Button>
      </div>
      <Divider />
      <ThemeProvider theme={theme}>
        <Paper className="table-paper">
          {productsLoaded === false ? (
            <CircularProgress
              style={{
                margin: "auto",
                display: "flex",
                height: "100%",
              }}
            />
          ) : (
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Price</TableCell>
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
                          <TableCell className="actions-content">
                            <Edit className="allow" onClick={null} />
                            <Delete className="delete" onClick={null} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100, 200]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default Products;
