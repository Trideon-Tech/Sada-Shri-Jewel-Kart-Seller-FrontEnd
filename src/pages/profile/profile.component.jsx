import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDrawer from "../../components/drawer/drawer.component";
import "./productpage.styles.scss";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { generalToastStyle } from "../../utils/toast.styles";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(true);

  const [gstIn, setGstIn] = useState("asdf12325df");
  const [firstName, setFirstName] = useState("Sushovan");
  const [companyTradeName, setCompanyTradeName] = useState("XYZ");
  const [lastName, setLastName] = useState("Paul");
  const [emailId, setEmailId] = useState("sushovanpaul07@gmail.com");
  const [phone, setPhone] = useState("8102535095");
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [details, setDetails] = useState();
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newCoverImage, setNewCoverImage] = useState(null);

  const getProfileDetails = () => {
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
        setDetails(response?.data?.response);
        setGstIn(response?.data?.response?.organization?.gstin);
        setFirstName(response?.data?.response?.name.split(/\s+/)[0]);
        setLastName(response?.data?.response?.name.split(/\s+/)[1]);
        setEmailId(response?.data?.response?.organization?.contact_email);
        setPhone(`+${response?.data?.response?.mobile}`);
        setCompanyTradeName(
          response?.data?.response?.organization?.name?.length > 20
            ? response?.data?.response?.organization?.name.substring(0, 20) +
                "..."
            : response?.data?.response?.organization?.name
        );
        setCoverImage(response?.data?.response?.organization?.cover_image);
        setProfileImage(response?.data?.response?.organization?.logo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProfileImage(file);
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewCoverImage(file);
    }
  };

  const updateProfileDetails = () => {
    console.log(
      firstName !== details?.name?.split(" ")[0] ||
        lastName !== details?.name?.split(" ")[1]
    );
    if (newProfileImage || newCoverImage || emailId) {
      const FormData = require("form-data");
      let imageData = new FormData();
      imageData.append("mobile", phone.replace("+91", ""));
      imageData.append("key", "update_company");
      imageData.append("contact", emailId);

      if (newProfileImage) {
        imageData.append("logo", newProfileImage);
      }
      if (newCoverImage) {
        imageData.append("cover_image", newCoverImage);
      }

      axios
        .post(
          "https://api.sadashrijewelkart.com/v1.0.0/seller/add.php",
          imageData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.data.success === 1) {
            getProfileDetails();
            setEditProfile(true);
            setNewProfileImage(null);
            setNewCoverImage(null);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    if (
      firstName !== details?.name?.split(" ")[0] ||
      lastName !== details?.name?.split(" ")[1]
    ) {
      const FormData = require("form-data");
      let data = new FormData();
      data.append("name", `${firstName} ${lastName}`);
      data.append("mobile", phone.replace("+91", ""));
      data.append("type", "update_seller");

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
          if (response.data.success === 1) {
            getProfileDetails();
            setEditProfile(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    toast("Successfully saved!", generalToastStyle);
  };

  return (
    <div className="product-component">
      <ToastContainer />
      <CustomDrawer section={""} />

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
                    onClick={() => {
                      setEditProfile(!editProfile);
                      setNewProfileImage(null);
                      setNewCoverImage(null);
                    }}
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
                    cursor: !editProfile ? "pointer" : "default",
                  }}
                  onClick={() => {
                    if (!editProfile) {
                      document.getElementById("profile-image-input").click();
                    }
                  }}
                >
                  <input
                    type="file"
                    id="profile-image-input"
                    hidden
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    disabled={editProfile}
                  />
                  <img
                    src={
                      newProfileImage
                        ? URL.createObjectURL(newProfileImage)
                        : `https://api.sadashrijewelkart.com/assets/${profileImage}`
                    }
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "100px",
                      backgroundColor: "lightgray",
                    }}
                  />
                </Box>
                <Box
                  style={{
                    width: "100%",
                    cursor: !editProfile ? "pointer" : "default",
                  }}
                  onClick={() => {
                    if (!editProfile) {
                      document.getElementById("cover-image-input").click();
                    }
                  }}
                >
                  <input
                    type="file"
                    id="cover-image-input"
                    hidden
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    disabled={editProfile}
                  />
                  <img
                    src={
                      newCoverImage
                        ? URL.createObjectURL(newCoverImage)
                        : `https://api.sadashrijewelkart.com/assets/${coverImage}`
                    }
                    style={{ width: "100%" }}
                    alt="Cover Image not found!"
                  />
                </Box>
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
                    variant="outlined"
                    label="GSTIN"
                    value={gstIn}
                    disabled
                    onChange={(event) => {
                      setGstIn(event.target.value);
                    }}
                    style={{ marginRight: "40%", width: "30%" }}
                    InputProps={{
                      style: {
                        fontFamily: '"Roboto", sans-serif',
                        color: "#000",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: '"Roboto", sans-serif',
                      },
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="COMPANY TRADE NAME"
                    value={companyTradeName}
                    disabled
                    onChange={(event) => {
                      setCompanyTradeName(event.target.value);
                    }}
                    style={{ marginRight: "auto", width: "30%" }}
                    InputProps={{
                      style: {
                        fontFamily: '"Roboto", sans-serif',
                        color: "#000",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: '"Roboto", sans-serif',
                      },
                    }}
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
                    variant="outlined"
                    label="EMAIL ID"
                    value={emailId}
                    onChange={(event) => {
                      setEmailId(event.target.value);
                    }}
                    style={{ marginRight: "40%", width: "30%" }}
                    InputProps={{
                      style: {
                        fontFamily: '"Roboto", sans-serif',
                        color: "#000",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: '"Roboto", sans-serif',
                      },
                    }}
                  />
                </>
              ) : (
                <>
                  <p style={{ fontSize: "1.2rem", width: "60%" }}>
                    <b style={{ color: "rgba(0,0,0,0.8)" }}>EMAIL ID : </b>
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
                    variant="outlined"
                    label="FIRST NAME"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    style={{ marginRight: "40%", width: "30%" }}
                    InputProps={{
                      style: {
                        fontFamily: '"Roboto", sans-serif',
                        color: "#000",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: '"Roboto", sans-serif',
                      },
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="LAST NAME"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    style={{ marginRight: "auto", width: "30%" }}
                    InputProps={{
                      style: {
                        fontFamily: '"Roboto", sans-serif',
                        color: "#000",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: '"Roboto", sans-serif',
                      },
                    }}
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
                Address Details
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
              <p style={{ fontSize: "1.2rem", width: "60%" }}>
                <b style={{ color: "rgba(0,0,0,0.8)" }}>Add. Line 1 : </b>
                {details?.organization?.addresses[0]?.add_line_1}
              </p>
              <p style={{ fontSize: "1.2rem", marginRight: "auto" }}>
                <b style={{ color: "rgba(0,0,0,0.8)" }}>Add. Line 2 : </b>
                {details?.organization?.addresses[0]?.add_line_2}
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
              <p style={{ fontSize: "1.2rem", width: "60%" }}>
                <b style={{ color: "rgba(0,0,0,0.8)" }}>City : </b>
                {details?.organization?.addresses[0]?.city}
              </p>
              <p style={{ fontSize: "1.2rem", marginRight: "auto" }}>
                <b style={{ color: "rgba(0,0,0,0.8)" }}>State : </b>
                {details?.organization?.addresses[0]?.state}
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
              <p style={{ fontSize: "1.2rem", width: "60%" }}>
                <b style={{ color: "rgba(0,0,0,0.8)" }}>Pincode : </b>
                {details?.organization?.addresses[0]?.pincode}
              </p>
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
                Bank Details
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
              <p style={{ fontSize: "1.2rem", width: "60%" }}>
                <b style={{ color: "rgba(0,0,0,0.8)" }}>
                  Account Holder Name :{" "}
                </b>
                {details?.organization?.banks[0]?.ac_holder_name}
              </p>
              <p style={{ fontSize: "1.2rem", marginRight: "auto" }}>
                <b style={{ color: "rgba(0,0,0,0.8)" }}>Account Number : </b>
                {details?.organization?.banks[0]?.ac_number}
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
              <p style={{ fontSize: "1.2rem", width: "60%" }}>
                <b style={{ color: "rgba(0,0,0,0.8)" }}>IFSC Code : </b>
                {details?.organization?.banks[0]?.ac_ifsc}
              </p>
              <p style={{ fontSize: "1.2rem", marginRight: "auto" }}>
                <b style={{ color: "rgba(0,0,0,0.8)" }}>Bank Name : </b>
                {details?.organization?.banks[0]?.ac_bank_name}
              </p>
            </Box>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
