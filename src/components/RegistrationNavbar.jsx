// RegistrationNavbar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from '../images/logoWhite.png';
import { useNavigate } from 'react-router-dom';

function RegistrationNavbar() {
  const navigate = useNavigate();

  const handleloginClick = () => {
    // Redirect to the login page
    navigate('/login');
  };

  const handlesignupClick = () => {
    // Redirect to the signup page
    navigate('/register');
  };

  return (
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          {/* Move logo into the RegistrationNavbar */}
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px', marginLeft: '40px' }} />
        </div>
        <div>
          <Button style={{ marginRight: '12px', color: '#A36E29' }} onClick={handleloginClick}>
            Login
          </Button>
          <Button
            variant="contained"
            style={{ marginRight: '80px', backgroundColor: '#A36E29', color: 'white', paddingLeft: '5px', paddingRight: '5px' }}
            onClick={handlesignupClick}
          >
            Contact Us
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default RegistrationNavbar;
