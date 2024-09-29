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

  // const sendOTP = () => {
  //   // API to send OTP
  //   toast("OTP Sent Successfully!", generalToastStyle);
  //   activateSendOTPAdornment(false);
  //   setOTPSent(true);
  // };

  // const verifyOTP = () => {
  //   // API to verify OTP
  //   toast("OTP Verified Successfully!", generalToastStyle);
  //   activateVerifyOTPAdornment(false);
  //   setOTPVerified(true);
  // };

  const sendOTP = () => {
    // API to send OTP
    console.log("otp", otp);
    sendOTPHandler();
    toast("OTP Sent Successfully!", generalToastStyle);
    activateSendOTPAdornment(false);
    setOTPSent(true);
  };

  const verifyOTP = () => {
    console.log("otp", otp);
    verifyOTPHandler();
    // API to verify OTP

    // setOTPVerified(true);
  };

  const sendOTPHandler = () => {
    const formData = new FormData();
    // setotpSent(true);
    formData.append("type", "generate_otp");
    formData.append("mobile", `91${mobile}`);

    //call API for OTP verification
    axios
      .post("https://api.sadashrijewelkart.com/v1.0.0/user/otp.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === 1) {
          // setotpSent(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const verifyOTPHandler = () => {
    const formData = new FormData();
    // setotpSent(true);
    formData.append("type", "verify_otp");
    formData.append("mobile", `91${mobile}`);
    formData.append("otp", otp);

    //call API for OTP verification
    axios
      .get(
        `https://api.sadashrijewelkart.com/v1.0.0/user/otp.php?type=verify_otp&otp=${otp}&mobile=${`91${mobile}`}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("userdata=====================================", response);
        if (
          response.data.success === 1 &&
          response?.data?.response?.user_details
        ) {
          setOTPVerified(true);
          if (response.data.response.user_details.user_exists) {
            localStorage.setItem(
              "user_id",
              response.data.response.user_details.user_details.id
            );
            localStorage.setItem(
              "token",
              response.data.response.user_details.user_details.token
            );
            localStorage.setItem(
              "user_name",
              response.data.response.user_details.user_details.name
            );
            localStorage.setItem(
              "user_email",
              response.data.response.user_details.user_details.email
            );
            localStorage.setItem(
              "user_data",
              response.data.response.user_details.user_details
            );
            navigate("/register/company");
            toast("OTP Verified Successfully!", generalToastStyle);
            activateVerifyOTPAdornment(false);
          } else {
            toast("OTP Verification Failed !", generalToastStyle);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast("OTP Verification Failed !", generalToastStyle);
      });
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
