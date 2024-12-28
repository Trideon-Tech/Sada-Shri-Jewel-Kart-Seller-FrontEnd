import {
  AppBar,
  Button,
  CircularProgress,
  createTheme,
  Grid,
  ThemeProvider,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "./contact-us.styles.scss";

import InputTextField from "../../components/input-text-field/input-text-field.component";
import { generalToastStyle } from "../../utils/toast.styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

const ContactUs = () => {
  let navigate = useNavigate();
  const [name, setName] = useState();
  const [emailId, setEmailId] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  const [showLoading, setShowLoading] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleFooterRedirect = (item) => {
    navigate(`/${item}`);
  };

  const onNext = () => {
    if (name === "" || typeof name === "undefined") {
      toast.warn("Name is required!", generalToastStyle);
    } else if (emailId === "" || typeof emailId === "undefined") {
      toast.warn("Email ID is required!", generalToastStyle);
    } else if (phone === "" || typeof phone === "undefined") {
      toast.warn("Phone number is required!", generalToastStyle);
    } else if (message === "" || typeof message === "undefined") {
      toast.warn("Your message is required!", generalToastStyle);
    } else {
      setShowLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", emailId);
      formData.append("mobile", phone);
      formData.append("message", message);

      axios
        .post(
          "https://api.sadashrijewelkart.com/v1.0.0/admin/contact.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((_) => {
          setShowLoading(false);
          localStorage.clear();
          setName("");
          setEmailId("");
          setPhone("");
          setMessage("");
          toast.warn("Query received!", generalToastStyle);
        })
        .catch((error) => {
          setShowLoading(false);
          console.error("Error:", error);
          toast.warn(error.response.data.message, generalToastStyle);
        });
    }
  };

  return (
    <div className="landing">
      <ToastContainer />
      {/* Top Section */}
      <AppBar elevation={0} position="static" className="appbar">
        <Toolbar variant="dense" className="toolbar">
          <img
            alt="logo"
            className="logo"
            src={process.env.PUBLIC_URL + "/assets/logo_white.png"}
            onClick={handleLogoClick}
          />
          <div className="btns">
            <Link className="link" to={"/login"}>
              <Button className="btn">Login</Button>
            </Link>
            <Link className="link-primary">
              <Button className="btn" to={"/"}>
                Register
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      {/* Middle Section */}
      <div className="contact-us-content">
        <div className="top">
          <div
            style={{
              height: "100%",
            }}
          />
          <div className="hero-text">Contact Us</div>
        </div>
        <div className="text">
          <div className="contact-us">
            <Grid container spacing={2}>
              {/* Left Block */}
              <Grid item xs={12} md={5}>
                <div className="left-block">
                  <Typography variant="h5">Contact Us</Typography>
                  <br />
                  <Typography variant="body1">
                    <strong>Email Id:</strong> admin@sadashrijewelkart.com
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    <strong>Contact number:</strong> +91 9380179994
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    #1323/1324, 2nd floor, 3rd phase, B-sector, Sanitary core
                    site, New Town, Yelhanka, Bangalore - 560064
                  </Typography>
                </div>
              </Grid>

              {/* Right Block */}
              <Grid item xs={12} md={7}>
                <div className="right-block">
                  <form>
                    <InputTextField
                      title={"Name"}
                      value={name}
                      onEdit={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "16px"
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <InputTextField
                          title={"Email ID"}
                          value={emailId}
                          onEdit={(e) => {
                            setEmailId(e.target.value);
                          }}
                          style={{ width: "100%" }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <InputTextField
                          title={"Phone Number"}
                          value={phone}
                          onEdit={(e) => {
                            setPhone(e.target.value);
                          }}
                          style={{ width: "100%" }}
                        />
                      </Box>
                    </Box>
                    <InputTextField
                      title={"Message"}
                      value={message}
                      onEdit={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    <div className="divider" />
                    <div className="actions">
                      <Button
                        className="btn-primary"
                        disabled={showLoading}
                        onClick={onNext}
                      >
                        {showLoading ? (
                          <ThemeProvider theme={theme}>
                            <CircularProgress />
                          </ThemeProvider>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="footer">
        <div className="seperator" />
        <div className="items-row">
          <div className="company">Sadāshrī Ventures Pvt. Ltd.</div>
          <div className="actions">
            <div
              onClick={() => handleFooterRedirect("privacy")}
              className="action-item"
            >
              Privacy Policy
            </div>
            <div
              onClick={() => handleFooterRedirect("shipping")}
              className="action-item"
            >
              Shipping & Delivery
            </div>
            <div
              onClick={() => handleFooterRedirect("term")}
              className="action-item"
            >
              Terms & Conditions
            </div>
            <div
              onClick={() => handleFooterRedirect("shipping")}
              className="action-item"
            >
              Refund Policy
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ContactUs;
