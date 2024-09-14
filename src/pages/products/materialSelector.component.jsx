import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoldCustomizations from "./goldCustomizations.component";
import SilverCustomizations from "./silverCustomizations.component";
import PlatinumCustomizations from "./platinumCustomizations.component";
import DiamondCustomizations from "./diamondCustomizations.component";
import GemCustomizations from "./gemCustomizations.component";
import ProductCombinations from "./productCombinations.component";
import axios from "axios";

function generateCombinations(inputArray) {
  const result = [];

  function combine(current, start) {
    if (current.length === inputArray.length) {
      result.push(current.slice());
      return;
    }

    for (let i = start; i < inputArray[current.length].length; i++) {
      current.push(inputArray[current.length][i]);
      combine(current, start);
      current.pop();
    }
  }

  combine([], 0);
  const objArr = [];
  let counter = 0;
  for (let item of result) {
    objArr.push({
      key: counter++,
      data: item,
    });
  }
  return objArr;
}

const MaterialSelector = () => {
  const [selected, setSelected] = React.useState([]);
  const [goldSelected, setGoldSelected] = React.useState(false);
  const [silverSelected, setSilverSelected] = React.useState(false);
  const [platinumSelected, setPlatinumSelected] = React.useState(false);
  const [diamondSelected, setDiamondSelected] = React.useState(false);
  const [gemSelected, setGemSelected] = React.useState(false);
  const [customizations, setCustomizations] = React.useState([]);

  const [selectedSizes, setSelectedSizes] = React.useState([]);

  const [tableDataPoint, setTableDataPoint] = React.useState();
  const [tableHeaderPoint, setTableHeaderPoint] = React.useState();

  //gold
  const [goldPurity, setGoldPurity] = React.useState([]);
  const [goldType, setGoldType] = React.useState([]);

  //silver
  const [silverPurity, setSilverPurity] = React.useState([]);

  //platinum
  const [platinumPurity, setPlatinumPurity] = React.useState([]);

  //diamond
  const [diamondPurity, setDiamondPurity] = React.useState([]);
  const [diamondCut, setDiamondCut] = React.useState([]);
  const [diamondColor, setDiamondColor] = React.useState([]);

  const [sizeCustomizations, setSizeCustomizations] = React.useState([]);

  React.useEffect(() => {
    getAllCustomizationOptionsPerField();
  }, []);

  const getAllCustomizationOptionsPerField = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `https://api.sadashrijewelkart.com/v1.0.0/seller/product/customization/option/all.php?customization_field=${5}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSizeCustomizations(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching customization options:", error);
      });
  };

  React.useEffect(() => {
    const tableHeaderArr = [];
    const tableDataArr = [];

    //gold
    if (goldPurity.length > 0 && goldSelected) {
      tableHeaderArr.push("Gold Purity");
      tableDataArr.push(goldPurity);
    }
    if (goldType.length > 0 && goldSelected) {
      tableHeaderArr.push("Gold Type");
      tableDataArr.push(goldType);
    }

    //silver
    if (silverPurity.length > 0 && silverSelected) {
      tableHeaderArr.push("Silver Purity");
      tableDataArr.push(silverPurity);
    }

    //platinum
    if (platinumPurity.length > 0 && platinumSelected) {
      tableHeaderArr.push("Platinum Purity");
      tableDataArr.push(platinumPurity);
    }

    //diamond
    if (diamondPurity.length > 0 && diamondSelected) {
      tableHeaderArr.push("Diamond Purity");
      tableDataArr.push(diamondPurity);
    }
    if (diamondCut.length > 0 && diamondSelected) {
      tableHeaderArr.push("Diamond Cut");
      tableDataArr.push(diamondCut);
    }
    if (diamondColor.length > 0 && diamondSelected) {
      tableHeaderArr.push("Diamond Color");
      tableDataArr.push(diamondColor);
    }

    //size
    if (selectedSizes.length > 0) {
      console.log(sizeCustomizations);
      console.log("selectedSizes", selectedSizes);
      tableHeaderArr.push("Size");
      tableDataArr.push(selectedSizes);
    }

    console.log("tableDataArr", tableDataArr);
    console.log("tableHeaderArr", tableHeaderArr);
    const dataCombs = generateCombinations(tableDataArr);
    setTableDataPoint(dataCombs);
    setTableHeaderPoint(tableHeaderArr);
    console.log("dataCombs", dataCombs);
  }, [
    goldPurity,
    goldType,
    silverPurity,
    platinumPurity,
    diamondPurity,
    diamondCut,
    diamondColor,
    selectedSizes,
  ]);

  React.useEffect(() => {
    const arr = [];
    if (goldSelected)
      arr.push(
        <GoldCustomizations
          handlePurityUpdate={setGoldPurity}
          handleTypeUpdate={setGoldType}
        />
      );
    if (silverSelected)
      arr.push(<SilverCustomizations handlePurityUpdate={setSilverPurity} />);
    if (platinumSelected)
      arr.push(
        <PlatinumCustomizations handlePurityUpdate={setPlatinumPurity} />
      );
    if (diamondSelected)
      arr.push(
        <DiamondCustomizations
          handlePurityUpdate={setDiamondPurity}
          handleCutUpdate={setDiamondCut}
          handleColorUpdate={setDiamondColor}
        />
      );
    if (gemSelected) arr.push(<GemCustomizations />);

    setCustomizations(arr);
  }, [
    goldSelected,
    silverSelected,
    platinumSelected,
    diamondSelected,
    gemSelected,
  ]);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div style={{ width: "100%", height: "max-content" }}>
      <p style={{ fontSize: "1.2rem" }}>Select Materials</p>
      <Stack
        direction="row"
        spacing={3}
        style={{
          backgroundColor: "#efefef",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      >
        <Chip
          label="Gold"
          onClick={() => setGoldSelected(!goldSelected)}
          onDelete={handleDelete}
          deleteIcon={<WaterDropIcon style={{ color: "#FFE900" }} />}
          variant={goldSelected ? "contained" : "outlined"}
        />
        <Chip
          label="Silver"
          onClick={() => setSilverSelected(!silverSelected)}
          onDelete={handleDelete}
          deleteIcon={<WaterDropIcon style={{ color: "#C0C0C0" }} />}
          variant={silverSelected ? "contained" : "outlined"}
        />
        <Chip
          label="Platinum"
          onClick={() => setPlatinumSelected(!platinumSelected)}
          onDelete={handleDelete}
          deleteIcon={<WaterDropIcon style={{ color: "white" }} />}
          variant={platinumSelected ? "contained" : "outlined"}
        />
        <Divider orientation="vertical" flexItem />
        <Chip
          label="Diamond"
          onClick={() => setDiamondSelected(!diamondSelected)}
          onDelete={handleDelete}
          deleteIcon={<DiamondIcon style={{ color: "white" }} />}
          variant={diamondSelected ? "contained" : "outlined"}
        />
        <Chip
          label="Gemstone"
          onClick={() => setGemSelected(!gemSelected)}
          onDelete={handleDelete}
          deleteIcon={<FavoriteIcon style={{ color: "green" }} />}
          variant={gemSelected ? "contained" : "outlined"}
        />
      </Stack>
      <p style={{ fontSize: "1.2rem" }}>Select Size</p>

      <Stack
        direction="row"
        spacing={3}
        style={{
          backgroundColor: "#efefef",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          multiple
          value={selectedSizes}
          fullWidth
          label=""
          onChange={(event) => {
            setSelectedSizes(event.target.value);
            console.log("selected size", event.target.value);
          }}
        >
          {sizeCustomizations.map((item) => (
            <MenuItem value={item.name}>{item.name}</MenuItem>
          ))}
        </Select>
      </Stack>
      <Grid container spacing={5}>
        {customizations.map((customization) => (
          <Grid item xs={6}>
            {customization}
          </Grid>
        ))}
      </Grid>
      <Grid>
        {tableHeaderPoint && tableHeaderPoint.length > 0 ? (
          <ProductCombinations
            tableData={tableDataPoint}
            tableHeaders={tableHeaderPoint}
            gold={goldSelected}
            silver={silverSelected}
            platinum={platinumSelected}
            diamond={diamondSelected}
            gem={gemSelected}
          />
        ) : null}
      </Grid>
    </div>
  );
};

export default MaterialSelector;
