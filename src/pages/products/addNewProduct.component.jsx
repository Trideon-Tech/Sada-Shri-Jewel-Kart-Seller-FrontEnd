import { Delete, PhotoCamera, VideoCameraFront } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addNewProduct.styles.scss";
import PriceBreakout from "./priceBreakout.component";

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

// Example HSN mapping
const hsnMapping = {
  "GOLD JEWELLERY": "Gold Jewelry - 7113",
  "SILVER ARTICLES": "Silver Articles - 7114",
  "SILVER JEWELLERY": "Silver Jewelry - 7113",
  GEMSTONE: "Gemstone Jewelry - 7113",
  "DIAMOND JEWELLERY": "Diamond Jewelry - 7113 ",
  // Add more mappings as needed
};

const typeMapping = {
  "GOLD JEWELLERY": "gold",
  "SILVER JEWELLERY": "silver",
};

const AddNewProduct = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [productName, setProductName] = useState();
  const [desc, setDesc] = useState();
  const [purity, setPurity] = useState("gold22");
  const [customizationTypes, setCustomizationTypes] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCustomizationTypeId, setSelectedCustomizationTypeId] =
    useState("");
  const [selectedCustomizationTypeName, setSelectedCustomizationTypeName] =
    useState("");
  const [customizationOptions, setCustomizationOptions] = useState([]);
  const [dropdownValues, setDropdownValues] = useState();
  const [metalType, setMetalType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [grossWeight, setGrossWeight] = useState();
  const [tags, setTags] = useState();
  const [stoneWeight, setStoneWeight] = useState(0);
  const [netWeight, setNetWeight] = useState();
  const [wastagePercent, setWastagePercent] = useState(0);
  const [wastageWeight, setWastageWeight] = useState(0);
  const [netWeightAfterWastage, setNetWeightAfterWastage] = useState();
  const [makingChargeType, setMakingChargeType] = useState(9);
  const [makingChargeValue, setMakingChargeValue] = useState();
  const [makingChargeAmount, setMakingChargeAmount] = useState();
  const [stoneAmount, setStoneAmount] = useState(0);
  const [hallmarkCharge, setHallmarkCharge] = useState(50);
  const [rodiumCharge, setRodiumCharge] = useState(0);
  const [gstPercent, setGstPercent] = useState(3);
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
  const [hsnCode, setHsnCode] = useState("");
  const [inventoryQty, setInventoryQty] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [stoneColor, setStoneColor] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  // Crop related states
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [showDeleteImageDialog, setShowDeleteImageDialog] = useState(false);
  const [deleteImageIndex, setDeleteImageIndex] = useState();
  const [loading, setLoading] = useState(false);

  const [showDeleteVideoDialog, setShowVideoDeleteDialog] = useState(false);

  const [showPriceBreakout, setShowPriceBreakout] = useState(false);
  const [productAmountData, setProductAmountData] = useState({});

  const calculateTotalPrice = (metalInfo, stoneInfo) => {
    const metal =
      typeof metalInfo === "string" ? JSON.parse(metalInfo) : metalInfo;
    const stone =
      typeof stoneInfo === "string" ? JSON.parse(stoneInfo) : stoneInfo;

    const metalRate = rates[metal.quality_name] || 0;
    // Calculate net weight
    const netWeight = parseFloat(metal.gross_wt) - parseFloat(metal.stone_wt);
    const wastageWeight = netWeight * (parseFloat(metal.wastage_prec) / 100);

    const netWeightAfterWastage = netWeight + wastageWeight;

    // Calculate metal base amount
    let metalBaseAmount = 0;

    if (metal.making_charge_type === "8") {
      metalBaseAmount = parseFloat(metal.making_charge_amount || 0);
    } else {
      metalBaseAmount = parseFloat(netWeightAfterWastage * metalRate);
      metalBaseAmount +=
        parseFloat(metal.making_charge_amount || 0) +
        parseFloat(metal.stone_amount || 0) +
        parseFloat(metal.hallmark_charge || 0) +
        parseFloat(metal.rodium_charge || 0);
    }

    // set making charge amount
    if (makingChargeType == 6) {
      setMakingChargeAmount(
        (
          parseFloat(metal.making_charge_value) *
          parseFloat(netWeightAfterWastage || 0)
        ).toFixed(2)
      );
    } else if (makingChargeType == 7 || makingChargeType == 8) {
      setMakingChargeAmount(
        parseFloat(metal.making_charge_value || 0).toFixed(2)
      );
    } else if (makingChargeType == 9) {
      setMakingChargeAmount(
        parseFloat(
          isNaN(
            metal.making_charge_value *
              (rate / 100) *
              (netWeightAfterWastage || netWeight || 0)
          )
            ? 0
            : metal.making_charge_value *
                (rate / 100) *
                (netWeightAfterWastage || netWeight || 0)
        ).toFixed(2)
      );
    }

    // Calculate GST for metal
    const metalGst = metalBaseAmount * (parseFloat(metal.gst_perc) / 100);
    const metalNetAmount = metalBaseAmount + metalGst;

    // Stone calculations (already correct)
    const stoneWeight =
      parseFloat(stone.pieces) * parseFloat(stone.carat) * 0.2;
    const stoneBaseAmount = parseFloat(stone.stone_rate) * stoneWeight;
    const stoneGst = isNaN(stoneBaseAmount * (parseFloat(stone.gst_perc) / 100))
      ? 0
      : stoneBaseAmount * (parseFloat(stone.gst_perc) / 100);
    const stoneNetAmount = stoneBaseAmount + stoneGst;

    console.log("stoneNetAmount", stoneNetAmount);
    // Total price
    const totalPrice = (metalNetAmount || 0) + (stoneNetAmount || 0);
    console.log("totalPrice", totalPrice);

    const priceDetails = {
      total_price: totalPrice.toFixed(2),
      metal_calculation: {
        net_weight: netWeight,
        wastage_weight: wastageWeight,
        net_weight_after_wastage: netWeightAfterWastage,
        base_amount: metalBaseAmount,
        gst_amount: metalGst,
        net_amount: metalNetAmount,
        mc: makingChargeAmount,
        total_amount: metalNetAmount + stoneNetAmount,
        gst_perc: gstPercent
      },
      stone_calculation: {
        stone_weight: stoneWeight,
        base_amount: stoneBaseAmount,
        gst_amount: stoneGst,
        net_amount: stoneNetAmount,
        gst_perc: stoneGSTPercent,
        mc: makingChargeAmount,
        total_amount: stoneNetAmount + makingChargeAmount,
        wastage_weight: wastageWeight,
        wastage_prec: wastagePercent,
        net_weight_after_wastage: netWeightAfterWastage,
        net_weight: netWeight
      },
    };
    setProductAmountData(priceDetails);
    return priceDetails;
  };

  const handleMakingChargeValueChange = (e) => {
    const value = e.target.value;
    setMakingChargeValue(value);

    if (makingChargeType == 6) {
      setMakingChargeAmount(
        (parseFloat(value) * parseFloat(netWeightAfterWastage || 0)).toFixed(2)
      );
    } else if (makingChargeType == 7 || makingChargeType == 8) {
      setMakingChargeAmount(parseFloat(value || 0).toFixed(2));
    } else if (makingChargeType == 9) {
      setMakingChargeAmount(
        parseFloat(
          value * (rate / 100) * (netWeightAfterWastage || netWeight || 0)
        ).toFixed(2)
      );
    }
  };

  const handlePurityChange = (e) => {
    setPurity(e.target.value);
  };

  useEffect(() => {
    const metalInfo = {
      gross_wt: grossWeight,
      stone_wt: stoneWeight,
      wastage_prec: wastagePercent,
      making_charge_type: makingChargeType,
      making_charge_value: makingChargeValue,
      stone_amount: stoneAmount,
      hallmark_charge: hallmarkCharge,
      rodium_charge: rodiumCharge,
      gst_perc: gstPercent,
      quality: purity,
      quality_name: qualityName,
      making_charge_amount: makingChargeAmount,
    };

    const stoneInfo = {
      pieces: stonePieces,
      carat: stoneCarat,
      stone_rate: stoneRate,
      gst_perc: stoneGSTPercent,
    };

    setMakingChargeAmount(makingChargeAmount);

    const priceDetails = calculateTotalPrice(metalInfo, stoneInfo);
    setStoneTotalAmount(
      parseFloat(
        isNaN(priceDetails.stone_calculation.net_amount)
          ? 0
          : priceDetails.stone_calculation.net_amount
      )
    );
    setTotalAmount(
      parseFloat(isNaN(priceDetails.total_price) ? 0 : priceDetails.total_price)
    );
  }, [
    grossWeight,
    stoneWeight,
    wastagePercent,
    makingChargeType,
    makingChargeValue,
    stoneAmount,
    hallmarkCharge,
    rodiumCharge,
    gstPercent,
    purity,
    stonePieces,
    stoneCarat,
    stoneRate,
    stoneGSTPercent,
    netWeightAfterWastage,
    rate,
    makingChargeAmount,
  ]);

  useEffect(() => {
    let selectedOption;
    if (metalType === "gold") {
      selectedOption = dropdownValues?.[0]?.customization_fields
        .find((field) => field.name === "gold_quality")
        ?.property_value.find((opt) => opt.name === purity)?.name;
    } else if (metalType === "silver") {
      selectedOption = dropdownValues?.[1]?.customization_fields
        .find((field) => field.name === "silver_quality")
        ?.property_value.find((opt) => opt.name === purity)?.name;
    }

    setQualityName(selectedOption);

    if (selectedOption) {
      const rateKey = selectedOption === "silver22" ? "silver" : selectedOption;
      setRate(rates[rateKey] || 0);
    }
  }, [metalType, purity]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    Promise.all([
      axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/customization/all.php?type=product_add_template`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/all.php?type=category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/jewelleryInventory/jewellryInventory.php?type=get_latest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    ])
      .then(([dropdownResponse, categoriesResponse, ratesResponse]) => {
        setDropdownValues(dropdownResponse.data.response);
        console.log(
          "dropdownResponse.data.response",
          dropdownResponse.data.response
        );
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
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/customization/field/all.php`,
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
          `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/customization/option/all.php?customization_field=${selectedCustomizationTypeId}`,
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

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setVideo(file);
    } catch (error) {
      console.error("Error handling video:", error);
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleProductSave = async () => {
    try {
      // First save the product details
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
        quantity: inventoryQty || 1,
        tags: tags || "",
        discount_perc: discount || "0",
        metal: {
          metal: metalType || "",
          quality: qualityName || "",
          quantity: quantity || "0",
          gross_wt: grossWeight || "0",
          stone_wt: stoneWeight || "0",
          net_wt: netWeight || "0",
          wastage_prec: wastagePercent || "0",
          wastage_wt: wastageWeight || "0",
          net_wt_after_wastage: netWeightAfterWastage || "0",
          making_charge_type: makingChargeType || "0",
          making_charge_value: makingChargeValue || "0",
          making_charge_amount: makingChargeAmount || "0",
          stone_amount: stoneAmount || "0",
          hallmark_charge: hallmarkCharge || "0",
          rodium_charge: rodiumCharge || "0",
          gst_perc: gstPercent || "0",
        },
        stone: {
          stone_type: stoneType || "",
          color: stoneColor || "",
          clarity: stoneClarity || "",
          cut: stoneCut || "0",
          pieces: stonePieces || "0",
          carat: stoneCarat || "0",
          stone_wt: stoneInternalWeight || "0",
          stone_rate: stoneRate || "0",
          gst_perc: stoneGSTPercent || "0",
        },
      };

      const productResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/addProduct.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const productId = productResponse.data.response.id;

      // Then upload all images and video
      const uploadPromises = [];

      // Upload images
      images.forEach((image, index) => {
        const imageFormData = new FormData();
        imageFormData.append("type", "infographics");
        imageFormData.append("product", productId);
        imageFormData.append("is_primary", index === 0 ? true : false);
        imageFormData.append("file_type", "img");
        imageFormData.append("file", image);

        uploadPromises.push(
          axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/add.php`,
            imageFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
        );
      });

      // Upload video if exists
      if (video) {
        const videoFormData = new FormData();
        videoFormData.append("type", "infographics");
        videoFormData.append("product", productId);
        videoFormData.append("is_primary", false);
        videoFormData.append("file_type", "vid");
        videoFormData.append("file", video);

        uploadPromises.push(
          axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/add.php`,
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

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      toast.success("Product saved successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error saving product:", error);
      setLoading(false);
      toast.error("Error saving product. Please try again.");
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const selectedCategory = categoriesData.find(
      (category) => category.id === categoryId
    );
    setSelectedCategory(categoryId);

    if (selectedCategory) {
      const hsn = hsnMapping[selectedCategory.name];
      console.log("hsn", hsn);
      setHsnCode(hsn || "");
      setMetalType(typeMapping[selectedCategory.name] || "");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentImage(reader.result);
        setCurrentImageIndex(images.length); // Set to new image index
      };
      reader.readAsDataURL(file);
      return file;
    });

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const startCropImage = (index) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCurrentImage(reader.result);
      setCurrentImageIndex(index);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCropDialogOpen(true);
    };
    reader.readAsDataURL(images[index]);
  };

  const getCroppedImage = async () => {
    try {
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.src = currentImage;

      await new Promise((resolve) => {
        image.onload = resolve;
      });

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        const newImages = [...images];
        if (currentImageIndex === images.length) {
          // New image
          newImages.push(blob);
        } else {
          // Replacing existing image
          newImages[currentImageIndex] = blob;
        }
        setImages(newImages);
        setCropDialogOpen(false);
        setCurrentImage(null);
        setCurrentImageIndex(null);
      }, "image/jpeg");
    } catch (e) {
      console.error("Error cropping image:", e);
      setCropDialogOpen(false);
      setCurrentImage(null);
      setCurrentImageIndex(null);
    }
  };

  return (
    <div className="AddNewProduct">
      <PriceBreakout open={showPriceBreakout} data={productAmountData} rates={rates} onClose={() => setShowPriceBreakout(false)} />
      <ToastContainer />

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#fff",
            fontFamily: '"Roboto", sans-serif',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#a36e29",
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          Confirm Save
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: "#333",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Are you sure you want to save this product?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setLoading(false);
              setConfirmDialogOpen(false);
            }}
            sx={{
              color: "#666",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setConfirmDialogOpen(false);
              handleProductSave();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#a36e29",
              fontFamily: '"Roboto", sans-serif',
              "&:hover": {
                backgroundColor: "#8b5d23",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Image Dialog */}
      <Dialog
        open={showDeleteImageDialog}
        onClose={() => setShowDeleteImageDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#fff",
            fontFamily: '"Roboto", sans-serif',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#a36e29",
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: "#333",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Are you sure you want to delete this image?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowDeleteImageDialog(false);
            }}
            sx={{
              color: "#666",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteImage(deleteImageIndex);
              setShowDeleteImageDialog(false);
            }}
            variant="contained"
            sx={{
              backgroundColor: "#a36e29",
              fontFamily: '"Roboto", sans-serif',
              "&:hover": {
                backgroundColor: "#8b5d23",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Video Dialog */}
      <Dialog
        open={showDeleteVideoDialog}
        onClose={() => setShowVideoDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#fff",
            fontFamily: '"Roboto", sans-serif',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#a36e29",
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: "#333",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Are you sure you want to delete this video?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowVideoDeleteDialog(false);
            }}
            sx={{
              color: "#666",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setVideo(null);
              setShowVideoDeleteDialog(false);
            }}
            variant="contained"
            sx={{
              backgroundColor: "#a36e29",
              fontFamily: '"Roboto", sans-serif',
              "&:hover": {
                backgroundColor: "#8b5d23",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Heading */}
      <div
        className="head"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div className="head-txt">Add New Product</div>
        <div className="btns">
          <Button className="button1" onClick={() => navigate("/products")}>
            Cancel
          </Button>
          <Button
            className="button2"
            onClick={() => {
              setLoading(true);
              setConfirmDialogOpen(true);
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Save"
            )}
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
                    id="imageInput"
                    multiple
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
                          onClick={() => {
                            setDeleteImageIndex(index);
                            setShowDeleteImageDialog(true);
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <Button
                          variant="contained"
                          onClick={() => startCropImage(index)}
                          size="small"
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          Crop
                        </Button>
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
                    onChange={(e) => {
                      const file = e.target.files[0];
                      // if (file && file.size > 10 * 1024 * 1024) {
                      //   // 10MB in bytes
                      //   toast.error("Video size exceeds 10MB limit");
                      //   e.target.value = null; // Clear the input
                      //   return;
                      // }
                      handleVideoChange(e);
                    }}
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
                        onClick={() => setShowVideoDeleteDialog(true)}
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

        {/* Image Cropping Dialog */}
        <Dialog
          open={cropDialogOpen}
          onClose={() => setCropDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Crop Image</DialogTitle>
          <DialogContent>
            <div style={{ position: "relative", height: "400px" }}>
              {currentImageIndex !== null && (
                <Cropper
                  image={currentImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCropDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={getCroppedImage}
              variant="contained"
              color="primary"
            >
              Crop
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>

      {/* Product basic details input */}
      <ThemeProvider theme={theme}>
        <Paper elevation={3} className="detail-paper">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="heading">Product Details</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "20px" }}>
                <div>Metal Rate</div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {rate.toFixed(2)}
                </div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <div>Metal Amount</div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {amount.toFixed(2)}
                </div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <div>Stone Amount</div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {parseFloat(stoneTotalAmount).toFixed(2)}
                </div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <div>Total Amount</div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {parseFloat(totalAmount).toFixed(2)}
                </div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <div>Discount %</div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  <TextField
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    fullWidth
                    placeholder="Enter discount"
                    style={{ width: "100px" }}
                    InputProps={{
                      style: {
                        padding: "4px",
                      },
                    }}
                  />
                </div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <Button variant="contained" color="primary" onClick={() => setShowPriceBreakout(true)}>Price Breakout</Button>
              </div>
            </div>
          </div>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <div className="label">Tags</div>
              <FormControl fullWidth>
                <TextField
                  name="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  fullWidth
                  placeholder="Enter Tags"
                  inputProps={{ min: 0 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document
                        .querySelector(".quill-container .ql-editor")
                        ?.focus();
                    }
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1.5}>
              <div className="label">Product Name</div>
              <FormControl fullWidth>
                <TextField
                  name="Name"
                  value={productName}
                  onChange={(e) =>
                    setProductName(
                      e.target.value
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    )
                  }
                  fullWidth
                  placeholder="Enter name"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document
                        .querySelector('select[name="category"]')
                        ?.focus();
                    }
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1}>
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
            <Grid item xs={1}>
              <div className="label">Sub-Cat.</div>
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
            <Grid item xs={1}>
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
            <Grid item xs={1}>
              <div className="label">HSN</div>
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
                      <MenuItem
                        key={option.name}
                        value={option.name
                          .replace(/\n/g, "")
                          .replace(/&NoBreak;/g, "")}
                      >
                        {option.display_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <div className="label">Quantity</div>
              <FormControl fullWidth>
                <TextField
                  name="quantity"
                  type="number"
                  value={inventoryQty}
                  onChange={(e) =>
                    setInventoryQty(parseInt(e.target.value) || 0)
                  }
                  fullWidth
                  placeholder="Enter Quantity of Products"
                  inputProps={{ min: 0 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document
                        .querySelector(".quill-container .ql-editor")
                        ?.focus();
                    }
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4.5}>
              <div className="label">Description</div>
              <TextField
                multiline
                rows={1}
                fullWidth
                placeholder="Product Description"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <div className="label">Metal Details</div>
            </Grid>
            <Grid item xs={1.5}>
              <div className="label">Type</div>
              <FormControl fullWidth>
                <Select
                  name="metalType"
                  value={metalType}
                  onChange={(e) => {
                    setMetalType(e.target.value);
                    setMakingChargeType(9);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document.querySelector('select[name="purity"]')?.focus();
                    }
                  }}
                >
                  <MenuItem value="gold">Gold</MenuItem>
                  <MenuItem value="silver">Silver</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1.5}>
              <div className="label">Purity</div>
              <FormControl fullWidth>
                <Select
                  name="purity"
                  value={purity}
                  onChange={handlePurityChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document.querySelector('input[name="quantity"]')?.focus();
                    }
                  }}
                >
                  {metalType === "gold" &&
                    dropdownValues?.[0]?.customization_fields
                      .find((field) => field.name === "gold_quality")
                      ?.property_value.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                          {option.display_name}
                        </MenuItem>
                      ))}
                  {metalType === "silver" &&
                    dropdownValues?.[1]?.customization_fields
                      .find((field) => field.name === "silver_quality")
                      ?.property_value.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                          {option.display_name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1.5}>
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
            <Grid item xs={1.5}>
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
            <Grid item xs={1.5}>
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
                        .querySelector('input[name="makingChargeType"]')
                        ?.focus();
                    }
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1.5}>
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
            <Grid item xs={1.5}>
              <div className="label">Wastage %</div>
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
            <Grid item xs={1.5}>
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
            <Grid item xs={1.5}>
              <div className="label">Net New Wt.</div>
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
            <Grid item xs={1.5}>
              <div className="label">MC Type</div>
              <FormControl fullWidth>
                <Select
                  name="makingChargeType"
                  value={makingChargeType}
                  onChange={(e) => {
                    console.log(e.target.value);
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
            <Grid item xs={1.5}>
              <div className="label">MC</div>
              <FormControl fullWidth>
                <TextField
                  name="makingChargeValue"
                  type="number"
                  value={makingChargeValue}
                  onChange={handleMakingChargeValueChange}
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
            <Grid item xs={1.5}>
              <div className="label">MC Amt.</div>
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
            <Grid item xs={1.5}>
              <div className="label">Stone Amt.</div>
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
            <Grid item xs={1.5}>
              <div className="label">Hallmark Amt.</div>
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
            <Grid item xs={1.5}>
              <div className="label">Rodium|Cert. Cg.</div>
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
            <Grid item xs={1.5}>
              <div className="label">GST</div>
              <FormControl fullWidth>
                <Select
                  name="gstPercent"
                  value={gstPercent}
                  onChange={(e) => {
                    console.log("GST Percent changed:", e.target.value);
                    setGstPercent(e.target.value);
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
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <div className="label">Stone Details</div>
            </Grid>
            <Grid item xs={1.33}>
              <div className="label">Type</div>
              <FormControl fullWidth>
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
            <Grid item xs={1.33}>
              <div className="label">Color</div>
              <FormControl fullWidth>
                <Select
                  name="stoneColor"
                  value={stoneColor}
                  onChange={(e) => setStoneColor(e.target.value)}
                >
                  {dropdownValues?.[0]?.customization_fields
                    .find((field) => field.name === "color")
                    ?.property_value.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.display_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1.33}>
              <div className="label">Clarity</div>
              <FormControl fullWidth>
                <Select
                  name="stoneClarity"
                  value={stoneClarity}
                  onChange={(e) => setStoneClarity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document.querySelector('input[name="stoneCut"]')?.focus();
                    }
                  }}
                >
                  {dropdownValues?.[0]?.customization_fields
                    .find((field) => field.name === "clarity")
                    ?.property_value.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.display_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1.33}>
              <div className="label">Cut</div>
              <FormControl fullWidth>
                <Select
                  name="stoneCut"
                  value={stoneCut}
                  onChange={(e) => setStoneCut(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document
                        .querySelector('input[name="stonePieces"]')
                        ?.focus();
                    }
                  }}
                >
                  {dropdownValues?.[0]?.customization_fields
                    .find((field) => field.name === "cut")
                    ?.property_value.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.display_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1.33}>
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
            <Grid item xs={1.33}>
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
            <Grid item xs={1.33}>
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
            <Grid item xs={1.33}>
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
            <Grid item xs={1.33}>
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
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default AddNewProduct;
