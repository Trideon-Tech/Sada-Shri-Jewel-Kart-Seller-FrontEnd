import { Done } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  createTheme,
  Grid,
  InputAdornment,
  ThemeProvider,
  TextField,
  Label
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
          `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/user/otp.php`,
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
    if (firstName === "" || typeof firstName === "undefined") {
      toast.warn("First Name is required!", generalToastStyle);
      return;
    }
    if (lastName === "" || typeof lastName === "undefined") {
      toast.warn("Last Name is required!", generalToastStyle);
      return;
    }
    if (mobile === "" || typeof mobile === "undefined") {
      toast.warn("Mobile is required!", generalToastStyle);
      return;
    }
    if (otp === "" || typeof otp === "undefined") {
      toast.warn("OTP is required!", generalToastStyle);
      return;
    }
    formData.append("type", "verify_otp");
    formData.append("mobile", `91${mobile}`);
    formData.append("otp", otp);

    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/otp.php?type=verify_otp&otp=${otp}&mobile=${`${mobile}`}`,
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
                `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/register.php`,
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
        <Grid item xs={6} className="padding-right">
          <div className="label">Mobile</div>
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
                      height: "3.4rem",
                      padding: "0 1rem",
                      minWidth: "4rem"
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
                        height: "3.4rem",
                        padding: "0 1rem",
                        minWidth: "6rem"
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
                        height: "3.4rem",
                        padding: "0 1rem",
                        minWidth: "4rem"
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
                padding: "1.2rem 1rem"
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
        <Grid item xs={6}>
          <InputTextField
            title={"OTP"}
            value={otp}
            onEdit={(e) => {
              const value = e.target.value || '';
              if (value.length > 4) return;
              setOtp(value);
              activateVerifyOTPAdornment(value.length === 4);
            }}
            adornment={
              <InputAdornment position="end" style={{ marginRight: "-13px" }}>
                <Button
                  variant="solid"
                  type="submit"
                  style={{
                    backgroundImage: verifyOTPAdornment ? "linear-gradient(to right, #d4a76a, #a36e29)" : "",
                    backgroundColor: verifyOTPAdornment ? "" : "#F0F4F8",
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.8rem",
                    color: verifyOTPAdornment ? "#fff" : "#9EA6AC",
                    fontWeight: "bold",
                    height: "3.4rem",
                    width: "150%"
                  }}
                  onClick={verifyOTP}
                >
                  Verify OTP
                </Button>
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>
      <div className="divider" />
      <div className="actions" style={{ display: "flex", justifyContent: "flex-end" }}>
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
