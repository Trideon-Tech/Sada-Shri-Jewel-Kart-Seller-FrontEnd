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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const SettlementModal = ({ modalOpen, setModalOpen }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: 800,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "5%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={() => setModalOpen(false)}>
              <CloseIcon style={{ fontSize: "2.5rem" }} />
            </Button>
          </div>
          <div
            style={{
              width: "55%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginRight: "auto",
            }}
          >
            <p style={{ fontWeight: 800 }}>
              <b>Order : SS1J2340K</b>
            </p>
            <p style={{ fontWeight: 800, color: "gray" }}>
              02/10/2024 at 4:15pm
            </p>
          </div>
          <div
            style={{
              width: "20%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginRight: "auto",
            }}
          >
            <p style={{ fontWeight: 800, color: "gray" }}>SETTLEMENT ID</p>
            <p>
              <b>123GJRG3SEQ</b>
            </p>
          </div>
          <div
            style={{
              width: "12%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginLeft: "auto",
              marginRight: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontWeight: 800, color: "gray" }}>STATUS:</p>
              <p
                style={{
                  backgroundColor: "#F99B1CDF",
                  padding: "10px",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Pending
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontWeight: 800, color: "gray" }}>PAYMENT:</p>
              <p style={{}}>
                <b>5,400</b>
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <div
          style={{
            width: "100%",

            padding: "50px",
            paddingTop: "25px",
            paddingBottom: "25px",
          }}
        >
          <p style={{ fontWeight: 800, fontSize: "1.5rem" }}>
            Settlement Details
          </p>
        </div>

        <div
          style={{
            width: "100%",
            minHeight: "250px",
            display: "flex",
            padding: "50px",
            paddingTop: "0px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "48%",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Type
              </p>
              <p
                style={{
                  width: "75%",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                Normal Settlement
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Period
              </p>
              <p
                style={{
                  width: "75%",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                02/10/2024 at 4:15pm
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Account
              </p>
              <p
                style={{
                  width: "75%",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                *********SSFDF
              </p>
            </div>
          </div>

          <div
            style={{
              width: "48%",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                UTR No.
              </p>
              <p
                style={{
                  width: "75%",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                AXIS12423502433457394350
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                Setted On
              </p>
              <p
                style={{
                  width: "75%",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                02/10/2024 at 4:15pm
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  width: "200px",
                  fontWeight: 800,
                  color: "gray",
                  fontSize: "1.1rem",
                }}
              >
                IFSC CODE
              </p>
              <p
                style={{
                  width: "75%",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                BOB0VJRAN120
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",

            padding: "50px",
            paddingTop: "25px",
            paddingBottom: "25px",
          }}
        >
          <p style={{ fontWeight: 800, fontSize: "1.5rem" }}>
            Settlement Against Orders
          </p>
        </div>
        <Divider />
        <TableContainer
          component={Card}
          elevation={4}
          style={{
            width: "90%",
            margin: "auto",
            borderRadius: "20px",
            marginTop: "50px",
          }}
        >
          <Table sx={{ minWidth: "650" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <b>Order Id</b>
                </TableCell>
                <TableCell align="left">
                  <b>Date</b>
                </TableCell>
                <TableCell align="left">
                  <b>Order Item</b>
                </TableCell>
                <TableCell align="left">
                  <b>Price&nbsp;(Rs)</b>
                </TableCell>
                <TableCell align="left">
                  <b>Status</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                {
                  id: "SS190366",
                  date: "12-01-2024 12:00",
                  orderName: "Margaret Gold Ring, 16mm",
                  price: "16,500",
                  status: "UNFULFILLED",
                },
                {
                  id: "SS190366",
                  date: "12-01-2024 12:00",
                  orderName: "Margaret Gold Ring, 16mm",
                  price: "16,500",
                  status: "UNFULFILLED",
                },
              ].map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">{row.orderName}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">
                    <b style={{ color: "gray" }}>{row.status}</b>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default SettlementModal;
