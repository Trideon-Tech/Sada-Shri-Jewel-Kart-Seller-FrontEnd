import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./contactUs.styles.scss";
import { generalToastStyle } from "../../utils/toast.styles";
import InputTextField from "../../components/input-text-field/input-text-field.component";

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

  const handleLogoClick = () => {
    navigate("/");
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
      const formData = new FormData();
      formData.append("name", name);
      formData.append("emailId", emailId);
      formData.append("phone", phone);
      formData.append("message", message);

      axios
        .post(
          "https://api.sadashrijewelkart.com/v1.0.0/admin/contact.php",
          formData
          //   {
          //     headers: {
          //       "Content-Type": "multipart/form-data",
          //     },
          //   }
        )
        .then((_) => {
          localStorage.clear();
          navigate("/contactus");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.warn(error.response.data.message, generalToastStyle);
        });
    }
  };

  return (
    <div className="landing">
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
      <div className="content">
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
                    <strong>Email Id:</strong> example@example.com
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    <strong>Contact number:</strong> +1234567890
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                </div>
              </Grid>

              {/* Right Block */}
              <Grid item xs={12} md={7}>
                <div className="right-block">
                  <ToastContainer />
                  <form>
                    <InputTextField
                      title={"Name"}
                      value={name}
                      onEdit={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <InputTextField
                      title={"Email ID"}
                      value={emailId}
                      onEdit={(e) => {
                        setEmailId(e.target.value);
                      }}
                    />
                    <InputTextField
                      title={"Phone Number"}
                      value={phone}
                      onEdit={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                    <InputTextField
                      title={"Message"}
                      value={message}
                      onEdit={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    <div className="divider" />
                    <div className="actions">
                      {/* <Button className="btn-secondary" disabled={true}>
                        Prev. Step
                      </Button> */}
                      <Button className="btn-primary" onClick={onNext}>
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
