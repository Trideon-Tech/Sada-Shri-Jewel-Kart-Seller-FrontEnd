import React, { useState } from "react";
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
import Slider from "react-slick";

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

  const onNext = () => {};

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
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
              adornment={
                <InputAdornment position="end">
                  <Done
                    className={
                      sendOTPAdornment
                        ? "adornment-active"
                        : "adornment-inactive"
                    }
                    onClick={sendOTP}
                  />
                </InputAdornment>
              }
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
            <div className="actions">
              <Button className="btn-secondary" disabled={true}>
                Reset
              </Button>
              <Button className="btn-primary" onClick={onNext}>
                {nextStepLoading ? (
                  <ThemeProvider theme={theme}>
                    <CircularProgress size={"1.1rem"} />
                  </ThemeProvider>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={8} className="infographics">
        {/* <Slider>
            <div>
              <img src="/assets/jwellary(1).jpg" alt="Landscape 1" />
            </div>
            <div>
              <img src="/assets/jwellary(2).jpg" alt="Landscape 2" />
            </div>
            <div>
              <img src="/assets/jwellary(3).jpg" alt="Landscape 3" />
            </div>
            <div>
              <img src="/assets/jwellary(4).jpg" alt="Landscape 4" />
            </div>
          </Slider> */}
          Graphics
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
