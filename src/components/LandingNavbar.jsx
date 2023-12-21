import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from '../images/logoWhite.png';
import { useNavigate } from 'react-router-dom';

function LandingNavbar() {
  const navigate = useNavigate();
  
  const handleloginClick = () => {
    // Redirect to the login page
    navigate('/login');
  };

  const handlesignupClick = () => {
    // Redirect to the signup page
    navigate('/signup');
  };


  return (
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none', height:'100px'}}>
      <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div>
        <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', marginRight: '10px', marginLeft: '40px' }}
          />
        </div>
        
        <div>
        <Button style={{ marginRight: '12px', color: 'white'}} onClick={handleloginClick}>Login</Button>
        <Button variant="contained" style={{ marginRight: '80px', backgroundColor: 'white', color: '#A36E29', paddingLeft:'5px', paddingRight:'5px'}} onClick={handlesignupClick}>Contact Us</Button>
        </div>
        
      </Toolbar>
    </AppBar>
  );
}

export default LandingNavbar