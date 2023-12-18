// src/components/OtpVerificationDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const OtpVerificationDialog = ({ open, handleClose }) => {
  const [otp, setOtp] = React.useState('');

  const handleVerify = () => {
    // Implement OTP verification logic here
    // Close the dialog after verification
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>OTP Verification</DialogTitle>
      <DialogContent>
        <TextField
          label="Enter OTP"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleVerify} color="primary">
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OtpVerificationDialog;
