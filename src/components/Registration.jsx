import React from 'react';
import RegistrationNavbar from './RegistrationNavbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';

function Registration() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [step, setStep] = React.useState(1);
  
    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const handleNext = () => {
      // Add your logic to handle the next step
      setStep(step + 1);
    };
  
    const handleBack = () => {
      // Add your logic to handle going back
      setStep(step - 1);
    };
  
    const isNextButtonDisabled = () => {
      // Add your logic to determine if the "Next" button should be disabled
      return false;
    };

   

  return (
    <div style={{ position: 'relative' }}>
      {/* Vertical color block on the left */}
      <div style={{ backgroundColor: '#A36E29', width: '30%', height: '100vh', position: 'absolute', left: 0 }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        {index <= step ? <DoneIcon style={{ color: 'white' }} /> : <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid white' }} />}
        {index < 5 && <div style={{ width: '1px', height: '20px', backgroundColor: 'white', margin: '0 10px' }} />}
        <Typography variant="caption" style={{ color: 'white' }}>{index === 5 ? null : `Step ${index}`}</Typography>
        </div>
        ))}
      </div>
      </div>

      {/* RegistrationNavbar on top of the vertical block */}
      <RegistrationNavbar />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

      {/* Registration form on the right */}
      <div style={{ marginLeft:'40vh', width: '70%', textAlign: 'center', paddingRight: '20px' }}>
        
      <div style={{ width: '70%', margin: 'auto', textAlign: 'left' }}>
      <Typography variant="h4" component="div" style={{ fontWeight: 'bold' }}>
        User Registration
      </Typography>
      <Typography variant="body2" style={{ marginBottom: '20px' }}>
        {step}/5
      </Typography>

      <form>
        {step === 1 && (
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <TextField
              id="outlined-firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              style={{ marginRight: '10px' }}
            />
            <TextField
              id="outlined-lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
            />
          </div>
        )}

        {step === 1 && (
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <TextField
              id="outlined-email"
              label="Email"
              variant="outlined"
              fullWidth
              style={{ marginRight: '10px' }}
            />
            <TextField
              id="outlined-otp"
              label="OTP"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={handleTogglePasswordVisibility}
                    style={{ minWidth: 'auto', padding: '6px' }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                ),
              }}
            />
          </div>
        )}

        {/* Add more steps as needed */}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {step > 1 && (
            <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 5 && (
            <Button
              variant="contained"
              style={{backgroundColor:'#A36E29'}}
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
      </div>
    </div>
    </div>
  );
}

export default Registration;


