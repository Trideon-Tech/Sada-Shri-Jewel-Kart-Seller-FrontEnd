import React, { useState } from "react";
import {
  Paper,
  Avatar,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./profile.styles.scss"; 

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // Replace with your primary color
    },
  },
});

const Profile = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://placekitten.com/800/600" // Replace with your default background image URL
  );
  const [logoImage, setLogoImage] = useState(
    "https://placekitten.com/100/100" // Replace with your default logo image URL
  );

  const handleBackgroundChange = () => {
    
  };

  const handleLogoChange = () => {
    
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <div className="profileContainer">
          <img src={backgroundImage} alt="Background" className="profileBackground" />
          <IconButton
            className="editBackgroundIcon"
            onClick={handleBackgroundChange}
          >
            <EditIcon />
          </IconButton>
          <div className="avatarContainer">
            <Avatar
              alt="User Avatar"
              src={logoImage}
              className="avatar"
            />
            <IconButton
              className="editAvatarIcon"
              onClick={handleLogoChange}
            >
              <CameraAltIcon />
            </IconButton>
          </div>
        </div>
        <Paper className="detailsContainer">
          Profile Details
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default Profile;