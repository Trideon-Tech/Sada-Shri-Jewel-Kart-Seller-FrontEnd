const CustomerDetailComponent = ({ userData, orderData }) => {
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
          color: "#a36e29",
          fontWeight: 600,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        {userData?.name}
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
          color: "#a36e29",
          fontWeight: 600,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        {orderData?.user_email}
      </p>

      <p
        style={{
          color: "#a7a7a7",
          fontWeight: 500,
          margin: 0,
          fontSize: "1.2rem",
        }}
      >
        +{orderData?.user_mobile}
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
        <br />
        {userData?.add_line_2} <br />
        {userData?.city} <br /> {userData?.state} <br />
        {userData?.pincode}
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
