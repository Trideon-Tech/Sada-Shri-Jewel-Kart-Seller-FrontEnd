import { ChevronRight, FormatQuoteOutlined } from "@mui/icons-material";
import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./landing.styles.scss";

const Landing = () => {
  const navigate = useNavigate();

  const handleFooterRedirect = (item) => {
    navigate(`/${item}`);
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
          />
          <div className="btns">
            <Link className="link" to={"/login"}>
              <Button className="btn">Login</Button>
            </Link>
            <Link className="link-primary" to={"/contact"}>
              <Button className="btn">Contact Us</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      {/* Middle Section */}
      <div className="content">
        <div className="backdrop">
          <div className="top">
            <div
              style={{
                height: "100%",
              }}
            />
            <div className="hero-text">
              Open your virtual shop
              <br />
              with us.
            </div>
          </div>
          <div className="bottom">
            <div className="buttons">
              <Button
                className="btn-primary"
                onClick={() => navigate("/register/user")}
              >
                <div className="btn-text">Get Started</div>
                <ChevronRight className="icon" />
              </Button>
              <Button className="btn-secondary">
                <a href="https://blogs.sadashrijewelkart.com/seller-registration-guide/" target="_blank" rel="noopener noreferrer">
                  <div className="btn-text">Know More <ChevronRight className="icon" /></div>
                  
                </a>
              </Button>
            </div>
          </div>
        </div>
        <img
          alt="hero-img"
          className="hero"
          src={process.env.PUBLIC_URL + "/assets/jwellery.png"}
        />
      </div>
      {/* Bottom Section */}
      <div className="footer">
        <div className="seperator" />
        <div className="items-row">
          <div className="company">Sadāshrī Ventures Pvt. Ltd.</div>
          <div className="actions">
            <a
              href="https://blogs.sadashrijewelkart.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="action-item"
            >
              Privacy Policy
            </a>
            <a
              href="https://blogs.sadashrijewelkart.com/shipping-and-returns/"
              target="_blank"
              rel="noopener noreferrer"
              className="action-item"
            >
              Shipping & Delivery
            </a>
            <a
              href="https://blogs.sadashrijewelkart.com/terms-and-conditions/"
              target="_blank"
              rel="noopener noreferrer"
              className="action-item"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
