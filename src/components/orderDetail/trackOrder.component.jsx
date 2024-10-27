import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Stepper from "@mui/joy/Stepper";

const TrackOrderComponent = ({ logs }) => {
  return (
    <div style={{ paddingLeft: "20px", paddingBottom: "50px" }}>
      <Stepper
        orientation="vertical"
        sx={{
          "--Stepper-verticalGap": "2.5rem",
        }}
      >
        {Object.entries(logs).map(([key, value]) => (
          <Step
            key={key}
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
                    {new Date(key).toLocaleDateString("en-GB")}
                  </p>
                  <p
                    style={{
                      width: "100%",
                      textAlign: "left",
                      color: "#000000bb",
                      fontWeight: "500",
                    }}
                  >
                    {value}
                  </p>
                </div>
                <p
                  style={{
                    width: "20%",
                    marginLeft: "auto",
                    color: "#000000bb",
                  }}
                >
                  {(() => {
                    const date = new Date(key);
                    const hours = String(date.getHours()).padStart(2, "0");
                    const minutes = String(date.getMinutes()).padStart(2, "0");

                    return `${hours}:${minutes}`;
                  })()}
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
