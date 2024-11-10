import { Divider } from "@mui/material";
import { useState } from "react";

const OrderInfoCard = ({
  orderDetail,
  huidValue,
  setHuidValue,
  setHuidOrderDetailId,
  triggerHuidVerificatiom,
}) => {
  const [showHuidInput, setShowHuidInput] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        marginTop: "30px",
        height: "max-content",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "12px",
          border: "1px solid #e7e7e7",
          overflow: "hidden",
        }}
      >
        <img
          src={`https://api.sadashrijewelkart.com/assets/${orderDetail.images[0]["file"]}`}
          alt=""
          style={{ width: "100%" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          height: "160px",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          marginLeft: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600 }}>
            {orderDetail?.product_name}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "150px",
              padding: "5px",
              border:
                orderDetail?.shipment_status === "ADMIN_INSPECTION_FAILED" ||
                orderDetail?.shipment_status === "ORDER_CANCELED"
                  ? "1px solid red"
                  : orderDetail?.shipment_status === "ORDER_CREATED" ||
                    orderDetail?.shipment_status === "SELLER_VERIFIED" ||
                    orderDetail?.shipment_status === "ADMIN_RECEIVED" ||
                    orderDetail?.shipment_status ===
                      "INSPECTION_FAILED_ORDER_RECEIVED_BY_SELLER"
                  ? "1px solid #F99B1C59"
                  : "1px solid #cffbcf",
              borderRadius: "5px",
              color:
                orderDetail?.shipment_status === "ADMIN_INSPECTION_FAILED" ||
                orderDetail?.shipment_status === "ORDER_CANCELED"
                  ? "red"
                  : orderDetail?.shipment_status === "ORDER_CREATED" ||
                    orderDetail?.shipment_status === "SELLER_VERIFIED" ||
                    orderDetail?.shipment_status === "ADMIN_RECEIVED" ||
                    orderDetail?.shipment_status ===
                      "INSPECTION_FAILED_ORDER_RECEIVED_BY_SELLER"
                  ? "#F99B1C"
                  : "#008000",
            }}
          >
            {orderDetail?.shipment_status === "ORDER_CANCELED"
              ? "Cancelled"
              : orderDetail?.shipment_status === "ADMIN_INSPECTION_FAILED"
              ? "Returned"
              : orderDetail?.shipment_status === "ORDER_CREATED" ||
                orderDetail?.shipment_status ===
                  "INSPECTION_FAILED_ORDER_RECEIVED_BY_SELLER"
              ? "Unfullfilled"
              : orderDetail?.shipment_status === "SELLER_VERIFIED"
              ? "On it's way"
              : orderDetail?.shipment_status === "ADMIN_RECEIVED"
              ? "Received"
              : "Fullfilled"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              margin: 0,
              marginTop: "10px",
              color: "gray",
              lineHeight: "2rem",
              fontWeight: 500,
              fontSize: "1.1rem",
            }}
          >
            Quantity: {orderDetail?.quantity} pcs.
          </div>
          {orderDetail?.shipment_status === "ORDER_CREATED" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {!orderDetail?.verification_details ||
              orderDetail?.verification_details?.length === 0 ? (
                <>
                  {!showHuidInput && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "150px",
                        padding: "5px",
                        paddingTop: "18px",
                        paddingBottom: "18px",
                        backgroundColor: "#A36E29",
                        borderRadius: "5px",
                        color: "white",
                        height: "24px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowHuidInput(true)}
                    >
                      Verify HUID
                    </div>
                  )}

                  {showHuidInput && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter HUID"
                        value={huidValue}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/[^a-zA-Z0-9]/g, "")
                            .toUpperCase();
                          if (value.length <= 6) {
                            setHuidValue(value);
                            // Log the value directly instead of the state variable
                            console.log(value);
                          }
                        }}
                        maxLength={6}
                        style={{
                          padding: "5px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          textTransform: "uppercase",
                        }}
                      />

                      <div
                        style={{
                          backgroundColor: "#A36E29",
                          color: "white",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          textAlign: "center",
                          lineHeight: "30px",
                        }}
                        onClick={async () => {
                          console.log(orderDetail.order_detail_id);
                          setHuidOrderDetailId(
                            () => orderDetail.order_detail_id
                          );
                          console.log(huidValue);
                          triggerHuidVerificatiom();
                        }}
                      >
                        ✓
                      </div>

                      <div
                        style={{
                          backgroundColor: "white",
                          color: "#A36E29",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          textAlign: "center",
                          lineHeight: "30px",
                          border: "2px solid #A36E29",
                        }}
                        onClick={() => {
                          setShowHuidInput(false);
                          setHuidValue("");
                        }}
                      >
                        ✕
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px 15px",
                    backgroundColor: "#cffbcf",
                    borderRadius: "5px",
                    color: "#008000",
                    height: "24px",
                  }}
                >
                  HUID Verified
                </div>
              )}
            </div>
          )}
        </div>
        <p
          style={{
            margin: 0,
            color: "gray",
            fontWeight: 500,
            lineHeight: "2rem",
            fontSize: "1.1rem",
          }}
        >
          Price :{" "}
          <span style={{ color: "black" }}> Rs: {orderDetail?.price}</span>
        </p>
        <p
          style={{
            margin: 0,
            color: "gray",
            fontWeight: 500,
            lineHeight: "2rem",
          }}
        >
          Deliver By: {Date(orderDetail?.estimated_date)}
        </p>
      </div>
    </div>
  );
};

const OrderSummaryComponent = ({
  orderDetails,
  huidValue,
  setHuidValue,
  setHuidOrderDetailId,
  triggerHuidVerificatiom,
}) => {
  return (
    <div
      style={{
        width: "calc(100% )",
        padding: "40px",
        height: "max-content",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <span
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          height: "max-content",
        }}
      >
        <div
          style={{
            fontSize: "2rem",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Order Summary
        </div>
      </span>
      {orderDetails?.map((item) => (
        <OrderInfoCard
          orderDetail={item}
          huidValue={huidValue}
          setHuidValue={setHuidValue}
          setHuidOrderDetailId={setHuidOrderDetailId}
          triggerHuidVerificatiom={triggerHuidVerificatiom}
        />
      ))}

      <div
        style={{
          width: "calc(100% - 20px)",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #e7e7e7",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            color: "#797979",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          <div style={{ width: "25%" }}>
            <p style={{ textAlign: "left" }}>Subtotal</p>
          </div>
          <div style={{ width: "60%" }}>
            <p style={{ textAlign: "left" }}>{orderDetails?.length} Item</p>
          </div>
          <div style={{ width: "15%" }}>
            <p style={{ textAlign: "right" }}>
              Rs:{" "}
              {orderDetails
                .reduce((sum, item) => sum + parseFloat(item.price), 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            color: "#797979",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          <div style={{ width: "25%" }}>
            <p style={{ textAlign: "left" }}>Discount</p>
          </div>
          <div style={{ width: "60%" }}></div>
          <div style={{ width: "15%" }}>
            <p style={{ textAlign: "right" }}>
              - Rs:{" "}
              {(
                parseFloat(orderDetails[0]?.discount_amount) +
                parseFloat(
                  orderDetails[0]?.wallet_transaction?.find(
                    (t) => t.transaction_type === "debit"
                  )?.amount || 0
                )
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <Divider />
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            color: "#797979",
            fontWeight: 500,
            fontSize: "1rem",
            paddingBottom: "10px",
            paddingTop: "10px",
          }}
        >
          <div style={{ width: "25%" }}>
            <p style={{ textAlign: "left" }}>
              <b>Total</b>
            </p>
          </div>
          <div style={{ width: "60%" }}>
            <p style={{ textAlign: "left" }}></p>
          </div>
          <div style={{ width: "15%" }}>
            <p style={{ textAlign: "right" }}>
              <b>Rs: {orderDetails[0]?.amount}.00</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryComponent;
