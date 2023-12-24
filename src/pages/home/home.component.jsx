import React from 'react';
import { Grid, Typography } from '@mui/material';
import './home.styles.scss';

function Home() {
  return (
    <Grid container className="container">
      <Grid item xs={12}>
        <img
          alt="logo"
          src={process.env.PUBLIC_URL + "/assets/Animation.gif"}
          className="loading-gif"
        />
      </Grid>
      <Grid item xs={12} className="text-block">
        <Typography variant="body1">
          Please wait!! We will update you once the admin approves.
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Home;