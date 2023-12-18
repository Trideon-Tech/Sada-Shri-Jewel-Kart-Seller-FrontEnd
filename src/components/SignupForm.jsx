// src/components/SignupForm.js
import React from 'react';
import { Typography, Button, TextField, Grid } from '@mui/material';
import OtpVerificationDialog from './OtpVerificationDialog';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

const SignupForm = ({ activeStep, handleNext, handleBack }) => {
  const [name, setName] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [otpDialogOpen, setOtpDialogOpen] = React.useState(false);

  const handleVerifyOtp = () => {
    // Implement OTP verification logic here
    // For simplicity, just open the dialog
    setOtpDialogOpen(true);
  };

  const handleOtpDialogClose = () => {
    setOtpDialogOpen(false);
  };

  return (
    <form>
      <Typography variant="h6" align="center" gutterBottom>
        {steps[activeStep]}
      </Typography>
      {activeStep === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              fullWidth
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth onClick={handleBack} variant="outlined">
              Back
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth onClick={handleVerifyOtp} variant="contained" color="primary">
              Verify Mobile
            </Button>
          </Grid>
        </Grid>
      )}
      {/* Add other steps similarly */}
      <OtpVerificationDialog open={otpDialogOpen} handleClose={handleOtpDialogClose} />
    </form>
  );
};

export default SignupForm;
