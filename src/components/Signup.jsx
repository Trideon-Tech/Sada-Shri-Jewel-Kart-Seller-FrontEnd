import React, { useState } from 'react';
import { CssBaseline, Container, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import SignupForm from './SignupForm';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Signup Process
          </Typography>
          <LinearProgress variant="determinate" value={(activeStep / (steps.length - 1)) * 100} />
          <SignupForm activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;