import React, { useState } from "react";
import {
  Grid,
  Button,
  InputAdornment,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Done } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./registration-company-details.styles.scss";

import { generalToastStyle } from "../../utils/toast.styles";
import InputTextField from "../input-text-field/input-text-field.component";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

const RegistrationCompanyDetails = () => {
  let navigate = useNavigate();

  const [gstIn, setGstIn] = useState();
  const [gstInOtp, setGstInOtp] = useState();
  const [companyTradeName, setCompanyTradeName] = useState();
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
    if (gstIn === "" || typeof gstIn === "undefined") {
      toast.warn("GSTIN is required!", generalToastStyle);
    } else if (!otpSent) {
      toast.warn('Click on the "Tick" icon to send OTP!', generalToastStyle);
    } else if (gstInOtp === "" || typeof gstInOtp === "undefined") {
      toast.warn(
        "GSTIN OTP Verification is mandatory to proceed!",
        generalToastStyle
      );
    } else if (!otpVerified) {
      toast.warn('Click on the "Tick" icon to verify OTP!', generalToastStyle);
    } else if (
      companyTradeName === "" ||
      typeof companyTradeName === "undefined"
    ) {
      toast.warn(
        "Company Trade Name is mandatory to proceed!",
        generalToastStyle
      );
    } else {
      activateNextStepLoading(true);
      localStorage.setItem("gstIn", gstIn);
      localStorage.setItem("companyTradeName", companyTradeName);
      navigate("/register/store");
    }
  };
  return (
    <div className="registration-company-details">
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
              if (e.target.value.length === 15) activateSendOTPAdornment(true);
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
            title={"GSTIN OTP"}
            value={gstInOtp}
            onEdit={(e) => {
              setGstInOtp(e.target.value);
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

export default RegistrationCompanyDetails;
