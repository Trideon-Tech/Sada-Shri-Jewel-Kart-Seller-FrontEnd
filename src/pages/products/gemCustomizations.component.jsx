import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import TextField from "@mui/material/TextField";
import { Divider, InputAdornment, OutlinedInput } from "@mui/material";
import { padding } from "@mui/system";

const GemCustomizations = ({
  customizationOptions,
  handleNameUpdate,
  handleQuantityUpdate,
}) => {
  const [gemName, setGemName] = React.useState([]);
  const [gemQuantity, setGemQuantity] = React.useState([]);

  const cutList = ["Ideal Cut", "Shallow Cut", "Deep Cut"];

  const nameList = customizationOptions["Name"];
  const numberList = customizationOptions["Quantity"];

  React.useEffect(() => {
    handleNameUpdate(gemName);
    handleQuantityUpdate(gemQuantity);
  }, [gemName, gemQuantity]);

  return (
    <Paper style={{ width: "100%", height: "100%" }}>
      <p style={{ fontSize: "1.2rem", padding: "20px" }}>
        Gemstone Customizations
      </p>
      <Divider fullWidth />
      <div style={{ margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">Gemstone Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gemName}
          multiple
          fullWidth
          label="Name"
          onChange={(event) => setGemName(event.target.value)}
        >
          {nameList.map((name) => (
            <MenuItem value={name}>{name}</MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gemQuantity}
          multiple
          fullWidth
          label="Quantity"
          onChange={(event) => setGemQuantity(event.target.value)}
        >
          {numberList.map((num) => (
            <MenuItem value={num}>{num}</MenuItem>
          ))}
        </Select>
      </div>

      <div
        style={{
          width: "calc(100% - 40px)",
          margin: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <div style={{ width: "45%" }}>
          <InputLabel id="demo-simple-select-label">Height</InputLabel>
          <OutlinedInput
            fullWidth
            id="outlined-basic"
            variant="outlined"
            endAdornment={<InputAdornment position="end">mm</InputAdornment>}
          />
        </div>
        <div style={{ width: "45%" }}>
          <InputLabel id="demo-simple-select-label">Width</InputLabel>
          <OutlinedInput
            fullWidth
            id="outlined-basic"
            variant="outlined"
            endAdornment={<InputAdornment position="end">mm</InputAdornment>}
          />
        </div> */}
      </div>
      <div
        style={{
          width: "calc(100% - 40px)",
          margin: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <div style={{ width: "45%" }}>
          <InputLabel id="demo-simple-select-label">Fixed Price</InputLabel>
          <OutlinedInput
            fullWidth
            id="outlined-basic"
            variant="outlined"
            startAdornment={<InputAdornment position="end">INR</InputAdornment>}
          />
        </div> */}
      </div>
    </Paper>
  );
};

export default GemCustomizations;
