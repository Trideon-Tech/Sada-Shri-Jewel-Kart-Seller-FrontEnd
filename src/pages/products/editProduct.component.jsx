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
import { useNavigate, useParams } from "react-router-dom";
import { generalToastStyle } from "../../utils/toast.styles";
import "./addNewProduct.styles.scss";

import InputTextField from "../../components/input-text-field/input-text-field.component";
import MaterialSelectorEdit from "./materialSelectorEdit.component";

const COLUMN_TRANSFORMS = {
  gold_making_charges: "Gold Making Charge(%)",
  silver_making_charges: "Silver Making Charge(%)",
  platinum_making_charges: "Platinum Making Charges(%)",
  diamond_making_charges: "Diamond Fixed Price",
  gemstone_making_charges: "Gemstone Fixed Price",
  gold_nt_wt: "Gold Weight(gms)",
  silver_nt_wt: "Silver Weight(gms)",
  platinum_nt_wt: "Platinum Weight(gms)",
  diamond_nt_wt: "Diamond weight",
  gemstone_nt_wt: "Gem weight",
};
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

const EditProduct = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  var productId = 1;
  let { hash, name } = useParams();

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [productName, setProductName] = useState();
  const [desc, setDesc] = useState();
  const [weight, setWeight] = useState();
  const [price, setPrice] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [orderProductId, setOrderProductId] = useState();
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

  const [combinationsValues, setCombinationValues] = React.useState([]);
  const [combinationFields, setCombinationFields] = React.useState([]);

  const [displayTable, setDisplayTable] = React.useState({});

  const convertToTableData = (rawData) => {
    const tableHeaders = rawData?.customizations?.fields;
    const checkData =
      rawData?.customizations?.variants?.options[0]?.making_charge_perc;

    const headerLists = [];

    if (checkData["gold_making_charges"] !== 0) {
      tableHeaders.push("gold_making_charges");
      headerLists.push("gold_making_charges");
    }

    if (checkData["silver_making_charges"] !== 0) {
      tableHeaders.push("silver_making_charges");
      headerLists.push("silver_making_charges");
    }

    if (checkData["platinum_making_charges"] !== 0) {
      tableHeaders.push("platinum_making_charges");
      headerLists.push("platinum_making_charges");
    }

    if (checkData["diamond_making_charges"] !== 0) {
      tableHeaders.push("diamond_making_charges");
      headerLists.push("diamond_making_charges");
    }

    if (checkData["gemstone_making_charges"] !== 0) {
      tableHeaders.push("gemstone_making_charges");
      headerLists.push("gemstone_making_charges");
    }

    //wt headers

    const checkDataWt =
      rawData?.customizations?.variants?.options[0]?.jewellery_type_nt_wt;

    if (checkDataWt["gold_nt_wt"] !== 0) {
      tableHeaders.push("gold_nt_wt");
      headerLists.push("gold_nt_wt");
    }

    if (checkDataWt["silver_nt_wt"] !== 0) {
      tableHeaders.push("silver_nt_wt");
      headerLists.push("silver_nt_wt");
    }

    if (checkDataWt["platinum_nt_wt"] !== 0) {
      tableHeaders.push("platinum_nt_wt");
      headerLists.push("platinum_nt_wt");
    }

    if (checkDataWt["diamond_nt_wt"] !== 0) {
      tableHeaders.push("diamond_nt_wt");
      headerLists.push("diamond_nt_wt");
    }

    if (checkDataWt["gemstone_nt_wt"] !== 0) {
      tableHeaders.push("gemstone_nt_wt");
      headerLists.push("gemstone_nt_wt");
    }

    const tableData = [];
    for (let row of rawData?.customizations?.variants?.options) {
      const fillUpData = row?.for_customization_options;
      const mergedObject = {
        ...row?.making_charge_perc,
        ...row?.jewellery_type_nt_wt,
      };
      headerLists.map((key) => fillUpData.push(mergedObject[key]));

      tableData.push(fillUpData);
    }

    console.log("formed Data ========>>>>>>>", {
      tableHeaders: tableHeaders,
      tableData: tableData,
    });

    setDisplayTable({ tableHeaders: tableHeaders, tableData: tableData });
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.sadashrijewelkart.com/v1.0.0/seller/product/details.php?name=${name}&hash=${hash}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        const result = response?.data?.response;
        console.log("response", result);
        setOrderProductId(result?.id);
        setProductName(result?.name);
        setDesc(result?.description);
        setWeight(result?.weight);
        setPrice(result?.price);
        setHeight(result?.height);
        setWidth(result?.width);
        console.log(
          "result?.purity, result?.category, result?.sub_category",
          result?.purity,
          result?.category,
          result?.sub_category
        );
        setPurity(result?.purity || 0);
        setSelectedCategory(result?.category);
        setSelectedSubcategory(result?.sub_category);
        setCombinationValues(result?.customizations?.variants?.options);
        setCombinationFields(result?.customizations?.fields);
        convertToTableData(result);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    // const result = {
    //   success: 1,
    //   message: "Data fetch success!",
    //   response: {
    //     id: "14",
    //     created_at: "2024-09-08 13:42:35",
    //     updated_at: "2024-09-12 17:37:30",
    //     company: {
    //       id: "1",
    //       created_at: "2023-12-27 15:33:52",
    //       updated_at: "2024-01-18 10:30:04",
    //       gstin: "123456789012345",
    //       gstin_verified: "1",
    //       name: "NewJwellers",
    //       logo: "company/NewJwellers/logo.png",
    //       cover_image: "company/NewJwellers/cover_image.webp",
    //       contact_email: "rishavk1102.work@gmail.com",
    //       addresses: "1",
    //       banks: "1",
    //       admin_verified: "1",
    //       admin: "1",
    //     },
    //     seller: "1",
    //     name: "Rose P Necklace",
    //     hash: "3982bc",
    //     description: "<p>So, <strong><em><u>heyy yes!</u></em></strong></p>",
    //     category: "More Jewellery",
    //     sub_category: "Solitaire",
    //     weight: "100",
    //     height: "10",
    //     width: "200",
    //     purity: "",
    //     price: "200000",
    //     admin_verified: "0",
    //     admin: "0",
    //     is_active: "1",
    //     customizations: {
    //       fields: ["Diamond Color"],
    //       variants: {
    //         count: 2,
    //         options: [
    //           {
    //             id: "65",
    //             created_at: "2024-09-08 13:42:36",
    //             updated_at: "2024-09-14 18:32:50",
    //             product: "14",
    //             for_customization_options: [
    //               "Diamond Color 1",
    //               "Diamond Color 2",
    //               "Diamond Color 3",
    //             ],
    //             price: "10000",
    //             made_on_order: "1",
    //             fixed_price: "2000",
    //             making_charge_perc:
    //               '{"gold_making_charges":4,"silver_making_charges":1,"platinum_making_charges":3,"diamond_making_charges":4,"gemstone_making_charges":0}',
    //             jewellery_type_nt_wt:
    //               '{"gold_nt_wt":10,"silver_nt_wt":0,"platinum_nt_wt":11,"diamond_nt_wt":12,"gemstone_nt_wt":11}',
    //             is_active: "1",
    //             for_customization_fields: [
    //               "Diamond Color",
    //               "Diamond Color",
    //               "Diamond Color",
    //             ],
    //           },
    //           {
    //             id: "66",
    //             created_at: "2024-09-08 13:42:36",
    //             updated_at: "2024-09-14 18:32:47",
    //             product: "14",
    //             for_customization_options: [
    //               "Diamond Color 1",
    //               "Diamond Color 2",
    //               "Diamond Color 3",
    //             ],
    //             price: "30000",
    //             made_on_order: "0",
    //             fixed_price: "2000",
    //             making_charge_perc:
    //               '{"gold_making_charges":4,"silver_making_charges":1,"platinum_making_charges":3,"diamond_making_charges":4,"gemstone_making_charges":0}',
    //             jewellery_type_nt_wt:
    //               '{"gold_nt_wt":10,"silver_nt_wt":12,"platinum_nt_wt":11,"diamond_nt_wt":12,"gemstone_nt_wt":11}',
    //             is_active: "1",
    //             for_customization_fields: [
    //               "Diamond Color",
    //               "Diamond Color",
    //               "Diamond Color",
    //             ],
    //           },
    //         ],
    //       },
    //       options_per_field: {
    //         "Diamond Color": [
    //           "Diamond Color 1",
    //           "Diamond Color 2",
    //           "Diamond Color 3",
    //         ],
    //       },
    //     },
    //     recommended: [],
    //   },
    // };
    // setProductName(result.response.name);
    // setDesc(result.response.description);
    // setWeight(result.response.weight);
    // setPrice(result.response.price);
    // setHeight(result.response.height);
    // setWidth(result.response.width);
    // setPurity(result.response.purity);
    // setSelectedCategory(result.response.category);
    // setSelectedSubcategory(result.response.sub_category);
    // setCombinationValues(result?.response?.customizations?.variants?.options);
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
    if (!selectedCustomizationTypeId) return;
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
        .put(
          "https://api.sadashrijewelkart.com/v1.0.0/seller/product/update.php",
          {
            id: orderProductId,
            type: "update_item",
            name: productName,
            description: desc,
            category: selectedCategory,
            sub_category: selectedSubcategory,
            purity: purity,
            price: price,
            weight: weight,
            height: height,
            width: width,
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
        <div className="head-txt">Edit Product</div>
        <div className="btns">
          <Button className="button1" onClick={() => navigate("/products")}>
            Cancel
          </Button>
          <Button className="button2" onClick={handleProductSave}>
            Update
          </Button>
        </div>
      </div>
      <Divider />

      {/* Image and Video Input */}

      {/* <ThemeProvider theme={theme}>
        <div className="inputFilePreviewContainer">
          <Paper className="inputFieldsContainer">
            <Grid container spacing={2}>
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
      </ThemeProvider> */}

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
            sx={{ width: "100%", overflow: "scroll" }}
          >
            <div className="heading">Existing Customization</div>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {displayTable?.tableHeaders?.map((column) => (
                      <TableCell key={column} align={"left"}>
                        {COLUMN_TRANSFORMS[column]
                          ? COLUMN_TRANSFORMS[column]
                          : column.toUpperCase()}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayTable?.tableData?.map((columns, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => (
                          <TableCell>{column}</TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </ThemeProvider>
      </div>

      <div className="product-customization-wrapper">
        <ThemeProvider theme={theme}>
          <Paper
            className="customization-paper"
            elevation={4}
            style={{ marginTop: "50px" }}
          >
            <div className="heading">Product Customization</div>
            <Divider />
            {/* <div className="customization-text">
              Does your product come in different options, like size, purity or
              material? Add them here.
            </div>
            <Button
              className="button"
              onClick={() => setOpenCustomizationInputDialog(true)}
            >
              <Add /> Add New Customization
            </Button> */}
            <div
              style={{
                width: "100%",
                height: "max-content",
                minHeight: "300px",
              }}
            >
              <MaterialSelectorEdit
                readOnly={true}
                saveProductCustomization={() => {}}
                combinationsValues={combinationsValues}
                setCombinationValues={setCombinationValues}
                combinationFields={combinationFields}
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

export default EditProduct;
