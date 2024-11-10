import { Done } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./registration-company-details.styles.scss";

import axios from "axios";
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
  const [companyTradeName, setCompanyTradeName] = useState();
  const [panCard, setPanCard] = useState();
  const [otpSent, setOTPSent] = useState(false);
  const [sendOTPAdornment, activateSendOTPAdornment] = useState(false);
  const [nextStepLoading, activateNextStepLoading] = useState(false);

  const triggerVerifyGST = async () => {
    await verifyGSTIN();
    activateSendOTPAdornment(false);
    setOTPSent(true);
  };

  const verifyGSTIN = async () => {
    var data = JSON.stringify({
      id_number: gstIn,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://kyc-api.surepass.io/api/v1/corporate/gstin",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNDY1NTYxNiwianRpIjoiN2FhYWJkNjctYTk2OS00MTA0LWI1MjUtOWY4OGM5NWU0OTljIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnNhZGFzaHJpamV3ZWxAc3VyZXBhc3MuaW8iLCJuYmYiOjE3MjQ2NTU2MTYsImV4cCI6MjA0MDAxNTYxNiwiZW1haWwiOiJzYWRhc2hyaWpld2VsQHN1cmVwYXNzLmlvIiwidGVuYW50X2lkIjoibWFpbiIsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJ1c2VyIl19fQ.XzfFcgWopXR8Nj31l3_Ke8g0fjp9QgW9ab4nn-Rl2ts",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("==================>", response?.data?.data);
        if (response?.data?.data?.gstin_status === "Active") {
          toast("GSTIN Verified", generalToastStyle);
          setCompanyTradeName(response?.data?.data?.business_name);
          setPanCard(response?.data?.data?.pan_number);
          return;
        }
        toast.warn("GSTIN Invalid", generalToastStyle);
      })
      .catch(function (error) {
        console.log(error);
        toast.warn("GSTIN Validation Failed", generalToastStyle);
        return false;
      });
  };

  const onNext = () => {
    if (gstIn === "" || typeof gstIn === "undefined") {
      toast.warn("GSTIN is required!", generalToastStyle);
    } else if (!otpSent) {
      toast.warn('Click on the "Tick" icon to send OTP!', generalToastStyle);
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
      localStorage.setItem("panCard", panCard);
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
                  onClick={triggerVerifyGST}
                />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"PAN Card"}
            value={panCard}
            disabled={true}
            adornment={<InputAdornment position="end"></InputAdornment>}
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
        <Button
          className="btn-secondary"
          disabled={false}
          onClick={() => navigate("/register/user")}
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

export default RegistrationCompanyDetails;
