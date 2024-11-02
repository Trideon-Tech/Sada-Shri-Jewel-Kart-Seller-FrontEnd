import {
  Button,
  Collapse,
  createTheme,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  Delete,
  ExpandLess,
  ExpandMore,
  PhotoCamera,
  VideoCameraFront,
} from "@mui/icons-material";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputTextField from "../../components/input-text-field/input-text-field.component";
import "./addNewProduct.styles.scss";

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

  const [combinationsValues, setCombinationValues] = useState([]);
  const [dropdownValues, setDropdownValues] = useState();
  const [metalType, setMetalType] = useState();
  const [quantity, setQuantity] = useState();
  const [grossWeight, setGrossWeight] = useState();
  const [stoneWeight, setStoneWeight] = useState();
  const [netWeight, setNetWeight] = useState();
  const [wastagePercent, setWastagePercent] = useState();
  const [wastageWeight, setWastageWeight] = useState(0);
  const [netWeightAfterWastage, setNetWeightAfterWastage] = useState();
  const [makingChargeType, setMakingChargeType] = useState();
  const [makingChargeValue, setMakingChargeValue] = useState();
  const [makingChargeAmount, setMakingChargeAmount] = useState();
  const [stoneAmount, setStoneAmount] = useState();
  const [hallmarkCharge, setHallmarkCharge] = useState();
  const [rodiumCharge, setRodiumCharge] = useState();
  const [gstPercent, setGstPercent] = useState();
  const [rates, setRates] = useState([]);
  const [rate, setRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [stoneTotalAmount, setStoneTotalAmount] = useState(0);
  const [stoneType, setStoneType] = useState();
  const [stoneClass, setStoneClass] = useState();
  const [stoneCut, setStoneCut] = useState();
  const [stonePieces, setStonePieces] = useState();
  const [stoneCarat, setStoneCarat] = useState();
  const [stoneClarity, setStoneClarity] = useState();
  const [stoneRate, setStoneRate] = useState();
  const [stoneInternalWeight, setStoneInternalWeight] = useState();
  const [stoneGSTPercent, setStoneGSTPercent] = useState();
  const [qualityName, setQualityName] = useState();
  const [size, setSize] = useState();
  const [hsnCode, setHsnCode] = useState();
  const [stoneDetailsExpanded, setStoneDetailsExpanded] = useState(false);
  const [metalDetailsExpanded, setMetalDetailsExpanded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    Promise.all([
      axios.get(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/customization/all.php?type=product_add_template",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      axios.get(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/all.php?type=category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      axios.get(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/jewelleryInventory/jewellryInventory.php?type=get_latest",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    ])
      .then(([dropdownResponse, categoriesResponse, ratesResponse]) => {
        setDropdownValues(dropdownResponse.data.response);
        const categories = categoriesResponse.data.response || [];
        setCategoriesData(categories);
        setRates(ratesResponse.data.response.jewelry_prices);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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

  useEffect(() => {
    let baseAmount = 0;

    if (makingChargeType == 8) {
      setAmount(parseFloat(makingChargeAmount || 0));
      return;
    }

    // Calculate base amount based on weight
    if (netWeightAfterWastage) {
      baseAmount = netWeightAfterWastage * rate;
    } else if (netWeight) {
      baseAmount = netWeight * rate;
    } else if (grossWeight) {
      baseAmount = grossWeight * rate;
    }

    // Add additional charges
    let totalAmount = baseAmount;
    if (makingChargeAmount) totalAmount += parseFloat(makingChargeAmount);
    if (hallmarkCharge) totalAmount += parseFloat(hallmarkCharge);
    if (rodiumCharge) totalAmount += parseFloat(rodiumCharge);
    if (stoneAmount) totalAmount += parseFloat(stoneAmount);

    // Add GST if present
    if (gstPercent) {
      totalAmount += (totalAmount * parseFloat(gstPercent)) / 100;
    }

    setAmount(totalAmount);
  }, [
    netWeightAfterWastage,
    netWeight,
    grossWeight,
    rate,
    makingChargeAmount,
    hallmarkCharge,
    rodiumCharge,
    stoneAmount,
    gstPercent,
    makingChargeType,
  ]);

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
    const formData = {
      type: "item",
      category: selectedCategory || "",
      sub_category: selectedSubcategory || "",
      name: productName || "",
      desc: desc || "",
      customization_option: [quantity, makingChargeType, stoneType]
        .filter((val) => val !== null && val !== 0)
        .join(","),
      size: size || "",
      hsn: hsnCode || "",
      metal: {
        metal: metalType || "",
        quality: qualityName || "",
        quantity: quantity || "",
        gross_wt: grossWeight || "",
        stone_wt: stoneWeight || "",
        net_wt: netWeight || "",
        wastage_prec: wastagePercent || "",
        wastage_wt: wastageWeight || "",
        net_wt_after_wastage: netWeightAfterWastage || "",
        making_charge_type: makingChargeType || "",
        making_charge_value: makingChargeValue || "",
        making_charge_amount: makingChargeAmount || "",
        stone_amount: stoneAmount || "",
        hallmark_charge: hallmarkCharge || "",
        rodium_charge: rodiumCharge || "",
        gst_perc: gstPercent || "",
      },
      stone: {
        stone_type: stoneType || "",
        class: stoneClass || "",
        clarity: stoneClarity || "",
        cut: stoneCut || "",
        pieces: stonePieces || "",
        carat: stoneCarat || "",
        stone_wt: stoneInternalWeight || "",
        stone_rate: stoneRate || "",
        gst_perc: stoneGSTPercent || "",
      },
    };

    axios
      .post(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/product/addProduct.php",
        formData,
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
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
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
            <Grid item xs={3}>
              <InputTextField
                title={"Name"}
                value={productName}
                onEdit={(e) => {
                  setProductName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.querySelector('select[name="category"]')?.focus();
                  }
                }}
              />
            </Grid>
            <Grid
              item
              xs={3}
              style={{ marginBottom: "20px", paddingRight: "50px" }}
            >
              <div className="label">Category</div>
              <FormControl fullWidth>
                <Select
                  name="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document
                        .querySelector('select[name="subcategory"]')
                        ?.focus();
                    }
                  }}
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
              xs={3}
              style={{ marginBottom: "20px", paddingRight: "50px" }}
            >
              <div className="label">Sub-Category</div>
              <FormControl fullWidth>
                <Select
                  name="subcategory"
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document.querySelector('input[name="size"]')?.focus();
                    }
                  }}
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
            <Grid
              item
              xs={3}
              style={{ marginBottom: "20px", paddingRight: "50px" }}
            >
              <div className="label">Size</div>
              <FormControl fullWidth>
                <TextField
                  name="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  fullWidth
                  placeholder="Enter size"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document.querySelector('select[name="hsnCode"]')?.focus();
                    }
                  }}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={3}
              style={{ marginBottom: "20px", paddingRight: "50px" }}
            >
              <div className="label">HSN Code</div>
              <FormControl fullWidth>
                <Select
                  name="hsnCode"
                  value={hsnCode}
                  onChange={(e) => setHsnCode(e.target.value)}
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document
                        .querySelector(".quill-container .ql-editor")
                        ?.focus();
                    }
                  }}
                >
                  {dropdownValues?.[0]?.customization_fields
                    .find((field) => field.name === "hsn")
                    ?.property_value.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.display_name}
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
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>

      {/* Product metal input */}
      <ThemeProvider theme={theme}>
        <Paper
          elevation={3}
          className="detail-paper"
          style={{ marginTop: "50px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="heading">Metal Details</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "20px" }}>
                <div>Rate</div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {rate.toFixed(2)}
                </div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <div>Amount</div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {amount.toFixed(2)}
                </div>
              </div>
              <IconButton
                onClick={() => setMetalDetailsExpanded(!metalDetailsExpanded)}
              >
                {metalDetailsExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </div>
          </div>
          <Divider />
          <Collapse in={metalDetailsExpanded}>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <div className="label">Type</div>
                <FormControl
                  fullWidth
                  style={{ marginBottom: "20px", paddingRight: "50px" }}
                >
                  <Select
                    name="metalType"
                    value={metalType}
                    onChange={(e) => setMetalType(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('select[name="purity"]')
                          ?.focus();
                      }
                    }}
                  >
                    <MenuItem value="gold">Gold</MenuItem>
                    <MenuItem value="silver">Silver</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Quality</div>
                <FormControl fullWidth>
                  <Select
                    name="purity"
                    value={purity}
                    onChange={(e) => {
                      setPurity(e.target.value);

                      let selectedOption;
                      if (metalType === "gold") {
                        selectedOption =
                          dropdownValues?.[0]?.customization_fields
                            .find((field) => field.name === "gold_quality")
                            ?.property_value.find(
                              (opt) => opt.id === e.target.value
                            )?.name;
                      } else if (metalType === "silver") {
                        selectedOption =
                          dropdownValues?.[1]?.customization_fields
                            .find((field) => field.name === "silver_quality")
                            ?.property_value.find(
                              (opt) => opt.id === e.target.value
                            )?.name;
                      }

                      setQualityName(selectedOption);

                      if (selectedOption) {
                        setRate(rates[selectedOption]);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="quantity"]')
                          ?.focus();
                      }
                    }}
                  >
                    {metalType === "gold" &&
                      dropdownValues?.[0]?.customization_fields
                        .find((field) => field.name === "gold_quality")
                        ?.property_value.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.display_name}
                          </MenuItem>
                        ))}
                    {metalType === "silver" &&
                      dropdownValues?.[1]?.customization_fields
                        .find((field) => field.name === "silver_quality")
                        ?.property_value.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.display_name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Quantity</div>
                <FormControl fullWidth>
                  <TextField
                    name="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    fullWidth
                    placeholder="Enter quantity"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="grossWeight"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Gross Weight</div>
                <FormControl fullWidth>
                  <TextField
                    name="grossWeight"
                    type="number"
                    value={grossWeight}
                    onChange={(e) => {
                      setGrossWeight(e.target.value);
                      setNetWeight(e.target.value - stoneWeight);
                      setNetWeightAfterWastage(
                        e.target.value - stoneWeight + wastageWeight
                      );
                    }}
                    fullWidth
                    placeholder="Enter gross weight"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">gm</InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="stoneWeight"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Stone Weight</div>
                <FormControl fullWidth>
                  <TextField
                    name="stoneWeight"
                    type="number"
                    value={stoneWeight}
                    onChange={(e) => {
                      setStoneWeight(e.target.value);
                      setNetWeight(grossWeight - e.target.value);
                      setNetWeightAfterWastage(
                        grossWeight - e.target.value + wastageWeight
                      );
                    }}
                    fullWidth
                    placeholder="Enter stone weight"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">gm</InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="netWeight"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Net Weight</div>
                <FormControl fullWidth>
                  <TextField
                    name="netWeight"
                    type="number"
                    value={netWeight}
                    disabled
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">gm</InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="wastagePercent"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Wastage Percentage</div>
                <FormControl fullWidth>
                  <TextField
                    name="wastagePercent"
                    type="number"
                    value={wastagePercent}
                    onChange={(e) => {
                      setWastagePercent(e.target.value);
                      setWastageWeight(
                        (grossWeight - stoneWeight) * (e.target.value / 100)
                      );
                      setNetWeightAfterWastage(
                        (grossWeight - stoneWeight) * (1 + e.target.value / 100)
                      );
                    }}
                    fullWidth
                    placeholder="Enter wastage percentage"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="wastageWeight"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Wastage Weight</div>
                <FormControl fullWidth>
                  <TextField
                    name="wastageWeight"
                    type="number"
                    value={wastageWeight}
                    disabled
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">gm</InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="netWeightAfterWastage"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Net Weight After Wastage</div>
                <FormControl fullWidth>
                  <TextField
                    name="netWeightAfterWastage"
                    type="number"
                    value={netWeightAfterWastage}
                    disabled
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">gm</InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('select[name="makingChargeType"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Making Charge Type</div>
                <FormControl fullWidth>
                  <Select
                    name="makingChargeType"
                    value={makingChargeType}
                    onChange={(e) => {
                      setMakingChargeType(e.target.value);
                      setMakingChargeValue();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="makingChargeValue"]')
                          ?.focus();
                      }
                    }}
                  >
                    {metalType === "gold" &&
                      dropdownValues?.[0]?.customization_fields
                        .find((field) => field.name === "making_charge_type")
                        ?.property_value.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.display_name}
                          </MenuItem>
                        ))}
                    {metalType === "silver" &&
                      dropdownValues?.[1]?.customization_fields
                        .find((field) => field.name === "making_charge_type")
                        ?.property_value.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.display_name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Making Charge Value</div>
                <FormControl fullWidth>
                  <TextField
                    name="makingChargeValue"
                    type="number"
                    value={makingChargeValue}
                    onChange={(e) => {
                      setMakingChargeValue(e.target.value);

                      console.log(e.target.value);
                      if (makingChargeType == 6) {
                        setMakingChargeAmount(
                          (
                            parseFloat(e.target.value) *
                            parseFloat(netWeightAfterWastage)
                          ).toFixed(2)
                        );
                      } else if (makingChargeType == 7) {
                        setMakingChargeAmount(
                          parseFloat(e.target.value).toFixed(2)
                        );
                      } else if (makingChargeType == 8) {
                        setMakingChargeAmount(
                          parseFloat(e.target.value).toFixed(2)
                        );
                      } else if (makingChargeType == 9) {
                        setMakingChargeAmount(
                          parseFloat(
                            e.target.value *
                              (rate / 100) *
                              (netWeightAfterWastage || netWeight)
                          ).toFixed(2)
                        );
                      }
                    }}
                    fullWidth
                    placeholder="Enter making charge value"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {makingChargeType == 9 ? "%" : "₹"}
                        </InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="makingChargeAmount"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Making Charge Amount</div>
                <FormControl fullWidth>
                  <TextField
                    name="makingChargeAmount"
                    type="number"
                    value={makingChargeAmount}
                    onChange={(e) => setMakingChargeAmount(e.target.value)}
                    fullWidth
                    placeholder="Enter making charge amount"
                    disabled
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">₹</InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="stoneAmount"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Stone Amount</div>
                <FormControl fullWidth>
                  <TextField
                    name="stoneAmount"
                    type="number"
                    value={stoneAmount}
                    onChange={(e) => setStoneAmount(e.target.value)}
                    fullWidth
                    placeholder="Enter stone amount"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">₹</InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="hallmarkCharge"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Hallmark Charge</div>
                <FormControl fullWidth>
                  <TextField
                    name="hallmarkCharge"
                    type="number"
                    value={hallmarkCharge}
                    onChange={(e) => setHallmarkCharge(e.target.value)}
                    fullWidth
                    placeholder="Enter hallmark charge"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">₹</InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="rodiumCharge"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Rodium Cg. | Certificate Cg.</div>
                <FormControl fullWidth>
                  <TextField
                    name="rodiumCharge"
                    type="number"
                    value={rodiumCharge}
                    onChange={(e) => setRodiumCharge(e.target.value)}
                    fullWidth
                    placeholder="Enter rodium charge"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">₹</InputAdornment>
                      ),
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('select[name="gstPercent"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">GST Percentage</div>
                <FormControl fullWidth>
                  <Select
                    name="gstPercent"
                    value={gstPercent}
                    onChange={(e) => setGstPercent(e.target.value)}
                    fullWidth
                  >
                    {dropdownValues?.[0]?.customization_fields
                      .find((field) => field.name === "gst")
                      ?.property_value.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                          {option.display_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>
        </Paper>
      </ThemeProvider>

      {/* Product stone input */}
      <ThemeProvider theme={theme}>
        <Paper
          elevation={3}
          className="detail-paper"
          style={{
            marginTop: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="heading">Stone Details</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "20px" }}>
                <div>Amount</div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {parseFloat(stoneTotalAmount).toFixed(2)}
                </div>
              </div>
              <IconButton
                onClick={() => setStoneDetailsExpanded(!stoneDetailsExpanded)}
              >
                {stoneDetailsExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </div>
          </div>
          <Divider />
          <Collapse in={stoneDetailsExpanded}>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <div className="label">Type</div>
                <FormControl
                  fullWidth
                  style={{ marginBottom: "20px", paddingRight: "50px" }}
                >
                  <Select
                    name="stoneType"
                    value={stoneType}
                    onChange={(e) => setStoneType(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="stoneClass"]')
                          ?.focus();
                      }
                    }}
                  >
                    {dropdownValues?.[0]?.customization_fields
                      .find((field) => field.name === "stone_type")
                      ?.property_value.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.display_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Class</div>
                <FormControl fullWidth>
                  <TextField
                    name="stoneClass"
                    type="text"
                    value={stoneClass}
                    onChange={(e) => setStoneClass(e.target.value)}
                    fullWidth
                    placeholder="Enter class"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="stoneClarity"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Clarity</div>
                <FormControl fullWidth>
                  <TextField
                    name="stoneClarity"
                    type="text"
                    value={stoneClarity}
                    onChange={(e) => setStoneClarity(e.target.value)}
                    fullWidth
                    placeholder="Enter clarity"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="stoneCut"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Cut</div>
                <FormControl fullWidth>
                  <TextField
                    name="stoneCut"
                    type="text"
                    value={stoneCut}
                    onChange={(e) => setStoneCut(e.target.value)}
                    fullWidth
                    placeholder="Enter cut"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="stonePieces"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Pieces</div>
                <FormControl fullWidth>
                  <TextField
                    name="stonePieces"
                    type="number"
                    value={stonePieces}
                    onChange={(e) => {
                      setStonePieces(e.target.value);
                      const weight =
                        e.target.value && stoneCarat
                          ? (stoneCarat * 0.2 * e.target.value).toFixed(2)
                          : "";
                      setStoneInternalWeight(weight);
                    }}
                    fullWidth
                    placeholder="Enter number of pieces"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="stoneCarat"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Carat</div>
                <FormControl fullWidth>
                  <TextField
                    name="stoneCarat"
                    type="number"
                    value={stoneCarat}
                    onChange={(e) => {
                      setStoneCarat(e.target.value);
                      const weight =
                        e.target.value && stonePieces
                          ? (e.target.value * 0.2 * stonePieces).toFixed(2)
                          : "";
                      setStoneInternalWeight(weight);
                    }}
                    fullWidth
                    placeholder="Enter carat"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .querySelector('input[name="stoneInternalWeight"]')
                          ?.focus();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Weight (gm)</div>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    value={stoneInternalWeight}
                    disabled
                    fullWidth
                    placeholder="Auto-calculated weight"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">gm</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">Rate</div>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    value={stoneRate}
                    onChange={(e) => {
                      setStoneRate(e.target.value);
                      const total =
                        stoneInternalWeight && e.target.value
                          ? (
                              parseFloat(stoneInternalWeight) *
                              parseFloat(e.target.value)
                            ).toFixed(2)
                          : 0;
                      setStoneTotalAmount(total);
                    }}
                    fullWidth
                    placeholder="Enter rate"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">₹</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "20px", paddingRight: "50px" }}
              >
                <div className="label">GST Percentage</div>
                <FormControl fullWidth>
                  <Select
                    value={stoneGSTPercent}
                    onChange={(e) => {
                      setStoneGSTPercent(e.target.value);
                      const baseAmount =
                        stoneInternalWeight && stoneRate
                          ? parseFloat(stoneInternalWeight) *
                            parseFloat(stoneRate)
                          : 0;
                      const gstAmount =
                        baseAmount * (parseFloat(e.target.value) / 100);
                      const total = (baseAmount + gstAmount).toFixed(2);
                      setStoneTotalAmount(total);
                    }}
                    fullWidth
                  >
                    {dropdownValues?.[0]?.customization_fields
                      .find((field) => field.name === "gst")
                      ?.property_value.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                          {option.display_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>
        </Paper>
      </ThemeProvider>

      {/* <div className="product-customization-wrapper">
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
      </div> */}
    </div>
  );
};

export default AddNewProduct;
