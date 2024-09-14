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

const GoldCustomizations = ({ handlePurityUpdate, handleTypeUpdate }) => {
  const [age, setAge] = React.useState("");

  const [carat, setCarat] = React.useState([]);
  const [type, setType] = React.useState([]);

  const caratList = [
    "24K Gold Purity - 100% Gold",
    "22K Gold Purity - 91.67% Gold",
    "18K Gold Purity - 75% Gold",
    "14K Gold Purity - 58.3% Gold",
  ];

  const goldTypeList = ["Yellow Gold", "Rose Gold", "White Gold"];

  React.useEffect(() => {
    handleTypeUpdate(type);
    handlePurityUpdate(carat);
    // handleCustomizationUpdates([carat, type]);
  }, [carat, type]);

  return (
    <Paper style={{ width: "100%", height: "100%" }}>
      <p style={{ fontSize: "1.2rem", padding: "20px" }}>Gold Customizations</p>
      <Divider fullWidth />
      <div style={{ margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">Purity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          multiple
          value={carat}
          fullWidth
          label="Purity"
          onChange={(event) => setCarat(event.target.value)}
        >
          {caratList.map((carat) => (
            <MenuItem value={carat}>{carat}</MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">Gold type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          multiple
          value={type}
          fullWidth
          label="Gold Type"
          onChange={(event) => setType(event.target.value)}
        >
          {goldTypeList.map((type) => (
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

export default GoldCustomizations;
