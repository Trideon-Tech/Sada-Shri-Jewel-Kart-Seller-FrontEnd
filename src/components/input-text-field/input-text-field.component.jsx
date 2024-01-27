import React from "react";
import { createTheme, ThemeProvider, OutlinedInput, InputAdornment } from "@mui/material";

import "./input-text-field.styles.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a36e29",
    },
  },
  typography: {
    fontFamily: '"Work Sans", sans-serif',
  },
});

const InputTextField = ({ title, value, onEdit, adornmentType }) => {
  let adornment = null;

  // Determine adornment based on adornmentType
  if (adornmentType === 'rupees') {
    adornment = <InputAdornment position="start">₹</InputAdornment>;
  } else if (adornmentType === 'grams') {
    adornment = <InputAdornment position="end">gm</InputAdornment>;
  } else if (adornmentType === 'mm') {
    adornment = <InputAdornment position="end">mm</InputAdornment>;
  } else if (adornmentType === 'inch') {
    adornment = <InputAdornment position="end">inch</InputAdornment>;
  } else if (adornmentType === 'kt') {
    adornment = <InputAdornment position="end">kt</InputAdornment>;
  }
  return (
    <div className="input-text-field">
      <div className="label">{title}</div>
      <ThemeProvider theme={theme}>
        <OutlinedInput
          className="field"
          value={value}
          onChange={onEdit}
          startAdornment={adornmentType === 'rupees' ? adornment : null}
          endAdornment={adornmentType !== 'rupees' ? adornment : null}
        />
      </ThemeProvider>
    </div>
  );
};

export default InputTextField;
