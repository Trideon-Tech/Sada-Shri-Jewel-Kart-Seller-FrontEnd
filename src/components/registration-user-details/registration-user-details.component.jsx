import React, { useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Done } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./registration-user-details.styles.scss";

import { generalToastStyle } from "../../utils/toast.styles";
import InputTextField from "../input-text-field/input-text-field.component";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

const RegistrationUserDetails = () => {
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobile, setMobile] = useState();
  const [otp, setOtp] = useState();
  const [otpSent, setOTPSent] = useState(false);
  const [otpVerified, setOTPVerified] = useState(false);
  const [sendOTPAdornment, activateSendOTPAdornment] = useState(false);
  const [verifyOTPAdornment, activateVerifyOTPAdornment] = useState(false);
  const [nextStepLoading, activateNextStepLoading] = useState(false);

  const sendOTP = () => {
    // API to send OTP
    toast("OTP Sent Successfully!", generalToastStyle);
    activateSendOTPAdornment(false);
    setOTPSent(true);
  };

  const verifyOTP = () => {
    // API to verify OTP
    toast("OTP Verified Successfully!", generalToastStyle);
    activateVerifyOTPAdornment(false);
    setOTPVerified(true);
  };

  const onNext = () => {
    if (firstName === "" || typeof firstName === "undefined") {
      toast.warn("First Name is required!", generalToastStyle);
    } else if (lastName === "" || typeof lastName === "undefined") {
      toast.warn("Last Name is required!", generalToastStyle);
    } else if (mobile === "" || typeof mobile === "undefined") {
      toast.warn("Mobie Number is required!", generalToastStyle);
    } else if (!otpSent) {
      toast.warn('Click on the "Tick" icon to send OTP!', generalToastStyle);
    } else if (otp === "" || typeof otp === "undefined") {
      toast.warn(
        "OTP Verification is mandatory to proceed!",
        generalToastStyle
      );
    } else if (!otpVerified) {
      toast.warn('Click on the "Tick" icon to verify OTP!', generalToastStyle);
    } else {
      activateNextStepLoading(true);
      let formData = new FormData();
      formData.append("name", `${firstName + " " + lastName}`);
      formData.append("mobile", `${mobile}`);

      axios
        .post(
          "https://api.sadashrijewelkart.com/v1.0.0/seller/register.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((_) => {
          localStorage.setItem("mobile", mobile);
          activateNextStepLoading(false);
          navigate("/register/company");
        })
        .catch((error) => {
          console.error("Error:", error);
          activateNextStepLoading(false);
          toast.warn(error.response.data.message, generalToastStyle);
        });
    }
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
            onEdit={(e) => {
              setMobile(e.target.value);
              if (e.target.value.length === 10) activateSendOTPAdornment(true);
              else activateSendOTPAdornment(false);
            }}
            adornment={
              <InputAdornment position="end">
                <Done
                  className={
                    sendOTPAdornment ? "adornment-active" : "adornment-inactive"
                  }
                  onClick={sendOTP}
                />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"OTP"}
            value={otp}
            onEdit={(e) => {
              setOtp(e.target.value);
              if (e.target.value.length === 6) activateVerifyOTPAdornment(true);
              else activateVerifyOTPAdornment(false);
            }}
            adornment={
              <InputAdornment position="end">
                <Done
                  className={
                    verifyOTPAdornment
                      ? "adornment-active"
                      : "adornment-inactive"
                  }
                  onClick={verifyOTP}
                />
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>
      <div className="divider" />
      <div className="actions">
        <Button className="btn-secondary" disabled={true}>
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

export default RegistrationUserDetails;
