import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { ChevronRight, FormatQuoteOutlined } from "@mui/icons-material";
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
            <Link className="link-primary" to={"/contactus"}>
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
                <div className="btn-text">Know More</div>
                <ChevronRight className="icon" />
              </Button>
            </div>
            <div className="comments">
              <div className="comment-item">
                <FormatQuoteOutlined
                  style={{
                    transform: "scaleX(-1)",
                  }}
                />
                <div className="comment-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore etdolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquipex ea commodo consequat.
                </div>
                <FormatQuoteOutlined />
              </div>
              <div className="comment-author">Shubham Mazumdar</div>
              <div className="comment-author-title">
                Founder of meetshubham.com
              </div>
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
          <div className="company">Sada Shri Jewel Kart Pvt. Ltd.</div>
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
  );
};

export default Landing;
