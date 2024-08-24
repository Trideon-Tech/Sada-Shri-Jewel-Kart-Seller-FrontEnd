const CustomerDetailComponent = ({ userData }) => {
  return (
    <div
      style={{
        width: "calc(100% )",
        padding: "40px",
        marginBottom: "30px",
        height: "max-content",
        minHeight: "300px",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <p style={{ fontSize: "1.2rem", fontWeight: "600", margin: 0 }}>
        Customer
      </p>
      <p
        style={{
          color: "#3ba0ff",
          fontWeight: 600,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        {userData?.name}
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
        {userData?.email}
      </p>

      <p
        style={{
          color: "#a7a7a7",
          fontWeight: 500,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        {userData?.mobile}
      </p>
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          margin: 0,
          marginTop: "30px",
        }}
      >
        Shipping Details
      </p>

      <p
        style={{
          color: "#a7a7a7",
          fontWeight: 500,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        {userData?.add_line_1}
        <br></br>
        {userData?.add_line_2} <br></br>
        {userData?.city} {userData?.state}
        {userData?.pincode}
      </p>

      <p
        style={{
          color: "#a7a7a7",
          fontWeight: 500,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        +91 {userData?.mobile}
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
