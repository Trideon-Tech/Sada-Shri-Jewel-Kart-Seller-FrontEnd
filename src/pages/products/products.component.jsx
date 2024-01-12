import React, { useState } from "react";
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
  SwipeableDrawer,
  InputAdornment,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";

import "./products.styles.scss";
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
  const [products, setProducts] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleAddNewProduct = () => {
    navigate("/home/addNewProduct");
  };

  return (
    <div className="Products">
      <div className="head">
        <div className="head-txt">
          Products <strong>24</strong>
        </div>

        <Button className="button" onClick={handleAddNewProduct}>
          Add New Product +
        </Button>
      </div>
      <Divider />
      <ThemeProvider theme={theme}>
        <Paper className="table-paper">
          {products === null ? (
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
                  {/* {products
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell>1</TableCell>
                          <TableCell className="name-content" onClick={null}>
                            <img
                              className="company-img"
                              alt="org"
                              src={`https://api.sadashrijewelkart.com/assets/${row.image}`}
                            />
                            {row.name}
                          </TableCell>

                          <TableCell>{row.created_at}</TableCell>
                          <TableCell className="actions-content">
                            <Edit className="allow" onClick={null} />
                            <Delete className="delete" onClick={null} />
                          </TableCell>
                        </TableRow>
                      );
                    })} */}
                </TableBody>
              </Table>
              {/* <TablePagination
                rowsPerPageOptions={[25, 50, 100, 200]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={null}
                onRowsPerPageChange={null}
              /> */}
            </TableContainer>
          )}
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default Products;
