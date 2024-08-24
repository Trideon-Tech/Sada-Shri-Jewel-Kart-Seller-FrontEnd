import React, { useState } from "react";
import {
  Grid,
  Button,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

import "./registration-address-details.styles.scss";

import { generalToastStyle } from "../../utils/toast.styles";
import InputTextField from "../input-text-field/input-text-field.component";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

const RegistrationAddressDetails = () => {
  let navigate = useNavigate();

  let registeredMobile = localStorage.getItem("mobile");

  const [add1, setAdd1] = useState();
  const [add2, setAdd2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();
  const [nextStepLoading, activateNextStepLoading] = useState(false);

  const onNext = () => {
    if (add1 === "" || typeof add1 === "undefined") {
      toast.warn("Address is required!", generalToastStyle);
    } else if (city === "" || typeof city === "undefined") {
      toast.warn("City Name is required!", generalToastStyle);
    } else if (state === "" || typeof state === "undefined") {
      toast.warn("State Name is required!", generalToastStyle);
    } else if (pincode === "" || typeof pincode === "undefined") {
      toast.warn("Pincode is required!", generalToastStyle);
    } else {
      activateNextStepLoading(true);

      const formData = new FormData();
      if (add2) {
        // 2nd line of address is available
        formData.append("mobile", registeredMobile);
        formData.append("key", "company_address");
        formData.append("add_line_1", add1);
        formData.append("add_line_2", add2);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("pincode", pincode);
      } else {
        // 2nd line of address is not available
        formData.append("mobile", registeredMobile);
        formData.append("key", "company_address");
        formData.append("add_line_1", add1);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("pincode", pincode);
      }

      axios
        .post(
          "https://api.sadashrijewelkart.com/v1.0.0/seller/add.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((_) => {
          activateNextStepLoading(false);
          navigate("/register/bank");
        })
        .catch((error) => {
          console.error("Error:", error);
          activateNextStepLoading(false);
          toast.warn(error.response.data.message, generalToastStyle);
        });
    }
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
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputTextField
            title={"Address 2 (Optional)"}
            value={add2}
            onEdit={(e) => {
              setAdd2(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <InputTextField
            title={"City"}
            value={city}
            onEdit={(e) => {
              setCity(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <InputTextField
            title={"State"}
            value={state}
            onEdit={(e) => {
              setState(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <InputTextField
            title={"Pincode"}
            value={pincode}
            onEdit={(e) => {
              setPincode(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <div className="step-text">
        ** You can add multiple pickup addresses once the company's profile is
        created.
      </div>
      <div className="divider" />
      <div className="actions">
        <Button
          className="btn-secondary"
          disabled={false}
          onClick={() => navigate("register/store")}
        >
          Prev. Step
        </Button>
        <Button className="btn-primary" onClick={onNext}>
          {nextStepLoading ? (
            <ThemeProvider theme={theme}>
              <CircularProgress size={"1.1rem"} />
            </ThemeProvider>
          ) : (
            "Next Step"
          )}
        </Button>
      </div>
    </div>
  );
};

export default RegistrationAddressDetails;
