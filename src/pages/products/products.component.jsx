import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  Divider,
  IconButton,
  InputAdornment,
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
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import {
  Add,
  Clear,
  Close,
  Done,
  Edit
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generalToastStyle } from "../../utils/toast.styles";
import AddBulkProduct from "./addBulkProduct.component";
import "./products.styles.scss";
import Variants from "./variants.component";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a36e29",
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});

const Products = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [products, setProducts] = useState();
  const [page, setPage] = useState(
    localStorage.getItem("page") ? localStorage.getItem("page") : 0
  );
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingId, setEditingId] = useState();
  const [editQuantity, setEditQuantity] = useState();
  const [openVariant, setOpenVariant] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [variantsOpen, setVariantsOpen] = useState(false);

  const getProductList = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/all.php?type=item`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.response);
        response.data.response.map((item, index) => {
          item.display_number = index;
          return item;
        })
        setProducts(response.data.response);
        setSearchResults(response.data.response);
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
    localStorage.setItem("page", newPage);
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/all.php`,
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
        getProductList();
      })
      .catch((err) => {
        toast(err.response.data.message, generalToastStyle);
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    localStorage.setItem("rowsPerPage", +event.target.value);
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

  const search = (query) => {
    if (query === "") {
      setSearchResults(products);
      return;
    }
    const results = products.filter(
      (product) =>
        product.tags.toLowerCase().includes(query.toLowerCase()) ||
        product.hash.toLowerCase().includes(query.toLowerCase()) ||
        product.customizations.variants.options[0].metal_info.gross_wt
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase())
    );
    setPage(0);
    setSearchResults(results);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="Products">
      <ToastContainer />
      <div className="head">
        <div className="head-txt">Products</div>
        <div>
          <TextField
            variant="outlined"
            placeholder="Search Products"
            onChange={(e) => search(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      search("");
                      document.getElementById("searchField").value = "";
                    }}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              marginRight: "2vw",
              width: "300px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            id="searchField"
          />
          <Button className="button" onClick={handleAddNewProduct}>
            Add New Product +
          </Button>
          <AddBulkProduct />
        </div>
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
            <TableContainer sx={{ maxHeight: "70vh" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Created On</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Tag</TableCell>
                    <TableCell>UID</TableCell>
                    <TableCell>Gross Weight</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Admin Verified</TableCell>
                    <TableCell>View in Store</TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell>Variants</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort(
                      (a, b) => new Date(a.created_at) - new Date(b.created_at)
                    )
                    .map((row, index) => {
                      return (
                        <>
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            <TableCell>
                              {row.display_number + 1}
                            </TableCell>
                            <TableCell>{row.created_at}</TableCell>
                            <TableCell className="name-content">
                              <img
                                className="company-img"
                                alt="org"
                                src={
                                  row.images
                                    ? `${process.env.REACT_APP_API_BASE_URL}/assets/${row.images[0]["file"]}`
                                    : process.env.PUBLIC_URL + "/assets/fav.png"
                                }
                              />
                              {row.name}
                            </TableCell>
                            <TableCell>
                              ₹{row.customizations.variants.options[0]?.price}
                            </TableCell>
                            <TableCell>{row.tags}</TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {row.hash}
                            </TableCell>
                            <TableCell>
                              {`${row.customizations.variants.options[0]?.metal_info.gross_wt} gm`}
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
                                          `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/inventory/inventory.php`,
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
                              <Edit
                                className="allow"
                                onClick={() =>
                                  navigate(
                                    `/products/edit?id=${row.id}&name=${row.name}&hash=${row.hash}`
                                  )
                                }
                                style={{ marginRight: "8px" }}
                              />
                              <Close
                                className="block"
                                onClick={() => openDeleteDialog(row.id)}
                              />
                              {/* <Add
                              className="allow"
                              onClick={() => setVariantsOpen(true)}
                            /> */}
                            </TableCell>
                            <TableCell>
                              <IconButton onClick={() => setOpenVariant((prev) => prev === row.id ? null : row.id)}>
                                {openVariant === row.id ? <ExpandLess /> : <ExpandMore />}
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          {openVariant === row.id && row.product_variants.map((variant, variantIndex) => (
                            <>
                              {row.product_variants.length > 0 && variantIndex === 0 && (<h2 style={{ paddingLeft: "2rem" }}>Variants</h2>)}
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={variant.id}
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                <TableCell style={{ paddingLeft: "2rem" }}>
                                  {variantIndex + 1}
                                </TableCell>
                                <TableCell>{variant.name}</TableCell>
                                <TableCell>{row.company.name}</TableCell>
                                <TableCell>₹{variant.price}</TableCell>
                                <TableCell>{variant.tag}</TableCell>
                                <TableCell>
                                  <strong>{variant?.master_product_details?.hash}</strong>
                                </TableCell>
                                <TableCell>
                                  {`${variant.metal_info?.gross_wt ?? 0} gm`}
                                </TableCell>
                                <TableCell>
                                  {editingId === `variant-${variant.id}` ? (
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
                                              `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/inventory/inventory.php`,
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
                                            setEditingId(`variant-${variant.id}`);
                                            setEditQuantity(variant?.master_product_details?.quantity);
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
                                        variant.admin_verified === "1"
                                          ? "#cffbcf"
                                          : "#ffcfcf",
                                      borderRadius: "5px",
                                      color:
                                        variant.admin_verified === "1"
                                          ? "#008000"
                                          : "#ff0000",
                                      height: "24px",
                                      width: "fit-content",
                                    }}
                                  >
                                    {variant.admin_verified === "1" ? "Yes" : "No"}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <a
                                    href={`https://sadashrijewelkart.com/item/${variant?.master_product_details?.category}/${variant?.master_product_details?.name}-${variant?.master_product_details?.hash}`}
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
                                {variant.admin_verified === "0" && <TableCell className="actions-content">
                                  {variant.admin_verified === "0" ? (
                                    <div>
                                      {
                                        <Done
                                          className="allow"
                                        // onClick={() => allowProductVariant(variant.id)}
                                        />
                                      }
                                      <Close
                                        className="block"
                                        onClick={() => {
                                          // setDeleteRowId(row.id);
                                          setDeleteDialogOpen(true);
                                          // blockProduct(variant.id);
                                        }}
                                      />
                                    </div>
                                  ) : variant.admin_verified === "1" ? (
                                    <Close
                                      className="block"
                                      onClick={() => {
                                        // setDeleteRowId(variant.id);
                                        // setVariantDeleteDialogOpen(true);
                                        // blockProduct(variant.id);
                                      }}
                                    />
                                  ) : variant.admin_verified === "2" ? (
                                    <div className="rejected">Blocked</div>
                                  ) : (
                                    <div>
                                      {(
                                        <Done
                                          className="allow"
                                        // onClick={() => allowProductVariant(variant.id)}
                                        />
                                      )}
                                      <Close
                                        className="block"
                                        onClick={() => {
                                          // setDeleteRowId(variant.id);
                                          // setVariantDeleteDialogOpen(true);
                                          // blockProduct(variant.id, true);
                                        }}
                                      />
                                    </div>
                                  )}
                                </TableCell>
                                }
                              </TableRow>
                            </>
                          ))}
                        </>

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
              fontFamily: '"Roboto", sans-serif',
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            Are you sure you want to disable this product? This action cannot be
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
                fontFamily: '"Roboto", sans-serif',
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
                fontFamily: '"Roboto", sans-serif',
                fontSize: "0.8rem",
              }}
              onClick={confirmDelete}
            >
              Disable
            </Button>
          </Box>
        </Box>
      </Modal>
      <Variants open={variantsOpen} onClose={() => setVariantsOpen(false)} />
    </div>
  );
};

export default Products;
