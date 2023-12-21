import React from "react";
import { createTheme, ThemeProvider, OutlinedInput } from "@mui/material";

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

const InputTextField = ({ title, value, onEdit, adornment }) => {
  return (
    <div className="input-text-field">
      <div className="label">{title}</div>
      <ThemeProvider theme={theme}>
        <OutlinedInput
          className="field"
          value={value}
          onChange={onEdit}
          endAdornment={adornment}
        />
      </ThemeProvider>
    </div>
  );
};

export default InputTextField;
