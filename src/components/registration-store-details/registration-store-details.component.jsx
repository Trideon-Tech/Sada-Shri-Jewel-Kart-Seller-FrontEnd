import React, { useState } from "react";
import {
  Button,
  Grid,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "./registration-store-details.styles.scss";

import { generalToastStyle } from "../../utils/toast.styles";
import InputTextField from "../input-text-field/input-text-field.component";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

function isValidEmail(email) {
  // Regular expression to validate email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}

const RegistrationStoreDetails = () => {
  let navigate = useNavigate();

  let registeredMobile = localStorage.getItem("mobile");
  let gstIn = localStorage.getItem("gstIn");
  let companyTradeName = localStorage.getItem("companyTradeName");

  const [emailId, setEmailId] = useState();
  const [selectedLogoImage, setSelectedLogoImage] = useState();
  const [selectedCoverImage, setSelectedCoverImage] = useState();
  const [nextStepLoading, activateNextStepLoading] = useState(false);

  const handleLogoSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedLogoImage(file);
    }
  };

  const handleCoverImageSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedCoverImage(file);
    }
  };

  const onNext = () => {
    if (emailId === "" || typeof emailId === "undefined") {
      toast.warn("Email Address is required!", generalToastStyle);
    } else if (!selectedLogoImage) {
      toast.warn("Logo is required!", generalToastStyle);
    } else {
      activateNextStepLoading(true);

      if (!isValidEmail(emailId)) {
        return toast.warn("Invalid Email Id", generalToastStyle);
      }

      const formData = new FormData();
      if (selectedCoverImage) {
        // Cover image is available
        formData.append("mobile", registeredMobile);
        formData.append("key", "company");
        formData.append("gstin", gstIn);
        formData.append("company_name", companyTradeName);
        formData.append("contact", emailId);
        formData.append("logo", selectedLogoImage);
        formData.append("cover_image", selectedCoverImage);
      } else {
        // Cover image unavilable
        formData.append("mobile", registeredMobile);
        formData.append("key", "company");
        formData.append("gstin", gstIn);
        formData.append("company_name", companyTradeName);
        formData.append("contact", emailId);
        formData.append("logo", selectedLogoImage);
      }

      axios
        .post(
          "https://api.sadashrijewelkart.com/v1.0.0/seller/add.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          activateNextStepLoading(false);
          navigate("/register/address");
        })
        .catch((error) => {
          console.error("Error:", error);
          activateNextStepLoading(false);
          toast.warn(error.response.data.message, generalToastStyle);
        });
    }
  };

  return (
    <div className="registration-store-details">
      <ToastContainer />
      <div className="step-text">Step 3/5</div>
      <div className="heading">Store Details</div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <InputTextField
            title={"Email Id"}
            value={emailId}
            onEdit={(e) => {
              setEmailId(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={5} className="image-item">
          <div className="info">
            <div className="label">Logo</div>
            <input
              type="file"
              id="logo-image"
              style={{
                display: "none",
              }}
              onChange={handleLogoSelection}
              accept="image/*"
            />
            <label htmlFor="logo-image">
              <Button className="action" variant="contained" component="span">
                Select
              </Button>
            </label>
          </div>
          {selectedLogoImage && <div className="label">Selected Logo :</div>}
          {selectedLogoImage && (
            <img
              src={URL.createObjectURL(selectedLogoImage)}
              alt="Selected Logo"
              className="selected-image"
            />
          )}
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5} className="image-item">
          <div className="info">
            <div className="label">Cover</div>
            <input
              type="file"
              id="cover-image"
              style={{
                display: "none",
              }}
              onChange={handleCoverImageSelection}
              accept="image/*"
            />
            <label htmlFor="cover-image">
              <Button className="action" variant="contained" component="span">
                Select
              </Button>
            </label>
          </div>
          {selectedCoverImage && (
            <div className="label">Selected Cover Image :</div>
          )}
          {selectedCoverImage && (
            <img
              src={URL.createObjectURL(selectedCoverImage)}
              alt="Selected Cover"
              className="selected-image"
            />
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <div className="divider" />
      <div className="actions">
        <Button
          className="btn-secondary"
          disabled={false}
          onClick={() => navigate("/register/company")}
        >
          Prev. Step
        </Button>
        <Button className="btn-primary" onClick={onNext}>
          {nextStepLoading ? (
            <ThemeProvider theme={theme}>
              <CircularProgress size={"1.1rem"} />
            </ThemeProvider>
          ) : (
            "Next Step"
          )}
        </Button>
      </div>
    </div>
  );
};

export default RegistrationStoreDetails;
