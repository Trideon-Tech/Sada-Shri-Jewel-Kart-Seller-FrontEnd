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

const InputTextField = ({ title, value, onEdit, adornmentType, adornment }) => {
  let customizeAdornment = null;

  // Determine adornment based on adornmentType
  if (adornmentType === 'rupees') {
    customizeAdornment = <InputAdornment position="start">₹</InputAdornment>;
  } else if (adornmentType === 'grams') {
    customizeAdornment = <InputAdornment position="end">gm</InputAdornment>;
  } else if (adornmentType === 'mm') {
    customizeAdornment = <InputAdornment position="end">mm</InputAdornment>;
  } else if (adornmentType === 'inch') {
    customizeAdornment = <InputAdornment position="end">inch</InputAdornment>;
  } else if (adornmentType === 'kt') {
    customizeAdornment = <InputAdornment position="end">KT</InputAdornment>;
  }
  return (
    <div className="input-text-field">
      <div className="label">{title}</div>
      <ThemeProvider theme={theme}>
        <OutlinedInput
          className="field"
          value={value}
          onChange={onEdit}
          startAdornment={adornmentType === 'rupees' ? customizeAdornment : null}
          endAdornment={ adornment ? adornment : adornmentType !== 'rupees' ? customizeAdornment : null}
        />
      </ThemeProvider>
    </div>
  );
};

export default InputTextField;
