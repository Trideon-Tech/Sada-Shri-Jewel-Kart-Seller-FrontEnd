import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Stepper from "@mui/joy/Stepper";

const TrackOrderComponent = () => {
  return (
    <div style={{ paddingLeft: "20px", paddingBottom: "50px" }}>
      <Stepper
        orientation="vertical"
        sx={{
          "--Stepper-verticalGap": "2.5rem",
        }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <Step
            key={item}
            indicator={
              <div>
                <StepIndicator
                  style={{ backgroundColor: "#b7b7b7" }}
                  variant={"solid"}
                  color={"neutral"}
                >
                  {" "}
                  <div
                    style={{
                      width: "60%",
                      height: "60%",
                      borderRadius: "30px",
                      backgroundColor: "#00000099",
                    }}
                  />
                </StepIndicator>
              </div>
            }
          >
            <StepButton>
              <div
                style={{
                  width: "100%",
                  paddingLeft: "10px",
                  paddingRight: 0,
                  paddingTop: "10px",
                  display: "flex",
                  justifyContent: "flex-start",
                  height: "max-content",
                  fontWeight: 700,
                  color: "gray",
                }}
              >
                <div style={{ width: "50%", height: "max-content" }}>
                  <p style={{ width: "100%", textAlign: "left" }}>
                    {" "}
                    26th April
                  </p>
                  <p
                    style={{
                      width: "100%",
                      textAlign: "left",
                      color: "#000000bb",
                      fontWeight: "500",
                    }}
                  >
                    A payment of Rs. 539 was processed on razorpay
                  </p>
                </div>
                <p
                  style={{
                    width: "20%",
                    marginLeft: "auto",
                    color: "#000000bb",
                  }}
                >
                  8:46 pm
                </p>
              </div>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default TrackOrderComponent;
