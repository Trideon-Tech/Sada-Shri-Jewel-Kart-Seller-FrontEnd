import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from '../images/Logo.png';
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
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div>
        <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', marginRight: '10px', marginLeft: '12px' }}
          />
        </div>
        
        <div>
        <Button variant="contained"style={{ marginRight: '12px', backgroundColor: '#A36E29'}} onClick={handleloginClick}>Login</Button>
        <Button variant="outlined" style={{ marginRight: '12px', borderColor: '#A36E29', color: '#A36E29'}} onClick={handlesignupClick}>Signup</Button>
        </div>
        
      </Toolbar>
    </AppBar>
  );
}

export default LandingNavbar