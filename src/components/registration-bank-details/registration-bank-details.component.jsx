import React, { useState } from "react";
import { Button, Grid, InputAdornment } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./registration-bank-details.styles.scss";

// import "./registration-user-details.styles.scss";

import { generalToastStyle } from "../../utils/toast.styles";
import InputTextField from "../input-text-field/input-text-field.component";

const RegistrationBankDetails = () => {
  let navigate = useNavigate();
  let registeredMobile= localStorage.getItem("mobile");
  const [accountHolderName, setAccountHolderName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [ifsc, setIfsc] = useState();
  const [bankName, setBankName] = useState();

  const onNext = () => {
    const formData = new FormData();
    formData.append('mobile', registeredMobile);
    formData.append('accountNumber', accountNumber);
    formData.append('accountHolderName', accountHolderName);
    formData.append('ifsc', ifsc);
    formData.append('bankName', bankName);
    formData.append('key','company_bank_account');

    axios.post('https://api.sadashrijewelkart.com/v1.0.0/seller/add.php', formData)
      .then(response => {
        // Handle the response
        console.log('Response:', response.data);
        navigate("/home");
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
    
    
  };
  return (
    <div className="registration-bank-details">
      <ToastContainer />
      <div className="step-text">Step 5/5</div>
      <div className="heading">Bank Details</div>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <InputTextField
            title={"Account Holder Name"}
            value={accountHolderName}
            onEdit={(e) => {
              setAccountHolderName(e.target.value);
              console.log(accountHolderName);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"Account Number"}
            value={accountNumber}
            onEdit={(e) => setAccountNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"IFSC Code"}
            value={ifsc}
            onEdit={(e) => setIfsc(e.target.value)}
            adornment={<InputAdornment position="end"></InputAdornment>}
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"Bank Name"}
            value={bankName}
            onEdit={(e) => setBankName(e.target.value)}
          />
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

export default RegistrationBankDetails;