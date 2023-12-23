import { Grid, Button, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { generalToastStyle } from "../../utils/toast.styles";
import InputTextField from "../input-text-field/input-text-field.component";

const RegistrationCompanyDetails = () => {
    let navigate = useNavigate();
    const [gstIn, setGstIn] = useState();
    const [gstInOtp, setGstInOtp] = useState();
    const [companyTradeName, setCompanyTradeName] = useState();

    useEffect (()=>{
        console.log(localStorage.getItem("mobile"));
    },[]);
    
    const onNext = () => {
        if (gstIn === "" || typeof gstIn === "undefined") {
            toast.warn("GSTIN is required!", generalToastStyle);
          } else if (gstInOtp === "" || typeof gstInOtp === "undefined") {
            toast.warn(" GSTIN OTP Verification is mandatory to proceed!");
          }else if (companyTradeName === "" || typeof companyTradeName === "undefined"){
            toast.warn(" Company Trade Name is mandatory to proceed!");
          }
          else {
            axios.post('https://api.sadashrijewelkart.com/api/seller/register.php', {
              // Request body (data to be sent)
              companyTradeName: companyTradeName,
              gstIn: gstIn,
            })
            .then(response => {
              // Handle the response
              console.log('Response:', response.data);
            })
            .catch(error => {
              // Handle errors
              console.error('Error:', error);
            });
          }
        navigate("/register/store");
    };
    return (
        <div className="registration-user-details">
         <ToastContainer />
         <div className="step-text">Step 2/5</div>
         <div className="heading">Company Details</div>
         <Grid container spacing={0}>
            <Grid item xs={6}>
                <InputTextField
                title={"GSTIN"}
                value={gstIn}
                onEdit={(e) => {
                setGstIn(e.target.value);
                console.log(gstIn);
                }}
            />
            </Grid>
            <Grid item xs={6}>
                <InputTextField
                title={"GSTIN OTP"}
                value={gstInOtp}
                onEdit={(e) => {
                setGstInOtp(e.target.value);
                console.log(gstInOtp);
                }}
            />
            </Grid>
            <Grid item xs={12}>
                <InputTextField
                title={"Company Trade Name"}
                value={companyTradeName}
                onEdit={(e) => setCompanyTradeName(e.target.value)}
                adornment={<InputAdornment position="end"></InputAdornment>}
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

export default RegistrationCompanyDetails;