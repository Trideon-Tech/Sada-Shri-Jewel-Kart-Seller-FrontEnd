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

const PlatinumCustomizations = ({
  handlePurityUpdate,
  customizationOptions,
}) => {
  const [purity, setPurity] = React.useState([]);
  const handleChange = (event) => {
    setPurity(event.target.value);
  };
  const platinumPurity = customizationOptions["Platinum Purity"];

  React.useEffect(() => {
    handlePurityUpdate(purity);
    // handleCustomizationUpdates([carat, type]);
  }, [purity]);

  return (
    <Paper style={{ width: "100%", height: "100%" }}>
      <p style={{ fontSize: "1.2rem", padding: "20px" }}>
        Platinum Customizations
      </p>
      <Divider fullWidth />
      <div style={{ margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">Platinum Purity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          multiple
          value={purity}
          fullWidth
          label="Platinum Purity"
          onChange={handleChange}
        >
          {platinumPurity.map((pure) => (
            <MenuItem value={pure}>{pure}</MenuItem>
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
      {/* <div
        style={{
          width: "calc(100% - 40px)",
          margin: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: "45%" }}>
          <InputLabel id="demo-simple-select-label">Weight</InputLabel>
          <OutlinedInput
            fullWidth
            id="outlined-basic"
            variant="outlined"
            endAdornment={<InputAdornment position="end">gms</InputAdornment>}
          />
        </div>
      </div> */}
    </Paper>
  );
};

export default PlatinumCustomizations;
