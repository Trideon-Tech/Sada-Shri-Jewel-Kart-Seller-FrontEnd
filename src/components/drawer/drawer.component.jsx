import { React, useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Dashboard, Business, List, Shop, ListAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import "./drawer.styles.scss";

import DrawerItem from "./item/item.component";

const CustomDrawer = ({ section }) => {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState("");
  const seller = JSON.parse(localStorage.getItem("seller"));

  useEffect(() => {
    const storedLogoUrl = localStorage.getItem("logoUrl");

    // Check if the storedLogoUrl is not null or undefined
    if (storedLogoUrl) {
      setLogoUrl(JSON.parse(storedLogoUrl));
    }
  }, []);

  const handleProfileEdit = () => {
    navigate("/profile");
  };

  const imageUrl = logoUrl
    ? `https://api.sadashrijewelkart.com/assets/${logoUrl}`
    : process.env.PUBLIC_URL + "/assets/logoNew.png";

  return (
    <div className="drawer-component">
      <div className="data">
        <img
          alt="logo"
          src={process.env.PUBLIC_URL + "/assets/logo_dark.png"}
          className="logo"
        />
        <Divider />
        <div className="drawer-content">
          <img alt="profile" className="profile" src={imageUrl} />
          <div className="name">{seller["name"]}</div>
          <div className="edit-option" onClick={handleProfileEdit}>Edit</div>
        </div>
        <DrawerItem
          title="Dashboard"
          value="dashboard"
          icon={<Dashboard />}
          section={section}
          clickAction={() => {
            if (section !== "dashboard") navigate("/dashboard");
          }}
        />
        <DrawerItem
          title="Products"
          value="products"
          icon={<ListAlt />}
          section={section}
          clickAction={() => {
            if (section !== "products") navigate("/products");
          }}
        />
      </div>
    </div>
  );
};

export default CustomDrawer;
