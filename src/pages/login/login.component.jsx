import {
  AppBar,
  Button,
  createTheme,
  Grid,
  InputAdornment,
  OutlinedInput,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./login.styles.scss";

import InputTextField from "../../components/input-text-field/input-text-field.component";
import { generalToastStyle } from "../../utils/toast.styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a36e29",
    },
  },
  typography: {
    fontFamily: '"Work Sans", sans-serif',
  },
});

const Login = () => {
  let navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState();
  const [otpSent, setOTPSent] = useState(false);
  const [otpVerified, setOTPVerified] = useState(false);
  const [sendOTPAdornment, activateSendOTPAdornment] = useState(false);
  const [verifyOTPAdornment, activateVerifyOTPAdornment] = useState(false);

  useEffect(() => {
    if (!mobile) return;
  }, [mobile]);

  const sendOTP = () => {
    sendOTPHandler();
    activateSendOTPAdornment(false);
    setOTPSent(true);
  };

  const verifyOTP = () => {
    console.log("otp", otp);
    verifyOTPHandler();
    activateVerifyOTPAdornment(false);
    setOTPVerified(true);
  };

  const sendOTPHandler = () => {
    const formData = new FormData();
    formData.append("type", "generate_otp");
    formData.append("mobile", mobile);

    //call API for OTP verification
    axios
      .post(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/otp.php",
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
          toast.success("OTP sent successfully", generalToastStyle);
        } else {
          toast.success("Seller doesn't exist", generalToastStyle);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.success("Seller doesn't exist", generalToastStyle);
      });
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
          if (
            response?.data?.response?.seller_details?.seller_exists === false
          ) {
            return toast("Seller doesn't Exist", generalToastStyle);
          }
        }
        if (
          response.data.success === 1 &&
          response?.data?.response?.seller_details
        ) {
          if (response?.data?.response?.seller_details?.seller_exists) {
            console.log("user data to be set");
            localStorage.setItem(
              "user_id",
              response.data.response.seller_details.seller_details.id
            );
            localStorage.setItem(
              "token",
              response.data.response.seller_details.seller_details.token
            );
            localStorage.setItem(
              "user_name",
              response.data.response.seller_details.seller_details.name
            );
            localStorage.setItem(
              "user_email",
              response.data.response.seller_details.seller_details.email
            );
            localStorage.setItem(
              "user_data",
              response.data.response.seller_details.seller_details
            );
            navigate("/profile");
          } else {
            // navigate("/user-details");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="login">
      <ToastContainer />
      {/* Top Section */}
      <AppBar elevation={0} position="static" className="appbar">
        <Toolbar variant="dense" className="toolbar">
          <img
            alt="logo"
            className="logo"
            src={process.env.PUBLIC_URL + "/assets/logo_dark.png"}
            onClick={handleLogoClick}
          />
          <div className="btns">
            <Link className="link" to={"/register/user"}>
              <Button
                className="btn"
                style={{
                  color: "#a36e29",
                }}
              >
                Register
              </Button>
            </Link>
            <Link className="link-primary">
              <Button className="btn">Contact Us</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      {/* Middle Section */}
      <Grid container spacing={0}>
        {/* Left Section */}
        <Grid item xs={4} className="actions-div">
          <div className="content">
            <div className="heading">Login</div>
            <div className="input-text-field">
              <div className="label">Mobile</div>
              <ThemeProvider theme={theme}>
                <OutlinedInput
                  className="field"
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                    if (value.length <= 10) {
                      // Only allow up to 10 digits
                      setMobile(value);
                    }
                  }}
                  startAdornment={
                    <InputAdornment position="start">+91</InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        disabled={mobile.length !== 10}
                        onClick={sendOTP}
                        sx={{
                          color: "#a36e29",
                          "&:hover": {
                            backgroundColor: "transparent",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Send OTP
                      </Button>
                    </InputAdornment>
                  }
                />
              </ThemeProvider>
            </div>
            <InputTextField
              title={"OTP"}
              value={otp}
              onEdit={(e) => {
                setOtp(e.target.value);
              }}
            />
            <div className="actions">
              <Button className="btn-primary" onClick={verifyOTP}>
                LOGIN
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={8} className="infographics">
          <img
            src={process.env.PUBLIC_URL + "assets/login.webp"}
            alt="Login Banner"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
