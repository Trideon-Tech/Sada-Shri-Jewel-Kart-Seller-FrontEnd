const MetricBoxComponent = ({ heading, metric }) => {
  return (
    <div
      style={{
        width: "90%",
        height: "100%",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 0 20px 1px #00000030",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        border: "7px solid #D9D9D9",
      }}
    >
      <p
        style={{
          margin: 0,
          textAlign: "center",
          fontSize: "2.3rem",
          fontWeight: 500,
          color: "gray",
        }}
      >
        {heading}
      </p>
      <p
        style={{
          margin: 0,
          textAlign: "center",
          fontSize: "5rem",
          fontWeight: 800,
          color: "gray",
        }}
      >
        {metric}
      </p>
    </div>
  );
};

export default MetricBoxComponent;
