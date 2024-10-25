import { Category, ListAlt } from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button, Divider } from "@mui/material";
import { React } from "react";
import { useNavigate } from "react-router-dom";

import PaymentsLogo from "./payments_logo.png";

import "./drawer.styles.scss";

import DrawerItem from "./item/item.component";

const CustomDrawer = ({ section }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user_data");

  const handleProfileEdit = () => {
    navigate("/profile");
  };

  const imageUrl = process.env.PUBLIC_URL + "/assets/logoNew.png";

  return (
    <div className="drawer-component">
      <div
        className="data"
        style={{
          height: "100%",
          width: "335px",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          alt="logo"
          src={process.env.PUBLIC_URL + "/assets/logo_dark.png"}
          className="logo"
        />
        <Divider />
        <div className="drawer-content">
          <img alt="profile" className="profile" src={imageUrl} />
          <div className="name">{localStorage.getItem("user_name")}</div>
          <div className="edit-option" onClick={handleProfileEdit}>
            Edit
          </div>
        </div>
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
          icon={
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={PaymentsLogo}
                style={{ width: "25px", margin: "auto" }}
              />
            </div>
          }
          section={section}
          clickAction={() => {
            if (section !== "payments") navigate("/payments");
          }}
          isaSubcategory={true}
          isSelected={section === "payments"}
        />
        <div
          style={{
            marginTop: "auto",
            width: "95%",
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
    </div>
  );
};

export default CustomDrawer;
