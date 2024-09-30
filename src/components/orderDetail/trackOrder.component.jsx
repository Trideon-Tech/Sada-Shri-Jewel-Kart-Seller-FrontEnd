import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
const TrackOrderComponent = () => {
  return (
    <div style={{ paddingLeft: "20px" }}>
      <Stepper orientation="vertical">
        {[1, 2, 3, 4, 5].map((item) => (
          <Step
            sx={{
              "&::after": {
                height: "100%",
              },
            }}
            key={item}
            indicator={
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
                ></div>
              </StepIndicator>
            }
          >
            <StepButton>
              <div
                style={{
                  width: "100%",
                  paddingLeft: "10px",
                  paddingBottom: "50px",
                  paddingTop: "20px",
                  paddingRight: 0,
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
                    }}
                  >
                    {" "}
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
