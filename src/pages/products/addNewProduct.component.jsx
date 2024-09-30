import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Paper,
  InputAdornment,
  IconButton,
  Grid,
  Chip,
  Input,
  FormControl,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  ThemeProvider,
  Select,
  InputLabel,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
// import Select from "@mui/joy/Select";
// import Option from "@mui/joy/Option";
// import { Box, Chip } from "@mui/joy";

import {
  Add,
  PhotoCamera,
  VideoCameraFront,
  Delete,
} from "@mui/icons-material";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { generalToastStyle } from "../../utils/toast.styles";
import "./addNewProduct.styles.scss";

import InputTextField from "../../components/input-text-field/input-text-field.component";
import MaterialSelector from "./materialSelector.component";

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

const AddNewProduct = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  var productId = 1;

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [productName, setProductName] = useState();
  const [desc, setDesc] = useState();
  const [weight, setWeight] = useState();
  const [price, setPrice] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [purity, setPurity] = useState();
  const [newCustomizationType, setNewCustomizationType] = useState();
  const [newCustomizationOption, setNewCustomizationOption] = useState();
  const [openCustomizationInputDialog, setOpenCustomizationInputDialog] =
    useState(false);
  const [
    openAddNewCustomizationTypeInputDialog,
    setOpenAddNewCustomizationTypeInputDialog,
  ] = useState(false);
  const [
    openAddNewCustomizationOptionInputDialog,
    setOpenAddNewCustomizationOptionInputDialog,
  ] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customizationTypes, setCustomizationTypes] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCustomizationTypeId, setSelectedCustomizationTypeId] =
    useState("");
  const [selectedCustomizationTypeName, setSelectedCustomizationTypeName] =
    useState("");
  const [customizationOptions, setCustomizationOptions] = useState([]);
  const [showCustomizationTable, setShowCustomizationTable] = useState(false);
  const [selectedCustomizationNames, setSelectedCustomizationNames] = useState(
    {}
  );
  const [selectedCustomizations, setSelectedCustomizations] = useState([]);

  const [availableCustomizations, setAvailableCustomizations] = useState([]);

  const [combinationsValues, setCombinationValues] = React.useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/customization/all.php?type=product_add_template",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const categories = response.data.response || [];
        // setCategoriesData(categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/all.php?type=category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const categories = response.data.response || [];
        setCategoriesData(categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    getAllCustomizationFields();

    if (selectedCustomizationTypeId !== null) {
      setSelectedCustomizationTypeName(
        customizationTypes.find((i) => i.id === selectedCustomizationTypeId)
          ?.name
      );

      getAllCustomizationOptionsPerField();
    }
  }, [selectedCustomizationTypeId]);

  const getAllCustomizationFields = () => {
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
        setCustomizationTypes(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching customization types:", error);
      });
  };

  const getAllCustomizationOptionsPerField = () => {
    if (selectedCustomizationTypeId > 0)
      axios
        .get(
          `https://api.sadashrijewelkart.com/v1.0.0/seller/product/customization/option/all.php?customization_field=${selectedCustomizationTypeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setCustomizationOptions(response.data.response);
        })
        .catch((error) => {
          console.error("Error fetching customization options:", error);
        });
  };

  const handleCustomizationTypeSelection = (event) => {
    let selectedTypeId = event.target.value;

    if (selectedTypeId !== -1) {
      setSelectedCustomizationTypeId(selectedTypeId);
    } else {
      setOpenAddNewCustomizationTypeInputDialog(true);
    }
  };

  const handleAddNewCustomizationType = () => {
    const formData = new FormData();
    formData.append("name", newCustomizationType);

    axios
      .post(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/customization/field/add.php",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => {
        setOpenAddNewCustomizationTypeInputDialog(false);
        getAllCustomizationFields();
      })
      .catch((error) => {
        console.error("Error saving initial product details:", error);
      });
  };

  const handleAddNewCustomizationOption = () => {
    const formData = new FormData();
    formData.append("customization_field", selectedCustomizationTypeId);
    formData.append("name", newCustomizationOption);

    axios
      .post(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/customization/option/add.php",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => {
        setOpenAddNewCustomizationOptionInputDialog(false);
        getAllCustomizationOptionsPerField();
      })
      .catch((error) => {
        console.error("Error saving initial product details:", error);
      });
  };

  const handleCustomizationOptionChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption !== -1) {
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        {
          type: selectedCustomizationTypeId,
          option: selectedOption,
          type_name: selectedCustomizationTypeName,
          option_name: customizationOptions.find(
            (i) => i.id === selectedOption
          )["name"],
        },
      ]);
    } else {
      // Add new customization option here
      setOpenAddNewCustomizationOptionInputDialog(true);
    }
  };

  const loadCustomizationTable = () => {
    // creating combinations
    const typeIds = Array.from(
      new Set(selectedOptions.map((item) => item.type))
    );
    const typeNames = {};
    selectedOptions.forEach((item) => {
      typeNames[item.type] = item.type_name;
    });

    const types = {};
    typeIds.forEach((typeId) => {
      types[typeId] = selectedOptions.filter((item) => item.type === typeId);
    });

    const combinations = [];

    function generateCombinations(currentCombination, remainingTypeIds) {
      if (remainingTypeIds.length === 0) {
        const combinationObject = {};
        currentCombination.forEach((option, index) => {
          const currentTypeId = typeIds[index];
          combinationObject[currentTypeId.toLowerCase()] = option;
        });
        combinations.push(combinationObject);
        return;
      }

      const currentTypeId = remainingTypeIds[0];
      const currentTypeOptions = types[currentTypeId];

      for (const option of currentTypeOptions) {
        const nextCombination = [...currentCombination, option.option_name];
        const nextRemainingTypeIds = remainingTypeIds.slice(1);
        generateCombinations(nextCombination, nextRemainingTypeIds);
      }
    }

    generateCombinations([], typeIds);

    const customizationsList = [];

    for (let i = 0; i < combinations.length; i++) {
      const customizationIds = [];

      for (const typeId in typeNames) {
        const optionName = combinations[i][typeId];
        const optionId = selectedOptions.find(
          (i) => i.option_name === optionName
        )["option"];

        customizationIds.push(optionId);
      }

      const customizationIdsString = customizationIds.join(",");

      customizationsList.push({
        customization: combinations[i],
        customization_ids: customizationIdsString,
        price,
        madeOnOrder: true,
      });
    }

    console.log(customizationsList);

    setSelectedCustomizationNames(typeNames);
    setSelectedCustomizations(customizationsList);

    setShowCustomizationTable(true);
    setOpenCustomizationInputDialog(false);
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

  const handleProductSave = async () => {
    if (productName === "" || typeof productName === "undefined") {
      toast.warn("Product Name is required!", generalToastStyle);
    } else if (desc === "" || typeof desc === "undefined") {
      toast.warn("Description is required!", generalToastStyle);
    } else if (weight === "" || typeof weight === "undefined") {
      toast.warn("Weight is required!", generalToastStyle);
    } else if (price === "" || typeof price === "undefined") {
      toast.warn("Price is required!", generalToastStyle);
    } else if (height === "" || typeof height === "undefined") {
      toast.warn("Height is required!", generalToastStyle);
    } else if (width === "" || typeof width === "undefined") {
      toast.warn("Width is required!", generalToastStyle);
    } else if (purity === "" || typeof purity === "undefined") {
      toast.warn("Purity is required!", generalToastStyle);
    } else {
      axios
        .post(
          "https://api.sadashrijewelkart.com/v1.0.0/seller/product/addProduct.php",
          {
            type: "item",
            name: productName,
            description: desc,
            category: selectedCategory,
            sub_category: selectedSubcategory,
            price: price,
            weight: weight,
            height: height,
            width: width,
            purity: purity,
            customization: combinationsValues,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
            );
          }

          Promise.all(promises)
            .then((responses) => {
              console.log(
                "All Details, images and videos uploaded successfully:",
                responses
              );
              navigate("/products");
            })
            .catch((error) => {
              console.error("Error uploading images and videos:", error);
            });
        })
        .catch((error) => {
          console.error("Error saving initial product details:", error);
        });
    }
  };

  const handleSubmit = () => {
    if (!selectedCustomizations || selectedCustomizations.length === 0) {
      if (productName === "" || typeof productName === "undefined") {
        toast.warn("Product Name is required!", generalToastStyle);
      } else if (desc === "" || typeof desc === "undefined") {
        toast.warn("Description is required!", generalToastStyle);
      } else if (weight === "" || typeof weight === "undefined") {
        toast.warn("Weight is required!", generalToastStyle);
      } else if (price === "" || typeof price === "undefined") {
        toast.warn("Price is required!", generalToastStyle);
      } else if (height === "" || typeof height === "undefined") {
        toast.warn("Height is required!", generalToastStyle);
      } else if (width === "" || typeof width === "undefined") {
        toast.warn("Width is required!", generalToastStyle);
      } else if (purity === "" || typeof purity === "undefined") {
        toast.warn("Purity is required!", generalToastStyle);
      } else if (images === "" || typeof images === "undefined") {
        toast.warn("Images are required!", generalToastStyle);
      } else {
        const initialFormData = new FormData();
        initialFormData.append("type", "item");
        initialFormData.append("name", productName);
        initialFormData.append("description", desc);
        initialFormData.append("weight", weight);
        initialFormData.append("price", price);
        initialFormData.append("height", height);
        initialFormData.append("width", width);
        initialFormData.append("purity", purity);
        initialFormData.append("category", selectedCategory);
        initialFormData.append("sub_category", selectedSubcategory);

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
                  "All Details, images and videos uploaded successfully:",
                  responses
                );
                navigate("/home/products");
              })
              .catch((error) => {
                console.error("Error uploading images and videos:", error);
              });
          })
          .catch((error) => {
            console.error("Error saving initial product details:", error);
          });
      }
    } else {
      if (productName === "" || typeof productName === "undefined") {
        toast.warn("Product Name is required!", generalToastStyle);
      } else if (desc === "" || typeof desc === "undefined") {
        toast.warn("Description is required!", generalToastStyle);
      } else if (weight === "" || typeof weight === "undefined") {
        toast.warn("Weight is required!", generalToastStyle);
      } else if (price === "" || typeof price === "undefined") {
        toast.warn("Price is required!", generalToastStyle);
      } else if (height === "" || typeof height === "undefined") {
        toast.warn("Height is required!", generalToastStyle);
      } else if (width === "" || typeof width === "undefined") {
        toast.warn("Width is required!", generalToastStyle);
      } else if (purity === "" || typeof purity === "undefined") {
        toast.warn("Purity is required!", generalToastStyle);
      } else if (images === "" || typeof images === "undefined") {
        toast.warn("Images are required!", generalToastStyle);
      } else {
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
        initialFormData.append("category", 1);
        initialFormData.append("sub_category", 1);

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

            if (selectedCustomizations) {
              const customizationsPayload = selectedCustomizations.map(
                (combination, index) => {
                  return {
                    options: combination["customization_ids"],
                    price: combination["price"],
                    made_on_order: combination["madeOnOrder"] || false,
                  };
                }
              );

              console.log("customizationplayload : " + customizationsPayload);

              const payload = {
                product: productId,
                customizations: customizationsPayload,
              };

              promises.push(
                axios.post(
                  "https://api.sadashrijewelkart.com/v1.0.0/seller/product/customization/add.php",
                  payload,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
              );
            }

            Promise.all(promises)
              .then((responses) => {
                console.log(
                  "All Details, images and videos uploaded successfully:",
                  responses
                );
                navigate("/home/products");
              })
              .catch((error) => {
                console.error("Error uploading images and videos:", error);
              });
          })
          .catch((error) => {
            console.error("Error saving initial product details:", error);
          });
      }
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId); // Change #3
    // Reset subcategory when changing category
    setSelectedSubcategory(""); // Change #4
    console.log(selectedCategory);
  };

  return (
    <div className="AddNewProduct">
      <ToastContainer />

      {/* Heading */}
      <div className="head">
        <div className="head-txt">Add New Product</div>
        <div className="btns">
          <Button className="button1" onClick={() => navigate("/products")}>
            Cancel
          </Button>
          <Button className="button2" onClick={handleProductSave}>
            Save
          </Button>
        </div>
      </div>
      <Divider />

      {/* Image and Video Input */}
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
                      <PhotoCamera /> Select Images
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
                          <Delete />
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
                      <VideoCameraFront />
                      Select Video
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
                        onClick={() => setVideo(null)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </ThemeProvider>

      {/* Product basic details input */}
      <ThemeProvider theme={theme}>
        <Paper
          elevation={3}
          className="detail-paper"
          style={{ marginTop: "50px" }}
        >
          <div className="heading">Product Details</div>
          <Divider />
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <InputTextField
                title={"Name"}
                value={productName}
                onEdit={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextField
                title={"Price"}
                value={price}
                onEdit={(e) => setPrice(e.target.value)}
                adornmentType="rupees"
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextField
                title={"Weight"}
                value={weight}
                onEdit={(e) => setWeight(e.target.value)}
                adornmentType="grams"
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextField
                title={"Height"}
                value={height}
                onEdit={(e) => setHeight(e.target.value)}
                adornmentType="mm"
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextField
                title={"Width"}
                value={width}
                onEdit={(e) => setWidth(e.target.value)}
                adornmentType="mm"
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextField
                title={"Purity"}
                value={purity}
                onEdit={(e) => setPurity(e.target.value)}
                adornmentType="kt"
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{ marginBottom: "20px", paddingRight: "50px" }}
            >
              <div className="label">Category</div>
              <FormControl fullWidth>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categoriesData.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ marginBottom: "20px", paddingRight: "50px" }}
            >
              <div className="label">Sub-Category</div>
              <FormControl fullWidth>
                <Select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                >
                  {selectedCategory &&
                    categoriesData
                      .find((category) => category.id === selectedCategory)
                      ?.sub_categories.map((subcategory) => (
                        <MenuItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} className="quill-container">
              <div className="label">Description</div>
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

      {/* Customization input */}
      <div className="product-customization-wrapper">
        <ThemeProvider theme={theme}>
          <Paper
            className="customization-paper"
            elevation={4}
            style={{ marginTop: "50px" }}
          >
            <div className="heading">Product Customization</div>
            <Divider />
            <div className="customization-text">
              Does your product come in different options, like size, purity or
              material? Add them here.
            </div>

            <div
              style={{
                width: "100%",
                height: "max-content",
                minHeight: "300px",
              }}
            >
              <MaterialSelector
                saveProductCustomization={handleProductSave}
                combinationsValues={combinationsValues}
                setCombinationValues={setCombinationValues}
              />
            </div>
            {/* <Button
              className="button"
              onClick={() => setOpenCustomizationInputDialog(true)}
            >
              <Add /> Add New Customization
            </Button> */}
            {selectedOptions === null || !showCustomizationTable ? (
              <></>
            ) : (
              <div>
                {selectedOptions.map((option, index) => (
                  <Chip
                    key={index}
                    label={`${option.type_name}: ${option.option_name}`}
                    onDelete={() => handleChipDelete(index)}
                    style={{ marginRight: "5px", marginBottom: "10px" }}
                  />
                ))}
              </div>
            )}
            {selectedOptions === null || !showCustomizationTable ? (
              <></>
            ) : (
              <div className="customization-options-table">
                <div className="heading">Customization Options Table</div>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead sx={{ fontWeight: "bold" }}>
                      <TableRow>
                        <TableCell>Index</TableCell>
                        {Object.keys(selectedCustomizationNames).map(
                          (key, index) => (
                            <TableCell key={index}>
                              {selectedCustomizationNames[key]}
                            </TableCell>
                          )
                        )}
                        <TableCell>Price</TableCell>
                        <TableCell>Made On Order</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedCustomizations.map((option, index) => (
                        <TableRow hover key={index}>
                          <TableCell>{index + 1}</TableCell>
                          {Object.keys(selectedCustomizationNames).map(
                            (key, colIndex) => (
                              <TableCell key={colIndex}>
                                {option["customization"][key]}
                              </TableCell>
                            )
                          )}
                          <TableCell>
                            <Input
                              type="number"
                              value={option["price"]}
                              onChange={(e) => {
                                let x = [...selectedCustomizations];
                                selectedCustomizations[index]["price"] =
                                  e.target.value;
                                setSelectedCustomizations(x);
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
                              checked={option["madeOnOrder"]}
                              onChange={(e) => {
                                let x = [...selectedCustomizations];
                                selectedCustomizations[index]["madeOnOrder"] =
                                  e.target.checked;
                                setSelectedCustomizations(x);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}

            {/* Apply customization dialog */}
            <Dialog
              open={openCustomizationInputDialog}
              onClose={() => setOpenCustomizationInputDialog(false)}
              disableEscapeKeyDown
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
              <ThemeProvider theme={theme}>
                <DialogTitle>Add Customization</DialogTitle>
                <Divider />
                <DialogContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    fontFamily: '"Work Sans", sans-serif',
                  }}
                >
                  You'll be able to manage pricing and inventory for this
                  product customization in the next step.
                  <TextField
                    select
                    label="Customization Type"
                    value={selectedCustomizationTypeId}
                    onChange={handleCustomizationTypeSelection}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: "20px", marginTop: "10px" }}
                  >
                    {customizationTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                    <MenuItem key={-1} value={-1}>
                      <Add /> Add New
                    </MenuItem>
                  </TextField>
                  <TextField
                    label="Customization Options"
                    select
                    variant="outlined"
                    fullWidth
                    value=""
                    onChange={handleCustomizationOptionChange}
                  >
                    {customizationOptions &&
                      customizationOptions.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    <MenuItem key={-1} value={-1}>
                      <Add /> Add New
                    </MenuItem>
                  </TextField>
                  <div>
                    {selectedOptions.map((option, index) => (
                      <Chip
                        key={index}
                        label={`${option.type_name}: ${option.option_name}`}
                        onDelete={() => handleChipDelete(index)}
                        style={{ marginRight: "5px", marginBottom: "10px" }}
                      />
                    ))}
                  </div>
                </DialogContent>
                <DialogActions
                  sx={{ marginBottom: "10px", marginRight: "10px" }}
                >
                  <Button
                    onClick={() => setOpenCustomizationInputDialog(false)}
                  >
                    Close
                  </Button>
                  <Button variant="contained" onClick={loadCustomizationTable}>
                    Apply
                  </Button>
                </DialogActions>
              </ThemeProvider>
            </Dialog>

            {/* Add customization field  dialog */}
            <Dialog
              open={openAddNewCustomizationTypeInputDialog}
              onClose={() => setOpenAddNewCustomizationTypeInputDialog(false)}
              disableEscapeKeyDown
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
              <ThemeProvider theme={theme}>
                <DialogTitle>Add New Customization Type</DialogTitle>
                <Divider />
                <DialogContent
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  Enter the name of the customization type you want to add to
                  customize type list.
                  <br />
                  <InputTextField
                    title={"New Customization Type"}
                    value={newCustomizationType}
                    onEdit={(e) => setNewCustomizationType(e.target.value)}
                    sx={{ marginBottom: "20px", marginTop: "10px" }}
                  />
                </DialogContent>
                <DialogActions
                  sx={{ marginBottom: "10px", marginRight: "10px" }}
                >
                  <Button
                    onClick={() =>
                      setOpenAddNewCustomizationTypeInputDialog(false)
                    }
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAddNewCustomizationType}
                    className="closeButton"
                  >
                    Add
                  </Button>
                </DialogActions>
              </ThemeProvider>
            </Dialog>

            {/* Add customization option dialog */}
            <Dialog
              open={openAddNewCustomizationOptionInputDialog}
              onClose={() => setOpenAddNewCustomizationOptionInputDialog(false)}
              disableEscapeKeyDown
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
              <ThemeProvider theme={theme}>
                <DialogTitle>Add New Customization Option</DialogTitle>
                <Divider />
                <DialogContent
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  Enter the name of the customization option you want to add for
                  the customize type "{selectedCustomizationTypeName}".
                  <br />
                  <InputTextField
                    title={"New Customization Option"}
                    value={newCustomizationOption}
                    onEdit={(e) => setNewCustomizationOption(e.target.value)}
                    sx={{ marginBottom: "20px", marginTop: "10px" }}
                  />
                </DialogContent>
                <DialogActions
                  sx={{ marginBottom: "10px", marginRight: "10px" }}
                >
                  <Button
                    onClick={() =>
                      setOpenAddNewCustomizationOptionInputDialog(false)
                    }
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    className="closeButton"
                    onClick={handleAddNewCustomizationOption}
                  >
                    Add
                  </Button>
                </DialogActions>
              </ThemeProvider>
            </Dialog>
          </Paper>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AddNewProduct;
