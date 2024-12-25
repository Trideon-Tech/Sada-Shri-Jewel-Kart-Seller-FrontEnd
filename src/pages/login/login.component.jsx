import {
  AppBar,
  Button,
  createTheme,
  Grid,
  InputAdornment,
  OutlinedInput,
  ThemeProvider,
  TextField,
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
    fontFamily: '"Roboto", sans-serif',
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
            <Grid container className="register-grid" spacing={2}>
            <Grid item xs={12} style={{ marginBottom: "1rem", }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter Your Mobile Number"
                required
                value={mobile}
                onChange={(e) => {
                  if (Number.isInteger(Number(e.target.value)))
                    if (e.target.value.length <= 10) setMobile(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && mobile?.length === 10) {
                    sendOTPHandler();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{
                        marginLeft: "-13px",
                      }}
                    >
                      <Button
                        variant="solid"
                        type="submit"
                        style={{
                          borderTopLeftRadius: "5px",
                          borderBottomLeftRadius: "5px",
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          backgroundImage: "linear-gradient(to right, #d4a76a, #a36e29)",
                          fontFamily: '"Roboto", sans-serif',
                          fontSize: "0.8rem",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        +91
                      </Button>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{
                        marginRight: "-13px",
                      }}
                    >
                      {mobile?.length > 9 ? (
                        <Button
                          variant="solid"
                          loading={otpSent}
                          type="submit"
                          style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            backgroundImage: "linear-gradient(to right, #d4a76a, #a36e29)",
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: "0.8rem",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                          onClick={() => sendOTPHandler()}
                        >
                          Send OTP
                        </Button>
                      ) : (
                        <Button
                          variant="solid"
                          color="neutral"
                          type="submit"
                          style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            fontFamily: '"Roboto", sans-serif',
                            backgroundColor: "#F0F4F8",
                            fontSize: "0.8rem",
                            color: "#9EA6AC",
                            fontWeight: "bold",
                          }}
                          disabled={true}
                        >
                          Send OTP
                        </Button>
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "100%",
                  "& input": {
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.8rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#a36e29",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                sx={{
                  width: "100%",
                  "& input": {
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.8rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#a36e29",
                    },
                  },
                }}
                placeholder="Enter OTP"
                required
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && otp?.length === 4) {
                    verifyOTPHandler();
                  }
                }}
              />
            </Grid>
          </Grid>
            <div className="actions">
              <Button className="btn-primary" onClick={verifyOTP} style={{ backgroundImage:  "linear-gradient(to right, #d4a76a, #a36e29)" }}>
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
