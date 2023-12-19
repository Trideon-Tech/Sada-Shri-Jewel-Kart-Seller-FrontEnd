import React from 'react'
import LandingNavbar from './LandingNavbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import shortlogo from '../images/shortlogo.png';
import bg from '../images/bg-1.png'
import { useNavigate } from 'react-router-dom';


function LandingPage() {
  const navigate = useNavigate();

  const handleletsgetstartedClick = () => {
    // Redirect to the learn more page (replace '/learn-more' with your actual route)
    navigate('/signup');
  };
  const handlepolicyClick = () => {
    navigate('/policies')
  };
  
  return (
    <div style={{backgroundImage:`url(${bg})`, backgroundSize: 'cover'}}>
    <LandingNavbar />
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      {/* Text content on the left */}
      <div style={{display: 'flex', flexDirection: 'column', alignItems:'flex-start', marginLeft:'40px'}}>
        <Typography variant="h2" component="div">
          Let's Begin  
        </Typography>
        <Typography style={{marginTop:'20px'}} variant="h5" component="div">
          Additional text goes here.
        </Typography>
        <Button color="inherit" style={{ color:'white', backgroundColor: '#A36E29', marginTop: '20px', padding: '10px'}} onClick={handleletsgetstartedClick}>
          Lets get Started 
        </Button>
        <Button color="inherit" style={{ color:'white', backgroundColor: '#A36E29', marginTop: '20px', padding: '10px'}} onClick={handlepolicyClick}>
          Policies 
        </Button>
      </div>

      {/* Image on the right */}
      <div>
      <img
        src={shortlogo}
        alt="Image"
        style={{ height: '500px', width: 'auto', marginLeft: '20px', marginRight: '60px' }}
      />
      </div>
    </div>
    </div>
  );
}

export default LandingPage