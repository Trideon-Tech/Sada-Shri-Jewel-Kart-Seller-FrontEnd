import React, { useState } from "react";
import {
  Button,
  Grid,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./registration-bank-details.styles.scss";

import { generalToastStyle } from "../../utils/toast.styles";
import InputTextField from "../input-text-field/input-text-field.component";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});
function isNumeric(string) {
  const regex = /^\d+$/;
  return regex.test(string);
}
const RegistrationBankDetails = () => {
  let navigate = useNavigate();

  let registeredMobile = localStorage.getItem("mobile");

  const [accountHolderName, setAccountHolderName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [ifsc, setIfsc] = useState();
  const [bankName, setBankName] = useState();
  const [nextStepLoading, activateNextStepLoading] = useState(false);

  const onNext = () => {
    if (accountHolderName === "" || typeof accountHolderName === "undefined") {
      toast.warn("Account Holder Name is required!", generalToastStyle);
    } else if (accountNumber === "" || typeof accountNumber === "undefined") {
      toast.warn("Account Number is required!", generalToastStyle);
    } else if (ifsc === "" || typeof ifsc === "undefined") {
      toast.warn(
        "IFSC Code is mandatory for doing any type of transactions!",
        generalToastStyle
      );
    } else if (bankName === "" || typeof bankName === "undefined") {
      toast.warn("Bank Name is required!", generalToastStyle);
    } else if (!isNumeric(accountNumber)) {
      return toast.warn("Invalid Account Number !", generalToastStyle);
    } else {
      activateNextStepLoading(true);

      const formData = new FormData();
      formData.append("mobile", registeredMobile);
      formData.append("key", "company_bank_account");
      formData.append("ac_holder_name", accountHolderName);
      formData.append("ac_number", accountNumber);
      formData.append("ac_ifsc", ifsc);
      formData.append("ac_bank_name", bankName);

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
          localStorage.clear();
          activateNextStepLoading(false);
          navigate("/staging");
        })
        .catch((error) => {
          console.error("Error:", error);
          activateNextStepLoading(false);
          toast.warn(error.response.data.message, generalToastStyle);
        });
    }
    // const formData = new FormData();
    // formData.append("mobile", registeredMobile);
    // formData.append("accountNumber", accountNumber);
    // formData.append("accountHolderName", accountHolderName);
    // formData.append("ifsc", ifsc);
    // formData.append("bankName", bankName);
    // formData.append("key", "company_bank_account");
    // axios
    //   .post("https://api.sadashrijewelkart.com/v1.0.0/seller/add.php", formData)
    //   .then((response) => {
    //     // Handle the response
    //     console.log("Response:", response.data);
    //     navigate("/home");
    //   })
    //   .catch((error) => {
    //     // Handle errors
    //     console.error("Error:", error);
    //   });
  };
  return (
    <div className="registration-bank-details">
      <ToastContainer />
      <div className="step-text">Step 5/5</div>
      <div className="heading">Bank Details</div>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <InputTextField
            title={"Account Holder Name"}
            value={accountHolderName}
            onEdit={(e) => {
              setAccountHolderName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"Account Number"}
            value={accountNumber}
            onEdit={(e) => setAccountNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"IFSC Code"}
            value={ifsc}
            onEdit={(e) => setIfsc(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <InputTextField
            title={"Bank Name"}
            value={bankName}
            onEdit={(e) => setBankName(e.target.value)}
          />
        </Grid>
      </Grid>
      <div className="step-text">
        ** You can add multiple bank accounts once the company's profile is
        created.
      </div>
      <div className="divider" />
      <div className="actions">
        <Button
          className="btn-secondary"
          disabled={false}
          onClick={() => navigate("register/address")}
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

export default RegistrationBankDetails;
