import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  InputAdornment,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Done } from "@mui/icons-material";
import axios from "axios";

import "./login.styles.scss";

import { generalToastStyle } from "../../utils/toast.styles";
import InputTextField from "../../components/input-text-field/input-text-field.component";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

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

  useEffect(() => {
    if (!otp) return;
    if (otp.length === 4)
      if (mobile.length > 9 && mobile.length <= 11) verifyOTP();
  }, [otp]);

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
    // toast("OTP Verified Successfully!", generalToastStyle);
    activateVerifyOTPAdornment(false);
    setOTPVerified(true);
  };

  const sendOTPHandler = () => {
    const formData = new FormData();
    // setotpSent(true);
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
    // setotpSent(true);
    formData.append("type", "verify_otp");
    formData.append("mobile", `91${mobile}`);
    formData.append("otp", otp);

    //call API for OTP verification
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
        console.log(
          "userdata=====================================",
          response,
          response?.data?.response?.seller_details?.seller_details
            ?.seller_exists
        );
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
            navigate("/dashboard");
          } else {
            // navigate("/user-details");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onNext = () => {
    // verifyOTP();
    // if (!otpVerified) return;
    if (mobile === "" || typeof mobile === "undefined") {
      toast.warn("Mobile Number is required!", generalToastStyle);
    } else if (otp === "" || typeof otp === "undefined") {
      toast.warn("OTP is required!", generalToastStyle);
    } else {
      activateNextStepLoading(true);
      axios
        .get(
          `https://api.sadashrijewelkart.com/v1.0.0/seller/login.php?mobile=${mobile}`,
          {
            headers: {
              Authorization:
                "Bearer CWcyi9M3OIIi17umJNZi5YlXTnHrmsDhYbAP3N0BuZuzNwIQNpRcUvdeiJjPlVxy",
            },
          }
        )
        .then((response) => {
          const token = response.data.response.token;
          const logoUrl = response.data.response.organization.logo;
          console.log("login successful");
          localStorage.setItem("logoUrl", JSON.stringify(logoUrl));
          localStorage.setItem(
            "seller",
            JSON.stringify(response.data.response)
          );
          localStorage.setItem("token", token);
          localStorage.setItem("seller_id", response.data.response);

          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Login failed:", error.message);
        })
        .finally(() => {
          activateNextStepLoading(false);
        });
    }
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
              adornment={<InputAdornment position="end"></InputAdornment>}
            />
            <InputTextField
              title={"OTP"}
              value={otp}
              onEdit={(e) => {
                setOtp(e.target.value);
                if (e.target.value.length === 6)
                  activateVerifyOTPAdornment(true);
                else activateVerifyOTPAdornment(false);
              }}
              adornment={<InputAdornment position="end"></InputAdornment>}
            />
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
