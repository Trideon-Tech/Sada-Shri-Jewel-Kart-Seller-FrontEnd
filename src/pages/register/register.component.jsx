import React from "react";
import { AppBar, Toolbar, Button, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./register.styles.scss";

import RegistrationOutlineComponent from "../../component/registration-outline-item/registration-outline-item.component";

const Register = () => {
  let { step } = useParams();

  return (
    <div className="register">
      {/* Top Section */}
      <AppBar elevation={0} position="static" className="appbar">
        <Toolbar variant="dense" className="toolbar">
          <img
            alt="logo"
            className="logo"
            src={process.env.PUBLIC_URL + "/assets/logo_white.png"}
          />
          <div className="btns">
            <Link className="link">
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
        <Grid item xs={4} className="steps-outline">
          <div className="heading">Seller Registration</div>
          <RegistrationOutlineComponent
            number={1}
            text={"User Details"}
            showTrailingLine={true}
          />
          <RegistrationOutlineComponent
            number={2}
            text={"Company Details"}
            showTrailingLine={true}
          />
          <RegistrationOutlineComponent
            number={3}
            text={"Store Details"}
            showTrailingLine={true}
          />
          <RegistrationOutlineComponent
            number={4}
            text={"Pickup Address"}
            showTrailingLine={true}
          />
          <RegistrationOutlineComponent
            number={5}
            text={"Bank Accounts"}
            showTrailingLine={false}
          />
          <div className="helper-text">Seller Registration Guide</div>
        </Grid>
        <Grid item xs={8} className="inputs"></Grid>
      </Grid>
    </div>
  );
};

export default Register;
