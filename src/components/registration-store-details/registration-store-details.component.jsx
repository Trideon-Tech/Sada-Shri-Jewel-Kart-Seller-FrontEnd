import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Input, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "./registration-store-details.styles.scss";
import InputTextField from "../input-text-field/input-text-field.component";

const RegistrationStoreDetails = () => {
  let navigate = useNavigate();
  let registeredMobile= localStorage.getItem("mobile");
  let gstIn = localStorage.getItem("gstIn");
  let companyTradeName = localStorage.getItem("companyTradeName");
  const [emailId, setEmailId] = useState();
  const [selectedLogoImage, setSelectedLogoImage] = useState();
  const [selectedCoverImage, setSelectedCoverImage] = useState();


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedLogoImage(file);
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedCoverImage(file);
    }
  };

  const onNext = () => {
    const formData = new FormData();
    formData.append('mobile', registeredMobile);
    formData.append('gstIn', gstIn);
    formData.append('companyTradeName', companyTradeName);
    formData.append('emailId', emailId);
    formData.append('selectedLogoImage', selectedLogoImage);
    formData.append('selectedCoverImage', selectedCoverImage);
    formData.append('key','company');
    // console.log(firstName);
    // if (firstName === "" || typeof firstName === "undefined") {
    //   toast.warn("First Name is required!", generalToastStyle);
    // } else if (lastName === "" || typeof firstName === "undefined") {
    //   toast.warn("Last Name is required!");
    // } else if (mobile === "" || typeof firstName === "undefined") {
    //   toast.warn("Mobie Number is required!", generalToastStyle);
    // } else if (otp === "" || typeof firstName === "undefined") {
    //   toast.warn("OTP Verification is mandatory to proceed!");
    // }
    // else {
      axios.post('https://api.sadashrijewelkart.com/v1.0.0/seller/add.php', formData)
      .then(response => {
        // Handle the response
        console.log('Response:', response.data);
        navigate("/register/address");
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
    
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
              console.log(emailId);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Paper className="container">
            <Typography variant="h6" gutterBottom>
              Select your store logo
            </Typography>
            <Input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="logo-image-input"
            />
            <label htmlFor="logo-image-input">
              <Button className="btn" variant="contained" component="span">
                Select Image
              </Button>
            </label>
            {selectedLogoImage && (
              <div className="image-preview">
                <Typography variant="subtitle1" gutterBottom>
                  Selected Image:
                </Typography>
                <img
                  src={URL.createObjectURL(selectedLogoImage)}
                  alt="Selected"
                />
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="container">
            <Typography variant="h6" gutterBottom>
              Select your store cover image
            </Typography>
            <Input
              type="file"
              onChange={handleCoverImageChange}
              style={{ display: "none" }}
              id="cover-image-input"
            />
            <label htmlFor="cover-image-input">
              <Button className="btn" variant="contained" component="span">
                Select Image
              </Button>
            </label>
            {selectedCoverImage && (
              <div className="image-preview">
                <Typography variant="subtitle1" gutterBottom>
                  Selected Image:
                </Typography>
                <img
                  src={URL.createObjectURL(selectedCoverImage)}
                  alt="Selected"
                />
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
      <div className="divider" />
      <div className="actions">
        <Button className="btn-secondary" disabled={true}>
          Prev. Step
        </Button>
        <Button className="btn-primary" onClick={onNext}>
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default RegistrationStoreDetails;
