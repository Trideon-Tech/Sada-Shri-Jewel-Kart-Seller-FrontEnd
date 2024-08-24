const CustomerDetailComponent = () => {
  return (
    <div
      style={{
        width: "calc(100% - 80px)",
        padding: "40px",
        marginBottom: "30px",
        height: "max-content",
        minHeight: "300px",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <p style={{ fontSize: "1.2rem", fontWeight: "600", margin: 0 }}>Seller</p>
      <p
        style={{
          color: "#3ba0ff",
          fontWeight: 600,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        Sushovan Paul
      </p>

      <p
        style={{
          color: "#a7a7a7",
          fontWeight: 500,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        1 Order
      </p>
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          margin: 0,
          marginTop: "30px",
        }}
      >
        Contact Information
      </p>

      <p
        style={{
          color: "#3ba0ff",
          fontWeight: 600,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        sushovanpaul07#gmail.com
      </p>

      <p
        style={{
          color: "#a7a7a7",
          fontWeight: 500,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        9364724449
      </p>
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          margin: 0,
          marginTop: "30px",
        }}
      >
        Seller Address
      </p>

      <p
        style={{
          color: "#a7a7a7",
          fontWeight: 500,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        HustleHub 1 , 20th Main,<br></br> 2nd Cross, Vagnahalli, <br></br>
        HSR Layout, Bengaluru,<br></br> Karnataka 560202
      </p>

      <p
        style={{
          color: "#a7a7a7",
          fontWeight: 500,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        +91 9364724449
      </p>
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          margin: 0,
          marginTop: "30px",
        }}
      >
        Billing Address
      </p>

      <p
        style={{
          color: "#a7a7a7",
          fontWeight: 500,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        Same as Shipping Address
      </p>
    </div>
  );
};

export default CustomerDetailComponent;
