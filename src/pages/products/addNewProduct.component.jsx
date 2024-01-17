import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Paper,
  InputLabel,
  InputAdornment,
  IconButton,
  Grid,
  Chip,
  Input,
  Typography,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  ThemeProvider,
  CircularProgress,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import DeleteIcon from "@mui/icons-material/Delete";
import "./addNewProduct.styles.scss";
import { ToastContainer } from "react-toastify";
import InputTextField from "../../components/input-text-field/input-text-field.component";
import { useNavigate } from "react-router-dom";
import { fontWeight } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a36e29",
    },
  },
});

const AddNewProduct = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  const productId = 1;

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [productName, setProductName] = useState();
  const [desc, setDesc] = useState();
  const [weight, setWeight] = useState();
  const [price, setPrice] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [purity, setPurity] = useState();
  const [open, setOpen] = useState(false); //for modal
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  //const [secondFieldOptions, setSecondFieldOptions] = useState([]);
  const [customizationTypes, setCustomizationTypes] = useState([]);
  const [selectedCustomizationTypeId, setSelectedCustomizationTypeId] =
    useState("");
  const [customizationOptions, setCustomizationOptions] = useState([]);
  const [customizationPrice, setCustomizationPrice] = useState([]);
  const [madeOnOrder, setMadeOnOrder] = useState(
    Array(selectedOptions.length).fill(false)
  );
  // const [customizationTable, setCustomizationTable] = useState([]);

  const handleSaveCustomizations = () => {
    const customizationDetailsArray = selectedOptions.map((option, index) => ({
      customizationOption: `${option.type}:${option.option}`,
      price: customizationPrice[index] || 100,
      madeOnOrder: madeOnOrder[index] || false,
    }));

    console.log("Customization Details Array:", customizationDetailsArray);
    const apiPayload = {
      product: productId,
      customizations: customizationDetailsArray,
    };

    axios
      .post(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/customization/add.php",
        apiPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      )
      .then((response) => {
        console.log("API response:", response.data);
        
      })
      .catch((error) => {
        console.error("Error saving customizations:", error);
      });
  };

  useEffect(() => {
    // Fetch customization types from the API
    axios
      .get(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/customization/field/all.php",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setCustomizationTypes(response.data.response); // Assuming the API response is an array of objects with id and name properties
      })
      .catch((error) => {
        console.error("Error fetching customization types:", error);
      });
  }, []);

  const handleFirstFieldUpdate = (event) => {
    const selectedTypeId = event.target.value;
    setSelectedCustomizationTypeId(selectedTypeId);

    // Fetch customization options based on the selected type
    axios
      .get(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/product/customization/option/all.php?customization_field=${selectedTypeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setCustomizationOptions(response.data.response); // Assuming the API response is an array of customization options
      })
      .catch((error) => {
        console.error("Error fetching customization options:", error);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSecondFieldChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOptions((prevSelectedOptions) => [
      ...prevSelectedOptions,
      { type: selectedCustomizationTypeId, option: selectedOption },
    ]);
  };

  const handleChipDelete = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.splice(index, 1);
    setSelectedOptions(newSelectedOptions);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleDeleteVideo = () => {
    setVideo(null);
  };

  const handleSave = () => {
    // Perform API call to save images and video
    console.log("Images:", images);
    console.log("Video:", video);
  };

  const handleCancel = () => {
    navigate("/home/products");
  };

  const handleSubmit = () => {
    console.log(token);
    const initialFormData = new FormData();
    initialFormData.append("type", "item");
    initialFormData.append("name", productName);
    initialFormData.append("description", desc);
    initialFormData.append("weight", weight);
    initialFormData.append("price", price);
    initialFormData.append("height", height);
    initialFormData.append("width", width);
    initialFormData.append("purity", purity);

    axios
      .post(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/add.php",
        initialFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        productId = response.data.response.id;

        const promises = [];

        images.forEach((image, index) => {
          const formData = new FormData();
          formData.append("type", "infographics");
          formData.append("product", productId);
          formData.append("is_primary", index === 0 ? true : false);
          formData.append("file_type", "img");
          formData.append("file", image);
          console.log(formData);
          promises.push(
            axios.post(
              "https://api.sadashrijewelkart.com/v1.0.0/seller/product/add.php",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          );
        });

        if (video) {
          const videoFormData = new FormData();
          videoFormData.append("type", "infographics");
          videoFormData.append("product", productId);
          videoFormData.append("is_primary", false);
          videoFormData.append("file_type", "vid");
          videoFormData.append("file", video);

          promises.push(
            axios.post(
              "https://api.sadashrijewelkart.com/v1.0.0/seller/product/add.php",
              videoFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          );
        }

        Promise.all(promises)
          .then((responses) => {
            console.log(
              "All images and videos uploaded successfully:",
              responses
            );
          })
          .catch((error) => {
            console.error("Error uploading images and videos:", error);
          });
      })
      .catch((error) => {
        console.error("Error saving initial product details:", error);
      });
  };

  return (
    <div className="AddNewProduct">
      <ToastContainer />
      <div className="head">
        <div className="head-txt">Add New Product</div>
        <div className="btns">
          <Button className="button1" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="button2" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
      <Divider />
      <ThemeProvider theme={theme}>
        <div className="inputFilePreviewContainer">
          <Paper className="inputFieldsContainer">
            <Grid container spacing={2}>
              {/* Image Input */}
              <Grid item xs={6}>
                <div className="imageInputContainer">
                  <label>Select Images for the Product</label>
                  <Divider />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    id="imageInput"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="imageInput">
                    <Button
                      variant="contained"
                      className="selectButton"
                      component="span"
                    >
                      Select Images <PhotoCameraIcon />
                    </Button>
                  </label>
                  <div className="previewContainer">
                    {images.map((image, index) => (
                      <div key={index} className="imagePreview">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                        />
                        <IconButton
                          className="deleteButton"
                          onClick={() => handleDeleteImage(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </div>
              </Grid>

              {/* Video Input */}
              <Grid item xs={6}>
                <div className="videoInputContainer">
                  <label className="heading">Select a Product Video</label>
                  <Divider />
                  <input
                    type="file"
                    accept="video/*"
                    id="videoInput"
                    onChange={handleVideoChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="videoInput">
                    <Button
                      variant="contained"
                      className="selectButton"
                      component="span"
                    >
                      Select Video <VideoCameraFrontIcon />
                    </Button>
                  </label>
                  {video && (
                    <div className="previewContainer">
                      <video controls>
                        <source
                          src={URL.createObjectURL(video)}
                          type="video/mp4"
                        />
                      </video>
                      <IconButton
                        className="deleteButton"
                        onClick={handleDeleteVideo}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className="saveButton"
            >
              Save
            </Button>
          </Paper>
        </div>
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <Paper elevation={3} className="detail-paper">
          <div className="heading">Product Details</div>
          <Divider />
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <InputTextField
                title={"Product Name"}
                value={productName}
                onEdit={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextField
                title={"Product Price"}
                value={price}
                onEdit={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextField
                title={"Product Weight"}
                value={weight}
                onEdit={(e) => setWeight(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextField
                title={"Product Height"}
                value={height}
                onEdit={(e) => setHeight(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextField
                title={"Product Width"}
                value={width}
                onEdit={(e) => setWidth(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextField
                title={"Product Purity"}
                value={purity}
                onEdit={(e) => setPurity(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} className="quill-container">
              <div className="label">Product Description</div>
              <ReactQuill
                theme="snow"
                placeholder="Product Description"
                value={desc}
                onChange={(value) => {
                  setDesc(value);
                  console.log(value);
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <Paper className="customization-paper">
          <div className="heading">Product Customization</div>
          <Divider />
          <div className="customization-text">
            Does your product come in different options, like size, purity or
            material? <br />
            Add them here.
          </div>
          <Button className="button" onClick={handleOpen}>
            Add New Customization +
          </Button>
          <div>
            {selectedOptions.map((option, index) => (
              <Chip
                key={index}
                label={`${selectedOption.option}: ${option.option}`}
                onDelete={() => handleChipDelete(index)}
                style={{ marginRight: "5px" }}
              />
            ))}
          </div>
          {selectedOptions === null ? (
            <></>
          ) : (
            <div className="customization-options-table">
              <div className="heading">Customization Options Table</div>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead sx={{ fontWeight: "bold" }}>
                    <TableRow>
                      <TableCell>Index</TableCell>
                      <TableCell>Customization Option</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Made On Order</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOptions.map((option, index) => (
                      <TableRow hover key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{`${option.type}: ${option.option}`}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={customizationPrice[index] || ""}
                            onChange={(e) => {
                              let x = [...customizationPrice];
                              x[index] = e.target.value;
                              setCustomizationPrice(x);
                            }}
                            startAdornment={
                              <InputAdornment position="start">
                                ₹
                              </InputAdornment>
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={madeOnOrder[index]}
                            onChange={(e) => {
                              let x = [...madeOnOrder];
                              x[index] = e.target.checked;
                              setMadeOnOrder(x);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                onClick={handleSaveCustomizations}
                className="saveButton"
              >
                Save Customizations
              </Button>
            </div>
          )}

          <Dialog
            open={open}
            onClose={handleClose}
            sx={{
              "& .MuiDialogTitle-root": {
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: "10px",
              },
              "& .MuiDialogContent-root": {
                fontSize: "1.2rem",
                fontWeight: 400,
                marginBottom: "10px",
              },
            }}
          >
            <DialogTitle>Add Customization</DialogTitle>
            <Divider />
            <DialogContent
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* Your modal content goes here */}
              <p sx={{ marginBottom: "10px" }}>
                You'll be able to manage pricing and inventory for this product
                customization later on.
              </p>
              <TextField
                select
                label="Customization Type"
                value={selectedCustomizationTypeId}
                onChange={handleFirstFieldUpdate}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "20px", marginTop: "10px" }}
              >
                {customizationTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Customization Options"
                select
                variant="outlined"
                fullWidth
                value=""
                onChange={handleSecondFieldChange}
              >
                {customizationOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <div>
                {selectedOptions.map((option, index) => (
                  <Chip
                    key={index}
                    label={`${option.type}: ${option.option}`}
                    onDelete={() => handleChipDelete(index)}
                    style={{ marginRight: "5px" }}
                  />
                ))}
              </div>
            </DialogContent>
            <DialogActions sx={{ marginBottom: "10px", marginRight: "10px" }}>
              <Button
                variant="contained"
                onClick={handleClose}
                className="closeButton"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default AddNewProduct;
