import { Grid,Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "./registration-address-details.styles.scss"
import InputTextField from "../input-text-field/input-text-field.component";

const RegistrationAddressDetails = () => {
  let registeredMobile= localStorage.getItem("mobile");
  let navigate = useNavigate();
  const [add1, setAdd1] = useState();
  const [add2, setAdd2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();

  const onNext = () => {
    const formData = new FormData();
    formData.append('mobile', registeredMobile);
    formData.append('add1', add1);
    formData.append('add2', add2);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('pincode', pincode);
    formData.append('key','company_address');

    axios.post('https://api.sadashrijewelkart.com/v1.0.0/seller/add.php', formData)
      .then(response => {
        // Handle the response
        console.log('Response:', response.data);
        navigate("/register/bank");
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
    
  };

  return (
    <div className="registration-address-details">
      <ToastContainer />
      <div className="step-text">Step 4/5</div>
      <div className="heading">Address Details</div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <InputTextField
            title={"Address 1"}
            value={add1}
            onEdit={(e) => {
              setAdd1(e.target.value);
              console.log(add1);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputTextField
            title={"Address 2 (Optional)"}
            value={add2}
            onEdit={(e) => {
              setAdd2(e.target.value);
              console.log(add2);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <InputTextField
            title={"City"}
            value={city}
            onEdit={(e) => {
              setCity(e.target.value);
              console.log(city);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <InputTextField
            title={"State"}
            value={state}
            onEdit={(e) => {
              setState(e.target.value);
              console.log(state);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <InputTextField
            title={"Pincode"}
            value={pincode}
            onEdit={(e) => {
              setPincode(e.target.value);
              console.log(pincode);
            }}
          />
        </Grid>
      </Grid>
      <div className="divider" />
      <div className="actions">
        <Button className="btn-secondary" disabled={true}>
          Prev. Step
        </Button>
        <Button className="btn-primary" onClick={onNext}>
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default RegistrationAddressDetails;