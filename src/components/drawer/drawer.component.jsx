import { React, useState, useEffect } from "react";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Dashboard,
  Business,
  List,
  Shop,
  Category,
  ListAlt,
} from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

  const isSubcategorySelected =
    section === "categories" ||
    section === "products" ||
    section === "reviews" ||
    section === "orders" ||
    section === "payments";
  const [showSubCategories, setShowSubCategories] = useState(
    isSubcategorySelected
  );

  const handleCategoriesClick = () => {
    setShowSubCategories(!showSubCategories);
    if (section !== "categories") {
      navigate("/categories");
    }
  };
  const handleProfileEdit = () => {
    navigate("/profile");
  };

  const imageUrl = logoUrl
    ? `https://api.sadashrijewelkart.com/assets/${logoUrl}`
    : process.env.PUBLIC_URL + "/assets/logoNew.png";

  return (
    <div className="drawer-component">
      <div className="data" style={{ height: "90%" }}>
        <img
          alt="logo"
          src={process.env.PUBLIC_URL + "/assets/logo_dark.png"}
          className="logo"
        />
        <Divider />
        <div className="drawer-content">
          <img alt="profile" className="profile" src={imageUrl} />
          <div className="name">{seller["name"]}</div>
          <div className="edit-option" onClick={handleProfileEdit}>
            Edit
          </div>
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
          title="Shops"
          value="shops"
          icon={<Shop />}
          arrowicon={
            showSubCategories ? <ExpandLessIcon /> : <ChevronRightIcon />
          }
          section={section}
          clickAction={handleCategoriesClick}
          hassubcategory={true}
          isSelected={isSubcategorySelected}
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

        <DrawerItem
          title="Orders"
          value="orders"
          icon={<Category />}
          section={section}
          clickAction={() => {
            if (section !== "orders") navigate("/orders");
          }}
          isaSubcategory={true}
          isSelected={section === "orders"}
        />
        <DrawerItem
          title="Payments"
          value="payments"
          icon={<Category />}
          section={section}
          clickAction={() => {
            if (section !== "payments") navigate("/payments");
          }}
          isaSubcategory={true}
          isSelected={section === "payments"}
        />
      </div>
      <div
        style={{
          marginTop: "auto",
          width: "100%",
          height: "70px",
          borderTop: "3px solid lightgray",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Button
          fullWidth
          style={{
            color: "gray",
            fontWeight: 700,
          }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          <ExitToAppIcon style={{ fontSize: "1.5rem", color: "#a36e29" }} />
          <p style={{ width: "70%", textAlign: "left", paddingLeft: "20px" }}>
            Logout
          </p>
        </Button>
      </div>
    </div>
  );
};

export default CustomDrawer;
