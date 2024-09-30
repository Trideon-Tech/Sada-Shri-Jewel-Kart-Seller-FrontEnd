import React, { useEffect, useState } from "react";
import {
  Paper,
  Avatar,
  IconButton,
  createTheme,
  ThemeProvider,
  Box,
  Button,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./productpage.styles.scss";
import CustomDrawer from "../../components/drawer/drawer.component";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import SaveIcon from "@mui/icons-material/Save";

import { borderRadius, display, height, positions, width } from "@mui/system";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(true);
  const navigate = useNavigate();

  const [gstIn, setGstIn] = useState("asdf12325df");
  const [firstName, setFirstName] = useState("Sushovan");
  const [companyTradeName, setCompanyTradeName] = useState("XYZ");
  const [lastName, setLastName] = useState("Paul");
  const [emailId, setEmailId] = useState("sushovanpaul07@gmail.com");
  const [phone, setPhone] = useState("8102535095");
  const [password, setPassword] = useState("abcd1234");
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    let data = new FormData();

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.sadashrijewelkart.com/v1.0.0/seller/all.php?type=seller_details",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        setGstIn(response?.data?.response?.gstin);
        setFirstName(response?.data?.response?.name);
        setLastName(response?.data?.response?.name);
        setEmailId(response?.data?.response?.contact_email);
        setPhone(response?.data?.response?.mobile);
        setCompanyTradeName(response?.data?.response?.company_name);
        setCoverImage(response?.data?.response?.cover_image);
        setProfileImage(response?.data?.response?.logo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateProfileDetails = () => {
    console.log("heu");
    const FormData = require("form-data");
    let data = new FormData();
    data.append("name", `${firstName} ${lastName}`);
    data.append("mobile", `${phone}`);
    data.append("email", `${emailId}`);
    data.append("type", "update_seller");

    //call API for OTP verification
    axios
      .post(
        "https://api.sadashrijewelkart.com/v1.0.0/seller/register.php",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.success === 1) {
          // navigate(0);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="product-component">
      <CustomDrawer section={"orders"} />

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          height: "max-content",
          padding: "50px",
          backgroundColor: "#f7f7f7",
        }}
      >
        <p style={{ fontSize: "2rem", fontWeight: 600 }}>Welcome, Seller</p>
        <Box style={{ width: "100%", height: "100%" }}>
          <Paper
            elevation={3}
            style={{
              width: "100%",
              borderRadius: "10px",
              minHeight: "100px",
              height: "max-content",
              marginTop: "30px",
              padding: "30px",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                width: "95%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                Store Details
              </p>

              {editProfile ? (
                <Button
                  style={{ color: "#a36e29", fontWeight: "bold" }}
                  onClick={() => setEditProfile(!editProfile)}
                >
                  <EditOutlinedIcon
                    style={{ fontSize: "1.5rem", color: "#a36e29" }}
                  />
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    style={{
                      color: "#a36e29",
                      border: "1px solid #a36e29",
                      fontWeight: "bold",
                      marginLeft: "auto",
                      marginRight: "10px",
                    }}
                    onClick={() => setEditProfile(!editProfile)}
                  >
                    <DoDisturbAltIcon
                      style={{ fontSize: "1.5rem", color: "#a36e29" }}
                    />
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "#a36e29",
                    }}
                    onClick={() => updateProfileDetails()}
                  >
                    <SaveIcon style={{ fontSize: "1.5rem", color: "white" }} />
                    Save
                  </Button>
                </>
              )}
            </Box>
            <Paper
              elevation={3}
              style={{
                width: "95%",
                height: "300px",
                borderRadius: "10px",
                marginTop: "30px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  width: "calc(100% - 20px)",
                  height: "calc(100% - 20px)",
                  borderRadius: "7px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    width: "150px",
                    height: "150px",
                    backgroundColor: "white",
                    borderRadius: "150px",
                    marginLeft: "40px",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`https://api.sadashrijewelkart.com/assets/${profileImage}`}
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "100px",
                      backgroundColor: "lightgray",
                    }}
                  />
                </Box>
                <img
                  src={`https://api.sadashrijewelkart.com/assets/${coverImage}`}
                  style={{ width: "100%" }}
                />
              </Box>
            </Paper>
            <Box
              style={{
                width: "95%",
                marginTop: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {!editProfile ? (
                <>
                  <TextField
                    id="outlined-controlled"
                    label="GSTIN"
                    value={gstIn}
                    disabled
                    onChange={(event) => {
                      setGstIn(event.target.value);
                    }}
                    style={{ marginRight: "40%", width: "30%" }}
                  />
                  <TextField
                    id="outlined-controlled"
                    label="COMPANY TRADE NAME"
                    value={companyTradeName}
                    disabled
                    onChange={(event) => {
                      setCompanyTradeName(event.target.value);
                    }}
                    style={{ marginRight: "auto", width: "30%" }}
                  />
                </>
              ) : (
                <>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      width: "60%",
                    }}
                  >
                    <b style={{ color: "rgba(0,0,0,0.8)" }}>GSTIN : </b>
                    {gstIn}
                  </p>
                  <p style={{ fontSize: "1.2rem", marginRight: "auto" }}>
                    <b style={{ color: "rgba(0,0,0,0.8)" }}>
                      COMPANY TRADE NAME :{" "}
                    </b>
                    {companyTradeName}
                  </p>
                </>
              )}
            </Box>
            <Box
              style={{
                width: "95%",
                marginTop: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {!editProfile ? (
                <>
                  <TextField
                    id="outlined-controlled"
                    label="EMAILID"
                    value={emailId}
                    onChange={(event) => {
                      setEmailId(event.target.value);
                    }}
                    style={{ marginRight: "40%", width: "30%" }}
                  />
                </>
              ) : (
                <>
                  <p style={{ fontSize: "1.2rem", width: "60%" }}>
                    <b style={{ color: "rgba(0,0,0,0.8)" }}>EMAILID : </b>
                    {emailId}
                  </p>
                </>
              )}
            </Box>
          </Paper>
          <Paper
            elevation={3}
            style={{
              width: "100%",
              minHeight: "100px",
              height: "max-content",
              borderRadius: "10px",
              marginTop: "30px",
              padding: "30px",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                width: "95%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                Profile Details
              </p>
            </Box>

            <Box
              style={{
                width: "95%",
                marginTop: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {!editProfile ? (
                <>
                  <TextField
                    id="outlined-controlled"
                    label="FIRST NAME"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    style={{ marginRight: "40%", width: "30%" }}
                  />
                  <TextField
                    id="outlined-controlled"
                    label="LAST NAME"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    style={{ marginRight: "auto", width: "30%" }}
                  />
                </>
              ) : (
                <>
                  <p style={{ fontSize: "1.2rem", width: "60%" }}>
                    <b style={{ color: "rgba(0,0,0,0.8)" }}>FIRST NAME : </b>
                    {firstName}
                  </p>
                  <p style={{ fontSize: "1.2rem", marginRight: "auto" }}>
                    <b style={{ color: "rgba(0,0,0,0.8)" }}>LAST NAME : </b>
                    {lastName}
                  </p>
                </>
              )}
            </Box>
            <Box
              style={{
                width: "95%",
                marginTop: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {!editProfile ? (
                <>
                  <TextField
                    id="outlined-controlled"
                    label="PHONE NUMBER"
                    disabled
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                    style={{ marginRight: "auto", width: "30%" }}
                  />
                </>
              ) : (
                <>
                  <p style={{ fontSize: "1.2rem", marginRight: "auto" }}>
                    <b style={{ color: "rgba(0,0,0,0.8)" }}>PHONE NUMBER : </b>
                    {phone}
                  </p>
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
