import React, { useState } from "react";
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

import { borderRadius, display, height, width } from "@mui/system";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);

  const [gstIn, setGstIn] = useState("asdf12325df");
  const [firstName, setFirstName] = useState("Sushovan");
  const [companyTradeName, setCompanyTradeName] = useState("XYZ");
  const [lastName, setLastName] = useState("Paul");
  const [emailId, setEmailId] = useState("sushovanpaul07@gmail.com");
  const [phone, setPhone] = useState("8102535095");
  const [password, setPassword] = useState("abcd1234");

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
                    onClick={() => setEditProfile(!editProfile)}
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
                }}
              >
                <img
                  src={"https://picsum.photos/1200/300"}
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
                    onChange={(event) => {
                      setGstIn(event.target.value);
                    }}
                    style={{ marginRight: "40%", width: "30%" }}
                  />
                  <TextField
                    id="outlined-controlled"
                    label="COMPANY TRADE NAME"
                    value={companyTradeName}
                    onChange={(event) => {
                      setCompanyTradeName(event.target.value);
                    }}
                    style={{ marginRight: "auto", width: "30%" }}
                  />
                </>
              ) : (
                <>
                  <p style={{ fontSize: "1.2rem", width: "60%" }}>
                    <b>GSTIN : </b>12SDAW123
                  </p>
                  <p style={{ fontSize: "1.2rem", marginRight: "auto" }}>
                    <b>COMPANY TRADE NAME : </b>XYZ
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
                    <b>EMAILID : </b>sushovanpaul07@gmail.com
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
                    <b>FIRST NAME : </b>
                    {firstName}
                  </p>
                  <p style={{ fontSize: "1.2rem", marginRight: "auto" }}>
                    <b>LAST NAME : </b>
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
                    label="PASSWORD"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    style={{ marginRight: "40%", width: "30%" }}
                  />
                  <TextField
                    id="outlined-controlled"
                    label="PHONE NUMBER"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                    style={{ marginRight: "auto", width: "30%" }}
                  />
                </>
              ) : (
                <>
                  <p style={{ fontSize: "1.2rem", width: "60%" }}>
                    <b>PASSWORD : </b>
                    {password}
                  </p>
                  <p style={{ fontSize: "1.2rem", marginRight: "auto" }}>
                    <b>PHONE NUMBER : </b>
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
