import React from "react";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./staging.styles.scss";

const Staging = () => {
  const navigate = useNavigate();

  return (
    <div className="staging">
      <Paper className="card">
        <img
          className="anim"
          alt="logo"
          src={process.env.PUBLIC_URL + "/assets/logo_dark.png"}
        />
        <div className="main-text">
          Please wait while admin verifies your account details!
        </div>
        <div className="login-action" onClick={() => navigate("/login")}>
          Go to Login
        </div>
        <p className="query-txt">
          In case of any queries.{" "}
          <a className="mail-txt" href="mailto:admin@sadashrijewelkart.com">
            Write a mail here.
          </a>
        </p>
      </Paper>
    </div>
  );
};

export default Staging;
