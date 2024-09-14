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

const SilverCustomizations = ({ handlePurityUpdate, customizationOptions }) => {
  const [purity, setPurity] = React.useState([]);
  const handleChange = (event) => {
    setPurity(event.target.value);
  };
  const bisHallMarks = customizationOptions["BIS Hallmark"];

  React.useEffect(() => {
    handlePurityUpdate(purity);
  }, [purity]);

  return (
    <Paper style={{ width: "100%", height: "100%" }}>
      <p style={{ fontSize: "1.2rem", padding: "20px" }}>
        Silver Customizations
      </p>
      <Divider fullWidth />
      <div style={{ margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">BIS Hallmark</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={purity}
          multiple
          fullWidth
          label="BIS HallMark"
          onChange={handleChange}
        >
          {bisHallMarks.map((bisMark) => (
            <MenuItem value={bisMark}>{bisMark}</MenuItem>
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
        <div style={{ width: "45%" }}>
          <InputLabel id="demo-simple-select-label">Weight</InputLabel>
          <OutlinedInput
            fullWidth
            id="outlined-basic"
            variant="outlined"
            endAdornment={<InputAdornment position="end">gms</InputAdornment>}
          />
        </div>
      </div>
    </Paper>
  );
};

export default SilverCustomizations;
