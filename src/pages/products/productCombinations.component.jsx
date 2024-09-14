import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ProductCombinations = ({
  tableData,
  tableHeaders,
  gold,
  silver,
  platinum,
  diamond,
  gem,
}) => {
  const isGold = gold || false;
  const isSilver = silver || false;
  const isPlatinum = platinum || false;
  const isDiamond = diamond || false;
  const isGem = gem || false;

  const [combinationsValues, setCombinationValues] = React.useState([]);

  //   const tableHeaders = [
  //     "goldPurity",
  //     "goldType",
  //     "silverPurity",
  //     "Silver Number",
  //   ];

  //   const tableData = [
  //     ["1", "2", "3", "4"],
  //     ["3", "2", "4", "0"],
  //     ["6", "2", "3", "1"],
  //     ["0", "7", "3", "8"],
  //     ["2", "2", "3", "6"],
  //     ["9", "2", "3", "5"],
  //   ];

  const GOLD_MAKING_CHARGES = "gold_making_charges";
  const SILVER_MAKING_CHARGES = "silver_making_charges";
  const PLATINUM_MAKING_CHARGES = "platinum_making_charges";
  const DIAMOND_MAKING_CHARGES = "diamond_making_charges";
  const GEMSTONE_MAKING_CHARGES = "gemstone_making_charges";

  const GOLD_NT_WT = "gold_nt_wt";
  const SILVER_NT_WT = "silver_nt_wt";
  const PLATINUM_NT_WT = "platinum_nt_wt";
  const DIAMOND_NT_WT = "diamond_nt_wt";
  const GEMSTONE_NT_WT = "gemstone_nt_wt";

  console.log("tableData======================>", tableData);
  React.useEffect(() => {
    const dataHolder = [];
    for (let i = 0; i < tableData.length; i++) {
      dataHolder.push({
        total_price: 10000,
        fixed_price: 2000,
        making_charges: {
          gold_making_charges: 0,
          silver_making_charges: 0,
          platinum_making_charges: 0,
          diamond_making_charges: 0,
          gemstone_making_charges: 0,
        },
        net_wt: {
          gold_nt_wt: 0,
          silver_nt_wt: 0,
          platinum_nt_wt: 0,
          diamond_nt_wt: 0,
          gemstone_nt_wt: 0,
        },
        customization_dropdowns: [
          {
            customization_option_id: 1,
          },
          {
            customization_option_id: 3,
          },
        ],
        made_on_oder: 1,
        key: i,
      });
    }
    setCombinationValues(dataHolder);
  }, [tableData]);

  const updateCombinationInputs = (
    index,
    targetKey,
    value,
    makingCharge,
    netWt
  ) => {
    // console.log();
    if (!makingCharge && !netWt) return;
    const temp = combinationsValues[index];
    if (makingCharge) {
      temp["making_charges"][targetKey] = value;
    } else {
      temp["net_wt"][targetKey] = value;
    }

    const tempAll = combinationsValues;
    tempAll[index] = temp;

    console.log("combinationsValues####################>", combinationsValues);
    setCombinationValues(tempAll);
  };

  React.useEffect(() => {
    console.log("combinationsValues===============>", combinationsValues);
  }, [combinationsValues]);

  return (
    <div style={{ overflowX: "scroll", width: "100%", maxWidth: "75vw" }}>
      <TableContainer
        component={Paper}
        style={{ width: "max-content", overflowY: "scroll" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeaders?.map((item) => (
                <TableCell align="right">{item}</TableCell>
              ))}
              {isGold ? (
                <TableCell align="right">
                  Making Charge ( Gold )&nbsp;(Rs)
                </TableCell>
              ) : null}
              {isGold ? (
                <TableCell align="right">
                  Net Weight ( Gold )&nbsp;(gms)
                </TableCell>
              ) : null}

              {isSilver ? (
                <TableCell align="right">
                  Making Charge ( Silver )&nbsp;(Rs)
                </TableCell>
              ) : null}
              {isSilver ? (
                <TableCell align="right">
                  Net Weight ( Silver )&nbsp;(gms)
                </TableCell>
              ) : null}

              {isPlatinum ? (
                <TableCell align="right">
                  Making Charge ( Platinum )&nbsp;(Rs)
                </TableCell>
              ) : null}
              {isPlatinum ? (
                <TableCell align="right">
                  Net Weight ( Platinum )&nbsp;(gms)
                </TableCell>
              ) : null}
              {isDiamond ? (
                <TableCell align="right">
                  Fixed Price ( Diamond )&nbsp;(Rs)
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row?.data?.map((item) => (
                  <TableCell align="right">{item}</TableCell>
                ))}

                {isGold ? (
                  <TableCell align="right">
                    <OutlinedInput
                      id="outlined-basic"
                      variant="outlined"
                      onChange={(event) => {
                        updateCombinationInputs(
                          row.key,
                          GOLD_MAKING_CHARGES,
                          event.target.value,
                          true,
                          false
                        );
                      }}
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                    />
                  </TableCell>
                ) : // <TableCell align="right">
                //   <TextField
                //     id="standard-select-currency"
                //     select
                //     variant="outlined"
                //     fullWidth
                //     defaultValue={"Rs"}
                // onChange={(event) => {
                //   updateCombinationInputs(
                //     row.key,
                //     GOLD_MAKING_CHARGES,
                //     event.target.value,
                //     true,
                //     false
                //   );
                // }}
                //   >
                //     {["Rs", "%"].map((option) => (
                //       <MenuItem key={option} value={option}>
                //         {option}
                //       </MenuItem>
                //     ))}
                //   </TextField>
                // </TableCell>
                null}
                {isGold ? (
                  <TableCell align="right">
                    <OutlinedInput
                      id="outlined-basic"
                      variant="outlined"
                      startAdornment={
                        <InputAdornment position="start">Gms</InputAdornment>
                      }
                      onChange={(event) => {
                        updateCombinationInputs(
                          row.key,
                          GOLD_NT_WT,
                          event.target.value,
                          false,
                          true
                        );
                      }}
                    />
                  </TableCell>
                ) : null}

                {isSilver ? (
                  <TableCell align="right">
                    <TextField
                      id="standard-select-currency"
                      select
                      variant="outlined"
                      fullWidth
                      onChange={(event) => {
                        updateCombinationInputs(
                          row.key,
                          SILVER_MAKING_CHARGES,
                          event.target.value,
                          true,
                          false
                        );
                      }}
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                    ></TextField>
                  </TableCell>
                ) : null}
                {isSilver ? (
                  <TableCell align="right">
                    <OutlinedInput
                      id="outlined-basic"
                      variant="outlined"
                      startAdornment={
                        <InputAdornment position="start">Gms</InputAdornment>
                      }
                      onChange={(event) => {
                        updateCombinationInputs(
                          row.key,
                          SILVER_NT_WT,
                          event.target.value,
                          false,
                          true
                        );
                      }}
                    />
                  </TableCell>
                ) : null}

                {isPlatinum ? (
                  <TableCell align="right">
                    <TextField
                      id="standard-select-currency"
                      select
                      variant="outlined"
                      fullWidth
                      defaultValue={"Rs"}
                      onChange={(event) => {
                        updateCombinationInputs(
                          row.key,
                          PLATINUM_MAKING_CHARGES,
                          event.target.value,
                          true,
                          false
                        );
                      }}
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                    ></TextField>
                  </TableCell>
                ) : null}
                {isPlatinum ? (
                  <TableCell align="right">
                    <OutlinedInput
                      id="outlined-basic"
                      variant="outlined"
                      startAdornment={
                        <InputAdornment position="start">Gms</InputAdornment>
                      }
                      onChange={(event) => {
                        updateCombinationInputs(
                          row.key,
                          PLATINUM_NT_WT,
                          event.target.value,
                          false,
                          true
                        );
                      }}
                    />
                  </TableCell>
                ) : null}
                {isDiamond ? (
                  <TableCell align="right">
                    <OutlinedInput
                      id="outlined-basic"
                      variant="outlined"
                      startAdornment={
                        <InputAdornment position="start">Rs</InputAdornment>
                      }
                      onChange={(event) => {
                        updateCombinationInputs(
                          row.key,
                          DIAMOND_MAKING_CHARGES,
                          event.target.value,
                          true,
                          false
                        );
                      }}
                    />
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductCombinations;
