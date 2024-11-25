import { Done } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  createTheme,
  Grid,
  InputAdornment,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    sendOTPHandler();
    activateSendOTPAdornment(false);
    setOTPSent(true);
  };

  const verifyOTP = () => {
    verifyOTPHandler();
  };

  const sendOTPHandler = () => {
    if (firstName === "" || typeof firstName === "undefined") {
      toast.warn("First Name is required!", generalToastStyle);
      return;
    } else if (lastName === "" || typeof lastName === "undefined") {
      toast.warn("Last Name is required!", generalToastStyle);
      return;
    } else {
      const formData = new FormData();
      formData.append("type", "generate_otp");
      formData.append("mobile", `91${mobile}`);

      axios
        .post(
          "https://api.sadashrijewelkart.com/v1.0.0/user/otp.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.success === 1) {
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const verifyOTPHandler = () => {
    const formData = new FormData();
    formData.append("type", "verify_otp");
    formData.append("mobile", `91${mobile}`);
    formData.append("otp", otp);

    axios
      .get(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/otp.php?type=verify_otp&otp=${otp}&mobile=${`${mobile}`}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setOTPVerified(true);

        if (response.data.success === 1) {
          if (!response?.data?.response?.seller_details?.seller_exists) {
            toast("OTP Verified Successfully!", generalToastStyle);
            localStorage.setItem("mobile", mobile);

            const formData = new FormData();
            formData.append("type", "register_seller");
            formData.append("mobile", mobile);
            formData.append("name", `${firstName} ${lastName}`);

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
              .then((response) => {
                navigate("/register/company");
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else if (response?.data?.response?.seller_details?.seller_exists) {
            return toast("Seller Already Exists | Login", generalToastStyle);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
              if (e.target.value?.length > 11) return;
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
              if (e.target.value?.length > 4) return;
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
        <Button className="btn-primary" onClick={verifyOTPHandler}>
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
