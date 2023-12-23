import React from "react";
import { AppBar, Toolbar, Button, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./register.styles.scss";

import RegistrationOutlineComponent from "../../components/registration-outline-item/registration-outline-item.component";
import RegistrationUserDetails from "../../components/registration-user-details/registration-user-details.component";
import RegistrationCompanyDetails from "../../components/registration-company-details/registration-company-details.component";
import RegistrationStoreDetails from "../../components/registration-store-details/registration-store-details.component";

const Register = () => {
  let { step } = useParams();
  let selectedIndex = step === "user" ? 1 : step === "company" ? 2 : step === "store" ? 3 : step === "address" ? 4 : 5;

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
            selectedIndex={selectedIndex}
          />
          <RegistrationOutlineComponent
            number={2}
            text={"Company Details"}
            showTrailingLine={true}
            selectedIndex={selectedIndex}
          />
          <RegistrationOutlineComponent
            number={3}
            text={"Store Details"}
            showTrailingLine={true}
            selectedIndex={selectedIndex}
          />
          <RegistrationOutlineComponent
            number={4}
            text={"Pickup Address"}
            showTrailingLine={true}
            selectedIndex={selectedIndex}
          />
          <RegistrationOutlineComponent
            number={5}
            text={"Bank Accounts"}
            showTrailingLine={false}
            selectedIndex={selectedIndex}
          />
          <div className="helper-text">Seller Registration Guide</div>
        </Grid>
        <Grid item xs={8} className="inputs">
          {step === "user" ? <RegistrationUserDetails /> : step === "company" ? <RegistrationCompanyDetails/> : step === "store" ? <RegistrationStoreDetails/> : <div />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
