import { Delete, PhotoCamera, VideoCameraFront } from "@mui/icons-material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
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
  Switch,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generalToastStyle } from "../../utils/toast.styles";
import "./addNewProduct.styles.scss";
import PriceBreakout from "./priceBreakout.component";
import AddVariant from "./addVariant.component";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  "SILVER ARTICLES": "silver",
};

const purityMapping = {
  "GOLD JEWELLERY": "gold22",
  "SILVER ARTICLES": "silver22",
  "SILVER JEWELLERY": "silver22",
};

const mcTypeMapping = {
  "GOLD JEWELLERY": 9,
  "SILVER ARTICLES": 6,
  "SILVER JEWELLERY": 6,
};

/* 
Delete Image Types
1. Existing Image
2. New Image
*/

const EditProduct = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const productNameQuery = searchParams.get("name");
  const hash = searchParams.get("hash");

  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const [desc, setDesc] = useState();
  const [purity, setPurity] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [dropdownValues, setDropdownValues] = useState();
  const [metalType, setMetalType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [grossWeight, setGrossWeight] = useState();
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
  const [stoneType, setStoneType] = useState("");
  const [stoneClass, setStoneClass] = useState();
  const [stoneCut, setStoneCut] = useState("");
  const [stonePieces, setStonePieces] = useState();
  const [stoneCarat, setStoneCarat] = useState();
  const [stoneClarity, setStoneClarity] = useState("");
  const [stoneRate, setStoneRate] = useState();
  const [stoneInternalWeight, setStoneInternalWeight] = useState();
  const [stoneGSTPercent, setStoneGSTPercent] = useState("");
  const [qualityName, setQualityName] = useState();
  const [size, setSize] = useState();
  const [tags, setTags] = useState();
  const [hsnCode, setHsnCode] = useState("");
  const [inventoryQty, setInventoryQty] = useState(1);
  const [showVideoDeleteDialog, setShowVideoDeleteDialog] = useState(false);
  const [stoneColor, setStoneColor] = useState("");

  const [origImages, setOrigImages] = useState([]);
  const [images, setImages] = useState([]);
  const [origVideo, setOrigVideo] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoIndex, setVideoIndex] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState([]);
  const [igiLink, setIgiLink] = useState(null);
  const [bisCareLink, setBisCareLink] = useState(null);
  const [giaLink, setgiaLink] = useState(null);

  const [product, setProduct] = useState(null);

  // Crop related states
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [showDeleteImageDialog, setShowDeleteImageDialog] = useState(false);
  const [deleteImageIndex, setDeleteImageIndex] = useState();
  const [deleteImageType, setDeleteImageType] = useState();
  const [productName, setProductName] = useState(productNameQuery);
  const [discount, setDiscount] = useState(0);
  const fileInputRef = useRef(null);
  const [showPriceBreakout, setShowPriceBreakout] = useState(false);
  const [productAmountData, setProductAmountData] = useState(null);
  const [adminCommissionPerc, setAdminCommissionPerc] = useState(0);
  const [settlementAmount, setSettlementAmount] = useState(0);
  const [selectedImage, setSelectedImage] = useState([]);
  const [imageDescriptions, setImageDescriptions] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [finalDescription, setFinalDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false); // Modal open state
  const [useNewPromptProductName, setUseNewPromptProductName] = useState(false);
  const [productNameFromPrompt, setProductNameFromPrompt] = useState("");
  const [sellerAIAssist, setSellerAIAssist] = useState(0);
  const [variants, setVariants] = useState([]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileUpload = async (event, setLink) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/uploadDoc/uploadDoc.php`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setLink(data.file_location); // Set uploaded file URL
      } else {
        alert('File upload failed: ' + data.message);
      }
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    }
  };


  const removeVariant = async (index) => {
    // api call to remove variant
    if (variants[index].id) {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/deleteVariant.php`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id: variants[index].id, key: "variant" }
        }
      );

      if (response.data.status === 1) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    }
    setVariants((prevVariants) => prevVariants.filter((_, i) => i !== index));
  };

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

  const mapProductVariants = (productVariants) => {
    return productVariants.map((variant) => {

      // Decode HTML entities and parse JSON
      const metalInfo = variant.customization.metal_info
        ? JSON.parse(variant.customization.metal_info.replace(/\\&quot;/g, '"').replace(/\\(["{}:,[\]])/g, '$1'))
        : {};

      const stoneInfo = variant.customization.stone_info
        ? JSON.parse(variant.customization.stone_info.replace(/\\&quot;/g, '"').replace(/\\(["{}:,[\]])/g, '$1'))
        : {};

      // Map to your state structure
      return {
        id: variant.id,
        productId: variant.product_id,
        name: variant.name,
        tag: variant.tag,
        size: variant.size,
        weight: variant.weight,
        type: variant.type,
        price: variant.price,
        stock: variant.stock,
        metalType: metalInfo?.metal,
        quantity: variant.stock,
        purity: metalInfo.quality,
        grossWeight: metalInfo.gross_wt,
        stoneWeight: metalInfo.stone_wt,
        netWeight: metalInfo.net_wt,
        wastagePercent: metalInfo.wastage_prec,
        wastageWeight: metalInfo.wastage_wt,
        netWeightAfterWastage: metalInfo.net_wt_after_wastage,
        makingChargeType: metalInfo.making_charge_type,
        makingChargeValue: metalInfo.making_charge_value,
        makingChargeAmount: metalInfo.making_charge_amount,
        stoneAmount: metalInfo.stone_amount,
        hallmarkCharge: metalInfo.hallmark_charge,
        rodiumCharge: metalInfo.rodium_charge,
        gstPercent: metalInfo.gst_perc,
        stoneType: stoneInfo.stone_type,
        stoneColor: stoneInfo.color,
        stoneClarity: stoneInfo.clarity,
        stoneCut: stoneInfo.cut,
        stonePieces: stoneInfo.pieces,
        stoneCarat: stoneInfo.carat,
        stoneRate: stoneInfo.stone_rate,
        stoneInternalWeight: stoneInfo.stone_wt,
        stoneGSTPercent: stoneInfo.gst_perc,
      };
    });
  };



  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/details.php?name=${productName}&hash=${hash}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const productData = response.data.response;
      setProduct(productData);

      const sortedImages = productData?.images?.sort((a, b) =>
        a.file.localeCompare(b.file)
      );
      setOrigImages(sortedImages);
      setCurrentImageUrl(
        sortedImages?.map(
          (image) =>
            `${process.env.REACT_APP_API_BASE_URL}/assets/${image.file}`
        )
      );
      if (typeof productData.video !== "string") {
        setOrigVideo(productData.video);
      }
      setBisCareLink(productData.BIS || "")
      setIgiLink(productData.IGI || "")
      setgiaLink(productData.GIA || "")
      const category = categoriesData.find(
        (cat) => cat.name === productData.category
      );
      setSelectedCategory(category ? category.id : "");

      const subcategory = category?.sub_categories.find(
        (subcat) => subcat.name === productData.sub_category
      );
      setSelectedSubcategory(
        subcategory ? `${subcategory.id}_${subcategory.admin_comm_perc}` : ""
      );
      setAdminCommissionPerc(subcategory?.admin_comm_perc ?? 0);

      setSize(productData.size);
      setTags(productData.tags);

      const hsn = dropdownValues?.[0]?.customization_fields
        .find((field) => field.name === "hsn")
        ?.property_value.find((option) => option.name === productData.hsn);

      setHsnCode("Gold Jewelry - 7113");

      setInventoryQty(productData.quantity);

      let cleanedDesc = productData.description
        ? productData.description.replace(/<\/?[^>]+(>|$)/g, "").trim()
        : "";

      setDesc(cleanedDesc);
      setFinalDescription(cleanedDesc); // Ensure input field updates correctly

      // metal details
      setGrossWeight(productData.customizations[0]?.metal_info?.gross_wt);
      setStoneWeight(productData.customizations[0]?.metal_info?.stone_wt || 0);
      setNetWeight(productData.customizations[0]?.metal_info?.net_wt || 0);
      setWastagePercent(
        productData.customizations[0]?.metal_info?.wastage_prec || 0
      );
      setMetalType(productData.customizations[0]?.metal_info?.metal);
      setPurity(productData.customizations[0]?.metal_info?.quality);

      // Set the rate based on quality/purity
      const metalQuality = productData.customizations[0]?.metal_info?.quality;
      if (metalQuality) {
        const rateKey = metalQuality.toLowerCase();
        setRate(rates[rateKey] || 0);
      }

      setWastageWeight(productData.customizations[0]?.metal_info?.wastage_wt);
      setNetWeightAfterWastage(
        productData.customizations[0]?.metal_info?.net_wt_after_wastage || 0
      );
      handleStoneWeightChangeValue();
      setMakingChargeValue(
        productData.customizations[0]?.metal_info?.making_charge_value
      );
      setMakingChargeAmount(
        productData.customizations[0]?.metal_info?.making_charge_amount
      );
      setStoneAmount(
        productData.customizations[0]?.metal_info?.stone_amount || 0
      );
      setHallmarkCharge(
        productData.customizations[0]?.metal_info?.hallmark_charge || 0
      );
      setRodiumCharge(
        productData.customizations[0]?.metal_info?.rodium_charge || 0
      );
      setGstPercent(productData.customizations[0]?.metal_info?.gst_perc || 3);
      //stone details
      setStoneType(productData.customizations[0]?.stone_info?.stone_type);
      setStoneClarity(productData.customizations[0]?.stone_info?.clarity);
      setStoneClass(productData.customizations[0]?.stone_info?.class);
      setStoneCut(productData.customizations[0]?.stone_info?.cut);
      setStonePieces(productData.customizations[0]?.stone_info?.pieces);
      setStoneCarat(productData.customizations[0]?.stone_info?.carat);
      setStoneRate(productData.customizations[0]?.stone_info?.stone_rate);
      setStoneColor(productData.customizations[0]?.stone_info?.color);
      setStoneInternalWeight(
        productData.customizations[0]?.stone_info?.stone_wt
      );
      setDiscount(productData.discount_perc);
      setStoneGSTPercent(productData.customizations[0]?.stone_info?.gst_perc);
      setVideoIndex(productData?.video?.id);
      setVideo(productData?.video?.file);

      // Set the variants from the product data
      const mappedVariants = mapProductVariants(productData.product_variants || []);
      setVariants(mappedVariants);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");

    // Find the category name from the categoriesData
    const category = categoriesData.find((cat) => cat.id === categoryId)?.name;

    // Set HSN code, type, and purity based on the category name
    if (category) {
      setHsnCode(hsnMapping[category] || "");
      setMetalType(typeMapping[category] || "");
      setPurity(purityMapping[category] || ""); // Set purity based on category
      setMakingChargeType(mcTypeMapping[category] || "");
      if (purityMapping[category] == "silver22") {
        setRate(rates["silver"] || 0);
      } else {
        setRate(rates[purityMapping[category]] || 0);
      }
      if (category === "GEMSTONE") {
        setStoneGSTPercent(3);
      } else {
        setStoneGSTPercent("");
      }
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
    setSelectedImage(files);
  };

  const handleGenerateSubmit = async (e) => {
    e.preventDefault();
    if (
      (!selectedImage || selectedImage.length === 0) &&
      origImages?.length === 0
    ) {
      alert("Please select at least one image");
      return;
    }

    const metaData = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      purity: purity,
      metal: metalType,
      stone: stoneType,
      stone_color: stoneColor,
      stone_clarity: stoneClarity,
      stone_cut: stoneCut,
      stone_pieces: stonePieces,
      stone_carat: stoneCarat,
    };
    const formData = new FormData();
    // Append each selected image to formData
    selectedImage.forEach((image) => {
      formData.append("images[]", image);
    });

    formData.append("meta_data", JSON.stringify(metaData));

    formData.append("image_url", JSON.stringify(currentImageUrl));

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/prompt/upload.php",

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Ensure response contains expected fields
      // const productName = response.data?.product_name ?? "";
      let productName = response.data?.productName ?? "";

      // Remove surrounding quotes if they exist
      productName = productName.replace(/^"(.*)"$/, "$1");
      // alert(productName);
      setProductNameFromPrompt(productName);
      const descriptions = response.data?.descriptions ?? [];
      // alert(descriptions);

      if (response.data.error) {
        // alert(response.data.error);
        setProductName(""); // Reset in case of errors
        setImageDescriptions([]); // Reset in case of errors
      } else {
        setImageDescriptions(descriptions);
        setSelectedDescription(descriptions.length > 0 ? descriptions[0] : "");
        setOpenDescriptionModal(true); // Open modal with descriptions
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenDescriptionModal(false); // Close modal
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // // Check file size
    // if (file.size > 10 * 1024 * 1024) {
    //   toast.error("Video size exceeds 10MB limit");
    //   e.target.value = null; // Clear the input
    //   return;
    // }

    // Set the video directly without creating a new Blob
    setVideo(file);
    fileInputRef.current.value = null;
  };

  const deleteExistingImage = async (index) => {
    let deleteImage = origImages[index];

    await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/add.php`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          type: "infographics",
          infographics_id: deleteImage.id,
        },
      }
    );

    toast("Image deleted successfully", generalToastStyle);

    fetchProduct();
  };

  const deleteExistingVideo = async () => {
    let deleteVideo = origVideo;
    if (deleteVideo !== null) {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/add.php`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            type: "infographics",
            infographics_id: deleteVideo.id,
          },
        }
      );
    }

    toast("Video deleted successfully", generalToastStyle);

    setVideo(null);
    setOrigVideo(null);
    fetchProduct();
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
        id: productId,
        type: "update_item",
        category: selectedCategory || "",
        sub_category: selectedSubcategory.split("_")[0] || "",
        name: productName || "",
        desc: (finalDescription || "").replace(/^\d+\.\s*/, ""),
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
          quantity: quantity || "0",
          quality: purity || "",
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
          cut: stoneCut || "",
          pieces: stonePieces || "0",
          carat: stoneCarat || "0",
          stone_wt: stoneInternalWeight || "0",
          stone_rate: stoneRate || "0",
          gst_perc: stoneGSTPercent || "0",
        },
        igiLink: igiLink || "",
        bisCareLink: bisCareLink || "",
        giaLink: giaLink || ""
      };

      const productResponse = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/update.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update variants after product save
      await updateVariants();

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
        imageFormData.append("display_order", index);

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
      toast.error("Error saving product. " + error.response.data.message);
    }
  };

  const updateVariants = async () => {
    const variantPromises = variants.map(async (variant) => {
      console.log("update variant", variant)
      const variantData = {
        id: variant.id, // Check if this exists to determine the endpoint
        product_id: productId,
        type: "update_item",
        action: "variant",
        name: variant.name,
        quantity: variant.quantity,
        tags: variant.tags,
        metal: {
          metal: variant.metalType || "",
          quantity: variant.quantity || 1,
          quality: variant.purity || "",
          gross_wt: variant.grossWeight || "",
          stone_wt: variant.stoneWeight || "",
          net_wt: variant.netWeight || "0",
          wastage_prec: variant.wastagePercent || "",
          wastage_wt: variant.wastageWeight || "0",
          net_wt_after_wastage: variant.netWeightAfterWastage || "",
          making_charge_type: variant.makingChargeType || 9,
          making_charge_value: variant.makingChargeValue || "0",
          making_charge_amount: variant.makingChargeAmount || "0.00",
          stone_amount: variant.stoneAmount || "0",
          hallmark_charge: variant.hallmarkCharge || "0",
          rodium_charge: variant.rodiumCharge || "0",
          gst_perc: variant.gstPercent || 0,
        },
        stone: {
          stone_type: variant.stoneType || "",
          color: variant.stoneColor || "",
          clarity: variant.stoneClarity || "",
          cut: variant.stoneCut || "0",
          pieces: variant.stonePieces || "0",
          carat: variant.stoneCarat || "0",
          stone_wt: variant.stoneWeight || "0",
          stone_rate: variant.stoneRate || "0",
          gst_perc: variant.stoneGSTPercent || "0",
        },
      };

      // Check if variant.id exists to determine the correct endpoint
      if (variant.id) {
        return axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/updateVariant.php`,
          variantData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // console.log("add variant data", variantData);
        return axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/addVariants.php`,
          variantData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
    });

    await Promise.all(variantPromises);
    toast.success("Variants updated successfully!");
  };

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
        setDropdownValues(() => dropdownResponse.data.response || []);
        const categories = categoriesResponse.data.response || [];
        setCategoriesData(() => categories);
        setRates(ratesResponse.data.response?.jewelry_prices || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [dropdownValues]);

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
    calculateMakingChargeAmount();
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

  useEffect(() => {
    if (stoneInternalWeight && stoneRate) {
      const baseStoneAmount =
        parseFloat(stoneInternalWeight) * parseFloat(stoneRate);
      let totalStoneAmount = baseStoneAmount;

      // Add GST if present
      if (stoneGSTPercent) {
        totalStoneAmount +=
          (baseStoneAmount * parseFloat(stoneGSTPercent)) / 100;
      }

      setStoneTotalAmount(totalStoneAmount.toFixed(2));
    } else {
      setStoneTotalAmount(0);
    }
  }, [stoneInternalWeight, stoneRate, stoneGSTPercent]);

  const handlePurityChange = (e) => {
    setPurity(e.target.value);

    let selectedOption;
    if (metalType === "gold") {
      selectedOption = dropdownValues?.[0]?.customization_fields
        .find((field) => field.name === "gold_quality")
        ?.property_value.find((opt) => opt.name === e.target.value)?.name;
    } else if (metalType === "silver") {
      selectedOption = dropdownValues?.[1]?.customization_fields
        .find((field) => field.name === "silver_quality")
        ?.property_value.find((opt) => opt.name === e.target.value)?.name;
    }

    setQualityName(selectedOption);

    if (selectedOption) {
      const rateKey = selectedOption === "silver22" ? "silver" : selectedOption;
      setRate(rates[rateKey] || 0);
    }
  };

  const handleMetalTypeChange = (e) => {
    setMetalType(e.target.value);
    setMakingChargeType(""); // Reset making charge type when metal type changes
    setPurity(""); // Reset purity when metal type changes
    setRate(0); // Reset rate when metal type changes
  };

  const getSellerAIAssist = () => {
    let data = new FormData();

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/all.php?type=seller_details`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const aiAssistValue = response?.data?.response?.organization?.ai_assist;
        setSellerAIAssist(Number(aiAssistValue)); // Convert to number explicitly
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateMakingChargeAmount = () => {
    if (makingChargeType === 6) {
      setMakingChargeAmount(
        (
          parseFloat(makingChargeValue) * parseFloat(netWeightAfterWastage || 0)
        ).toFixed(2)
      );
    } else if (makingChargeType === 7 || makingChargeType === 8) {
      setMakingChargeAmount(parseFloat(makingChargeValue || 0).toFixed(2));
    } else if (makingChargeType === 9) {
      setMakingChargeAmount(
        parseFloat(
          makingChargeValue *
          (rate / 100) *
          (netWeightAfterWastage || netWeight || 0)
        ).toFixed(2)
      );
    }
  };

  const handleGrossWeightChange = (e) => {
    const newGrossWeight = e.target.value;
    setGrossWeight(newGrossWeight);
    const newNetWeight = newGrossWeight - stoneWeight;
    setNetWeight(newNetWeight);
    const newWastageWeight = newNetWeight * (wastagePercent / 100);
    setWastageWeight(newWastageWeight);
    const newNetWeightAfterWastage = newNetWeight + newWastageWeight;
    setNetWeightAfterWastage(newNetWeightAfterWastage);

    calculateMakingChargeAmount();
  };

  const handleStoneWeightChange = (e) => {
    const newStoneWeight = e.target.value;
    setStoneWeight(newStoneWeight);
    const newNetWeight = grossWeight - newStoneWeight;
    setNetWeight(newNetWeight);
    const newWastageWeight = newNetWeight * (wastagePercent / 100);
    setWastageWeight(newWastageWeight);
    const newNetWeightAfterWastage = newNetWeight + newWastageWeight;
    setNetWeightAfterWastage(newNetWeightAfterWastage);

    calculateMakingChargeAmount();
  };

  const handleStoneWeightChangeValue = () => {
    const newNetWeight = grossWeight - stoneWeight;
    setNetWeight(newNetWeight);
    const newWastageWeight = newNetWeight * (wastagePercent / 100);
    setWastageWeight(newWastageWeight);
    const newNetWeightAfterWastage = newNetWeight + newWastageWeight;
    setNetWeightAfterWastage(newNetWeightAfterWastage);
  };

  const handleWastagePercentChange = (e) => {
    const newWastagePercent = e.target.value;
    setWastagePercent(newWastagePercent);
    const newWastageWeight = netWeight * (newWastagePercent / 100);
    setWastageWeight(newWastageWeight);
    const newNetWeightAfterWastage = netWeight + newWastageWeight;
    setNetWeightAfterWastage(newNetWeightAfterWastage);

    calculateMakingChargeAmount();
  };

  const handleMakingChargeValueChange = (e) => {
    setMakingChargeValue(e.target.value);
    calculateMakingChargeAmount();
  };

  const calculateTotalPrice = (metalInfo, stoneInfo) => {
    const metal =
      typeof metalInfo === "string" ? JSON.parse(metalInfo) : metalInfo;
    const stone =
      typeof stoneInfo === "string" ? JSON.parse(stoneInfo) : stoneInfo;

    const metalRate = rates[metal.quality] || 0;

    // Calculate net weight
    const netWeight = parseFloat(metal.gross_wt) - parseFloat(metal.stone_wt);

    const wastageWeight = netWeight * (parseFloat(metal.wastage_prec) / 100);

    const netWeightAfterWastage = netWeight + wastageWeight;

    // Calculate metal base amount
    let metalBaseAmount;
    if (metal.making_charge_type === "8") {
      metalBaseAmount = parseFloat(metal.making_charge_amount);
    } else {
      metalBaseAmount = netWeightAfterWastage * metalRate;
      metalBaseAmount +=
        parseFloat(metal.making_charge_amount) +
        parseFloat(metal.stone_amount || 0) +
        parseFloat(metal.hallmark_charge || 0) +
        parseFloat(metal.rodium_charge || 0);
    }

    // Calculate GST for metal
    const metalGst = metalBaseAmount * (parseFloat(metal.gst_perc) / 100);

    const metalNetAmount = metalBaseAmount + metalGst;

    // Stone calculations (already correct)
    const stoneWeight =
      parseFloat(stone.pieces) * parseFloat(stone.carat) * 0.2;

    const stoneBaseAmount = parseFloat(stone.stone_rate) * stone.carat;

    const stoneGst = stoneBaseAmount * (parseFloat(stone.gst_perc) / 100);

    const stoneNetAmount = stoneBaseAmount + stoneGst;

    // Total price
    const totalPrice = metalNetAmount + stoneNetAmount;

    return {
      total_price: totalPrice.toFixed(2),
      admin_commission_perc: adminCommissionPerc,
      metal_calculation: {
        net_weight: netWeight,
        wastage_weight: wastageWeight,
        net_weight_after_wastage: netWeightAfterWastage,
        base_amount: metalBaseAmount,
        gst_amount: metalGst,
        net_amount: metalNetAmount,
        mc: metal.making_charge_amount,
        gst_perc: metal.gst_perc,
      },
      stone_calculation: {
        stone_weight: stoneWeight,
        base_amount: stoneBaseAmount,
        gst_amount: stoneGst,
        net_amount: stoneNetAmount,
        gst_perc: stone.gst_perc,
      },
    };
  };

  useEffect(() => {
    if (product) {
      const metalInfo = {
        gross_wt: grossWeight,
        stone_wt: stoneWeight,
        wastage_prec: wastagePercent,
        making_charge_type: makingChargeType,
        making_charge_amount: makingChargeAmount,
        stone_amount: stoneAmount,
        hallmark_charge: hallmarkCharge,
        rodium_charge: rodiumCharge,
        gst_perc: gstPercent,
        quality: purity,
      };

      const stoneInfo = {
        pieces: stonePieces,
        carat: stoneCarat,
        stone_rate: stoneRate,
        gst_perc: stoneGSTPercent,
      };

      const priceDetails = calculateTotalPrice(metalInfo, stoneInfo);
      setProductAmountData(priceDetails);
      calculateMakingChargeAmount();
      // setAmount(parseFloat(priceDetails.metal_calculation.net_amount));
      setStoneTotalAmount(
        parseFloat(priceDetails.stone_calculation.net_amount)
      );
    }
  }, [
    grossWeight,
    stoneWeight,
    wastagePercent,
    makingChargeType,
    makingChargeAmount,
    stoneAmount,
    hallmarkCharge,
    rodiumCharge,
    gstPercent,
    purity,
    stonePieces,
    stoneCarat,
    stoneRate,
    stoneGSTPercent,
    product,
    adminCommissionPerc,
    settlementAmount,
  ]);

  useEffect(() => {
    getSellerAIAssist();
  }, []);

  const handleSettlementAmountChange = (value) => {
    setSettlementAmount(value);
  };

  useEffect(() => {
    calculateMakingChargeAmount();
  }, [
    makingChargeType,
    makingChargeValue,
    netWeightAfterWastage,
    netWeight,
    rate,
  ]);

  return (
    <div className="AddNewProduct">
      <PriceBreakout
        handleSettlementAmountChange={handleSettlementAmountChange}
        open={showPriceBreakout}
        data={productAmountData}
        rates={rates}
        onClose={() => setShowPriceBreakout(false)}
      />
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
          Confirm Update
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: "#333",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Are you sure you want to update this product?
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
            Update
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
              if (deleteImageType == 1) {
                deleteExistingImage(deleteImageIndex);
              } else {
                handleDeleteImage(deleteImageIndex);
              }
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
        open={showVideoDeleteDialog}
        onClose={() => setShowVideoDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this video?</Typography>
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
              deleteExistingVideo();
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
        <div className="head-txt">Edit Product</div>
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
              "Update"
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
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    multiple
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
                    {/* Display original images if they exist */}
                    {origImages &&
                      origImages !== "Product Infographics doesn't exist." &&
                      origImages?.map((image, index) => (
                        <div
                          key={index}
                          className="imagePreview"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/assets/${image.file}`}
                            alt={`Preview ${index + 1}`}
                          />
                          <IconButton
                            className="deleteButton"
                            onClick={() => {
                              setDeleteImageType(1);
                              setDeleteImageIndex(index);
                              setShowDeleteImageDialog(true);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </div>
                      ))}

                    {/* Display newly uploaded images */}
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="imagePreview"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={image ? URL.createObjectURL(image) : ""}
                          alt={`Preview ${index + 1}`}
                          style={{ marginBottom: "10px" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                        >
                          <IconButton
                            className="deleteButton"
                            onClick={() => {
                              setDeleteImageType(0);
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
                          >
                            Crop
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* Single Generate Button for all images */}
                    {/* {images.length > 0 && (
    <div style={{ marginTop: '30%', textAlign: 'center' }}>
      <Button
        variant="contained"
        size="small"
        type="submit"
        disabled={isLoading}
        onClick={handleGenerateSubmit}
      >
        {isLoading ? "Generating..." : "Generate"}
      </Button>
      {isLoading && <p className="text-center text-primary">Loading, please wait...</p>}
    </div>
  )} */}
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
                    ref={fileInputRef}
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
                          src={
                            video instanceof File
                              ? URL.createObjectURL(video)
                              : `${process.env.REACT_APP_API_BASE_URL}/assets/` +
                              video
                          }
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="heading">Product Details</div>
              {origImages && origImages.length > 0 && sellerAIAssist !== 0 && (
                <IconButton
                  color="primary"
                  onClick={handleGenerateSubmit}
                  disabled={isLoading}
                  size="small"
                >
                  {isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <AutoFixHighIcon />
                  )}
                </IconButton>
              )}
            </div>

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
                  {Number(amount).toFixed(2)}
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
                  {parseFloat(amount + stoneTotalAmount).toFixed(2)}
                </div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <div>Discount %</div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  <TextField
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
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
                <div>Settlement Amount</div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {parseFloat(settlementAmount).toFixed(2)}
                </div>
                <Typography
                  style={{
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.9rem",
                    color: "grey",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => setShowPriceBreakout(true)}
                >
                  Price Breakout
                </Typography>
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
                  fullWidth
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
                  onChange={(e) => {
                    setSelectedSubcategory(e.target.value);
                    setAdminCommissionPerc(e.target.value.split("_")[1]);
                  }}
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
                        <MenuItem
                          key={subcategory.id}
                          value={`${subcategory.id}_${subcategory.admin_comm_perc}`}
                        >
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
                      <MenuItem key={option.name} value={option.name}>
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
                value={finalDescription}
                onChange={(e) => {
                  let inputValue = e.target.value.replace(/^\d+\.\s*/, ""); // Remove leading number
                  setFinalDescription(inputValue); // Update state with clean value
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
                  onChange={handleMetalTypeChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      document.querySelector('select[name="purity"]')?.focus();
                    }
                  }}
                >
                  <MenuItem defaultChecked={true} value="gold">
                    Gold
                  </MenuItem>
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
                      ?.property_value.map((option) => {
                        return (
                          <MenuItem key={option.name} value={option.name}>
                            {option.display_name}
                          </MenuItem>
                        );
                      })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1.5} style={{ display: "none" }}>
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
                  onChange={handleGrossWeightChange}
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
                  onChange={handleStoneWeightChange}
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
                        .querySelector('input[name="wastagePercent"]')
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
                  value={
                    netWeight !== undefined ? netWeight.toFixed(2) : netWeight
                  }
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
                  onChange={handleWastagePercentChange}
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
                  value={wastageWeight.toFixed(2)}
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
                  value={
                    netWeightAfterWastage !== undefined
                      ? netWeightAfterWastage.toFixed(2)
                      : netWeightAfterWastage
                  }
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
                  {dropdownValues?.[0]?.customization_fields
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
              <div className="label">MC %</div>
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
            <Grid item xs={12}>
              <div className="label">Verify Product Credentials</div>
            </Grid>
            <Grid item xs={4}>
              <div className="label">IGI Certificate Link</div>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  value={igiLink}
                  onChange={(e) => setIgiLink(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload File
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    hidden
                    onChange={(e) => handleFileUpload(e, setIgiLink)}
                  />
                </Button>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <div className="label">GIA Certificate Link</div>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  value={giaLink}
                  onChange={(e) => setgiaLink(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload File
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    hidden
                    onChange={(e) => handleFileUpload(e, setgiaLink)}
                  />
                </Button>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <div className="label">BIS Link</div>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  value={bisCareLink}
                  onChange={(e) => setBisCareLink(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload File
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    hidden
                    onChange={(e) => handleFileUpload(e, setBisCareLink)}
                  />
                </Button>
              </FormControl>
            </Grid>

          </Grid>
          <Divider />
          {variants.map((currentVariant, index) => {
            return dropdownValues !== undefined && adminCommissionPerc !== undefined && adminCommissionPerc !== 0 && (
              <AddVariant
                variantIndex={index}
                key={index}
                metalType={currentVariant.metalType || metalType}
                purity={currentVariant.purity || purity}
                dropdownValues={dropdownValues}
                quantity={currentVariant.quantity || quantity}
                grossWeight={currentVariant.grossWeight || grossWeight}
                stoneWeight={currentVariant.stoneWeight || stoneWeight}
                netWeight={currentVariant.netWeight || netWeight}
                wastagePercent={currentVariant.wastagePercent || wastagePercent}
                wastageWeight={currentVariant.wastageWeight || wastageWeight}
                netWeightAfterWastage={currentVariant.netWeightAfterWastage || netWeightAfterWastage}
                makingChargeType={currentVariant.makingChargeType || makingChargeType}
                makingChargeValue={currentVariant.makingChargeValue || makingChargeValue}
                makingChargeAmount={currentVariant.makingChargeAmount || makingChargeAmount}
                stoneAmount={currentVariant.stoneAmount || stoneAmount}
                hallmarkCharge={currentVariant.hallmarkCharge || hallmarkCharge}
                gstPercent={currentVariant.gstPercent || gstPercent}
                rodiumCharge={currentVariant.rodiumCharge || rodiumCharge}
                stoneType={currentVariant.stoneType || stoneType}
                stoneColor={currentVariant.stoneColor || stoneColor}
                stoneClarity={currentVariant.stoneClarity || stoneClarity}
                stoneCut={currentVariant.stoneCut || stoneCut}
                stonePieces={currentVariant.stonePieces || stonePieces}
                stoneCarat={currentVariant.stoneCarat || stoneCarat}
                stoneRate={currentVariant.stoneRate || stoneRate}
                stoneInternalWeight={currentVariant.stoneInternalWeight || stoneInternalWeight}
                stoneGSTPercent={currentVariant.stoneGSTPercent || stoneGSTPercent}
                rates={rates}
                removeVariant={removeVariant}
                setVariants={setVariants}
                name={currentVariant.name}
                tag={currentVariant.tag}
                variants={variants}
                adminCommissionPerc={adminCommissionPerc}
              />
            )
          })}
        </Paper>
        <Grid container spacing={2} style={{ display: "flex", justifyContent: "start", paddingLeft: "3rem", paddingBottom: "2rem" }}>
          <Grid item xs={1.33}>
            <div className="btns">
              <Button
                className="button2"
                variant="contained"
                sx={{
                  backgroundColor: "#a36e29",
                  fontFamily: '"Roboto", sans-serif',
                  "&:hover": {
                    backgroundColor: "#8b5d23",
                  },
                }}
                onClick={() => setVariants((prev) => [...prev, {}])}
              >
                Add Variant
              </Button>
            </div>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Dialog
        open={openDescriptionModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#a36e29",
            padding: "12px 24px",
            fontWeight: "bold",
            fontSize: "25px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          Select a description
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "16px",
            paddingTop: "10px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            fontSize: "14px",
            lineHeight: "1.5",
            fontWeight: "700",
            textAlign: "justify",
          }}
        >
          {imageDescriptions.length > 0 ? (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "#a36e29",
                      margin: "20px 0",
                    }}
                  >
                    Product Name: {productNameFromPrompt || "N/A"}
                  </h3>
                  <Switch
                    checked={useNewPromptProductName}
                    onChange={() =>
                      setUseNewPromptProductName(!useNewPromptProductName)
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#a36e29",
                        "&:hover": {
                          backgroundColor: "rgba(163, 110, 41, 0.08)",
                        },
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                      {
                        backgroundColor: "#a36e29",
                      },
                    }}
                  />
                </div>
              </div>

              {/* Render Descriptions */}
              {imageDescriptions.map((desc, index) => {
                const trimmedDesc =
                  desc.length > 250 ? desc.substring(0, 250) + "..." : desc;

                return (
                  <div
                    key={index}
                    className="form-check mb-2 mt-4"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px", // Spacing between radio button and text
                    }}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="description"
                      value={trimmedDesc}
                      id={`description-${index}`}
                      checked={selectedDescription === trimmedDesc}
                      onChange={() => setSelectedDescription(trimmedDesc)}
                      style={{
                        marginTop: "6px", // Aligns the radio button properly
                      }}
                    />
                    <label
                      htmlFor={`description-${index}`}
                      style={{
                        fontSize: "16px",
                        cursor: "pointer",
                        marginLeft: "1rem",
                        textAlign: "justify",
                        lineHeight: "1.8",
                        display: "block", // Ensures multiline text alignment
                      }}
                    >
                      {trimmedDesc}
                    </label>
                  </div>
                );
              })}
            </>
          ) : (
            <p>No descriptions available.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            className="button1"
            style={{
              color: "#a36e29",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (useNewPromptProductName) {
                setProductName(productNameFromPrompt);
              }
              setFinalDescription(selectedDescription); // Update final description
              handleCloseModal(); // Close the modal
            }}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#a36e29",
              "&:hover": {
                backgroundColor: "#a36e29",
              },
              padding: "8px 16px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProduct;
