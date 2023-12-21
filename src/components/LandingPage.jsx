import React from "react";
import LandingNavbar from "./LandingNavbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import shortlogo from "../images/jwellery.png";
import bg from "../images/bg-block.png";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Footer from "./Footer";

function LandingPage() {
  const navigate = useNavigate();

  const handleletsgetstartedClick = () => {
    // Redirect to the learn more page (replace '/learn-more' with your actual route)
    navigate("/register");
  };
  const handlepolicyClick = () => {
    navigate("/policies");
  };

  const boldStyle = {
    fontWeight: "bold",
  };

  const height = {
    height: "calc(100vh-200px)",
  };

  return (
    <div>
      <div style={{ height: { height }, position: "relative" }}>
        <div
          style={{
            backgroundImage: `url(${bg})`,
            width: "100%",
            height: "45vh",
          }}
        >
          <LandingNavbar />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            {/* Text content on the left */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: "80px",
              }}
            >
              <Typography
                variant="h3"
                component="div"
                style={{ textAlign: "left", color: "white", fontWeight:'bold'}}
              >
                Open your online store <br /> with us.
              </Typography>
              {/* <Typography style={{marginTop:'20px'}} variant="h5" component="div">
          Additional text goes here.
        </Typography> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button
                  color="inherit"
                  style={{
                    color: "white",
                    backgroundColor: "#A36E29",
                    marginTop: "60px",
                    padding: "10px",
                  }}
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={handleletsgetstartedClick}
                >
                  Let's get Started
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    borderColor: "#A36E29",
                    color: "#A36E29",
                    marginTop: "60px",
                    padding: "10px",
                    marginLeft: "40px",
                  }}
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={handlepolicyClick}
                >
                  Know more
                </Button>
              </div>
              {/* <Button color="inherit" style={{ color:'white', backgroundColor: '#A36E29', marginTop: '20px', padding: '10px'}} onClick={handlepolicyClick}>
          Policies 
        </Button> */}
            </div>

            {/* Image on the right */}
            <div>
              <img
                src={shortlogo}
                alt="Image"
                style={{
                  height: "400px",
                  width: "auto",
                  marginLeft: "20px",
                  marginRight: "80px",
                  align: "center",
                }}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: "60px",
              marginLeft: "200px",
              marginRight: "200px",
            }}
          >
            <h4 style={{ marginBottom: "10px" }}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim
              ad " minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquipex ea commodo consequat.
            </h4>
            <h4 style={{marginBottom:'20px', fontWeight:'bold'}}>
              Shubham Mazumdar <br /> Founder of www.meetshubham.com{" "}
            </h4>
          </div>
          <Footer style={{ width: "100%"}} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

//position: 'absolute', bottom: 0,
