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

const DiamondCustomizations = ({
  handlePurityUpdate,
  handleCutUpdate,
  handleColorUpdate,
  customizationOptions,
}) => {
  const [carat, setCarat] = React.useState([]);
  const [cut, setCut] = React.useState([]);
  const [color, setColor] = React.useState([]);

  const caratList = customizationOptions["Carat"];
  const cutList = customizationOptions["Cut"];
  const colorList = customizationOptions["Diamond Color"];

  React.useEffect(() => {
    handlePurityUpdate(carat);
    handleCutUpdate(cut);
    handleColorUpdate(color);
    // handleCustomizationUpdates([carat, type]);
  }, [carat, cut, color]);

  return (
    <Paper style={{ width: "100%", height: "100%" }}>
      <p style={{ fontSize: "1.2rem", padding: "20px" }}>
        Diamond Customizations
      </p>
      <Divider fullWidth />
      <div style={{ margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">Carat</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={carat}
          multiple
          fullWidth
          label="Carat"
          onChange={(event) => setCarat(event.target.value)}
        >
          {caratList.map((carat) => (
            <MenuItem value={carat}>{carat}</MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">Cut</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cut}
          multiple
          fullWidth
          label="Cut"
          onChange={(event) => setCut(event.target.value)}
        >
          {cutList.map((carat) => (
            <MenuItem value={carat}>{carat}</MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">Diamond Color</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          multiple
          value={color}
          fullWidth
          label="Diamond Color"
          onChange={(event) => setColor(event.target.value)}
        >
          {colorList.map((type) => (
            <MenuItem value={type}>{type}</MenuItem>
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
        <div style={{ width: "45%" }}>
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
        </div>
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
        <div style={{ width: "45%" }}>
          <InputLabel id="demo-simple-select-label">Fixed Price</InputLabel>
          <OutlinedInput
            fullWidth
            id="outlined-basic"
            variant="outlined"
            startAdornment={<InputAdornment position="end">INR</InputAdornment>}
          />
        </div>
      </div>
    </Paper>
  );
};

export default DiamondCustomizations;
