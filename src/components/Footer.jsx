import React from 'react';
import { AppBar, Toolbar, Typography, Button, Divider } from '@mui/material';

function Footer() {
  return (
    <div style={{height:'100px'}}>
      {/* Horizontal line above the footer */}
      <Divider style={{alignContent:'center'}}/>

      {/* Footer */}
      <AppBar position="static" color="default">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          {/* Small text on the left */}
          <Typography variant='heading' style={{fontWeight:'bold'}}>Sada Shri Jewel Kart Pvt. Ltd.</Typography>

          {/* Three text buttons on the right */}
          <div>
            <Button color="inherit">Refund Policy</Button>
            <Button color="inherit">Privacy Policy</Button>
            <Button color="inherit">Shipping & Delivery</Button>
            <Button color="inherit">Terms & Conditions</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;