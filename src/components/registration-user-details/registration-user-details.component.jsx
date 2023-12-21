import React, { useState } from "react";
import { Button, Grid, InputAdornment } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./registration-user-details.styles.scss";

import { generalToastStyle } from "../../utils/toast.styles";
import InputTextField from "../input-text-field/input-text-field.component";

const RegistrationUserDetails = () => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobile, setMobile] = useState();
  const [otp, setOtp] = useState();

  const onNext = () => {
    console.log(firstName);
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
    //   axios.post()
    // }

    navigate("/register/company");
  };

  return (
    <div className="registration-user-details">
      <ToastContainer />
      <div className="step-text">Step 1/5</div>
      <div className="heading">User Details</div>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <InputTextField
            title={"First Name"}
            value={firstName}
            onEdit={(e) => {
              setFirstName(e.target.value);
              console.log(firstName);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"Last Name"}
            value={lastName}
            onEdit={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"Mobile"}
            value={mobile}
            onEdit={(e) => setMobile(e.target.value)}
            adornment={<InputAdornment position="end"></InputAdornment>}
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"OTP"}
            value={otp}
            onEdit={(e) => setOtp(e.target.value)}
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

export default RegistrationUserDetails;
