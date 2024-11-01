import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./login.styles.scss";

import InputTextField from "../../components/input-text-field/input-text-field.component";
import { generalToastStyle } from "../../utils/toast.styles";

const Login = () => {
  let navigate = useNavigate();
  const [mobile, setMobile] = useState();
  const [otp, setOtp] = useState();
  const [otpSent, setOTPSent] = useState(false);
  const [otpVerified, setOTPVerified] = useState(false);
  const [sendOTPAdornment, activateSendOTPAdornment] = useState(false);
  const [verifyOTPAdornment, activateVerifyOTPAdornment] = useState(false);
  const [nextStepLoading, activateNextStepLoading] = useState(false);

  useEffect(() => {
    if (!mobile) return;
    if (mobile.length > 9 && mobile.length <= 11) sendOTP();
  }, [mobile]);

  const sendOTP = () => {
    sendOTPHandler();
    toast("OTP Sent Successfully!", generalToastStyle);
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
    formData.append("mobile", `91${mobile}`);

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
          // setotpSent(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
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
            <Link className="link" to={"/login"}>
              <Button className="btn">Login</Button>
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
            <InputTextField
              title={"Mobile"}
              value={mobile}
              onEdit={(e) => {
                setMobile(e.target.value);
                if (e.target.value.length === 10)
                  activateSendOTPAdornment(true);
                else activateSendOTPAdornment(false);
              }}
            />
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
          Graphics
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
