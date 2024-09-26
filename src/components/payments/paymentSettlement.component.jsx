import {
  Box,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Stack } from "@mui/system";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const PaymentSettlementModal = ({ modalOpen, setModalOpen, orderList }) => {
  const [vendorName, setVendorName] = useState([]);
  const [selectedOrderName, setselectedOrderName] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const theme = useTheme();
  const handleDelete = (item) => {
    setselectedOrderName(selectedOrderName.filter((order) => order !== item));
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setVendorName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    console.log("selectedOrderName", selectedOrderName);
    const prices = selectedOrderName.map((order) => Number(order.order_price));
    setTotalAmount(
      numberWithCommas(prices.reduce((prev, curr) => prev + curr, 0))
    );
  }, [selectedOrderName]);

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          borderRadius: "20px",
          position: "absolute",
          padding: "25px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "0px solid white",
          width: "50%",
          height: 540,
          bgcolor: "background.paper",
          border: "2px solid #fff",
        }}
      >
        <p
          style={{
            fontSize: "1.7rem",
            margin: 0,
            fontWeight: "bold",
            width: "95%",
            margin: "auto",
          }}
        >
          Settle Payment
        </p>

        <div
          style={{
            width: "95%",

            margin: "auto",
            display: "flex",
            justifyItems: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              marginBottom: "15px",
              marginTop: "30px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label">
                Select Vendor
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                fullWidth
                value={vendorName}
                onChange={handleChange}
                input={<OutlinedInput label="Select Vendor" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              marginBottom: "15px",
              width: "100%",
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label">
                Select Order You Want to settle
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                fullWidth
                value={selectedOrderName}
                onChange={(event) => setselectedOrderName(event.target.value)}
                input={
                  <OutlinedInput label="Select Order You Want to settle" />
                }
                MenuProps={MenuProps}
              >
                {orderList.map((order) => (
                  <MenuItem key={order.product_name} value={order}>
                    {order.product_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div
          style={{
            width: "95%",
            display: "flex",
            margin: "auto",
            marginBottom: "30px",
            marginTop: "10px",
          }}
        >
          <Stack direction="row" spacing={1}>
            {selectedOrderName.map((order) => (
              <Chip
                label={`${order.id}: Rs ${numberWithCommas(
                  Number(order.order_price)
                )}`}
                variant="outlined"
                style={{
                  padding: "10px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  borderRadius: "50px",
                }}
                onDelete={() => handleDelete(order)}
              />
            ))}
          </Stack>
        </div>
        <div
          style={{
            width: "95%",
            display: "flex",
            margin: "auto",
            marginBottom: "30px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              width: "340px",
              height: "60px",
              borderRadius: "10px",
              border: "2px solid lightgray",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              fontSize: "1.3rem",
            }}
          >
            <p style={{ fontSize: "1rem" }}>Total Amount:</p>
            <p>
              <b>Rs {totalAmount}</b>
            </p>
          </div>
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <Button
            style={{
              marginLeft: "auto",
              width: "150px",
              height: "50px",
              color: "black",
              border: "0px",
              fontWeight: 600,
            }}
            variant="outlined"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            style={{
              marginLeft: "20px",
              width: "250px",
              height: "50px",
              color: "white",
              backgroundColor: "#A36E29",
              fontWeight: 600,
            }}
          >
            Pay Now
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default PaymentSettlementModal;
