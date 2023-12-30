import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "./shipping.styles.scss";

const Shipping = () => {
  let navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleFooterRedirect = (item) => {
    navigate(`/${item}`);
  };
  
  return (
    <div className="landing">
      {/* Top Section */}
      <AppBar elevation={0} position="static" className="appbar">
        <Toolbar variant="dense" className="toolbar">
          <img
            alt="logo"
            className="logo"
            src={process.env.PUBLIC_URL + "/assets/logo_white.png"}
            onClick={handleLogoClick}
          />
          <div className="btns">
            <Link className="link" to={"/login"}>
              <Button className="btn">Login</Button>
            </Link>
            <Link className="link-primary">
              <Button className="btn">Contact Us</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      {/* Middle Section */}
      <div className="content">
        <div className="top">
          <div
            style={{
              height: "100%",
            }}
          />
          <div className="hero-text">Shipping and Returns</div>
        </div>
        <div className="text">
          {/* <h2><strong>Shipping & Handling</strong></h2> */}
          <p>
            <strong>Shipping:</strong>
          </p><br/>
          <ul>
            <li>
              • <strong>Shipping Time:</strong> Orders are usually processed and
              shipped within 48 hours. Please note personalised items will take
              longer to process. If your order has both personalised and
              non-personalised items, the order will be split, and the
              non-personalised items will be delivered beforehand.
            </li><br/>
            <li>
              • <strong>Shipping Charges:</strong> We offer free shipping on all
              orders over Rs. 449. Please note that we do not offer free
              shipping on international orders and returns.
            </li><br/>
            <li>
              • <strong>Tracking:</strong> You will receive tracking details
              over WhatsApp, email and SMS, once the order is shipped.
            </li><br/>
            <li>
              • In case you’re ordering other items along with personalised or
              Gold jewellery, your order might arrive in parts.
            </li><br/>
          </ul>
            <br/>
          <p>
            <strong>Returns:</strong>
          </p><br/>
          <ul>
            <li>
              • <strong>Return Policy:</strong> We offer a 30-day return policy
              for all unused and unworn items, no questions asked. However,
              please note that the 30-day return does not apply to personalised
              jewellery, perfumes, candles, coins, utensils, and God idols other
              than in cases of defective/spurious products. SADĀSHRĪ JEWELKART
              reserves the right to process refunds after checking the returned
              items. In case you have purchased a SADĀSHRĪ JEWELKART product
              from anywhere other than the SADĀSHRĪ JEWELKART Website, SADĀSHRĪ
              JEWELKART App or SADĀSHRĪ JEWELKART Exclusive Stores, the return
              policies of your source of purchase shall apply. Any shipping
              charges (if paid) at the time of placing the order are non
              refundable in case of returns.
            </li><br/>
            <li>
              • In case of missing items in return orders, i.e., where the
              customer claims to have returned multiple products but actual
              pickup doesn't include all said items, the company has a right to
              deduct an amount up to the full MRP of the missing product from
              the refund amount. This shall extend to promotional products,
              including but not limited to free gifts and silver coins.
            </li><br/>
            <li>
              • <strong>Return Policy:</strong> In case you have requested the
              return of any of your products, the refund of the same shall be
              initiated once we receive the product back in our warehouse.
            </li><br/>
            <li>
              • <strong>Replacement & Exchange:</strong> You can also avail
              replacement or exchange of your order as per your requirements.
              The conditions remain the same as those applicable to returns. The
              replacement will only be shipped after the initial return has been
              picked up or delivered (in the case of Gold items).
            </li><br/>
            <li>
              • <strong>Return Process: </strong>You can initiate a return
              request from our website or app. Alternatively, you can reach out
              to our Customer Support team, and they’ll guide you through the
              process. Once you have booked the return request, we request you
              to be available for the reverse pick-up, and we request you to
              answer calls from the delivery partner. In the absence of your
              availability or inability to answer the calls, the delivery
              partner may, at their discretion, cancel the reverse pick-up. In
              all such cases, the process will have to be re-initiated again,
              and the overall timeline will increase.
            </li><br/>
            <li>
              • Further, please note that while most pin codes are forward and
              reverse serviceable, in rare cases, some pin codes may only be
              forward serviceable and not reverse serviceable. In all such
              cases, we may request you to return the product via an alternate
              courier service, such as India Post and reimburse all reasonable
              shipping costs (up to Rs 70) incurred by you for processing such
              returns.
            </li><br/>
            <li>
              • In case the charges exceed Rs. 70, all charges (return shipping,
              duties, taxes, fees, etc.) in excess of Rs. 70 will be adjusted
              against the customer's refund. In case of non-serviceable pin
              codes, the customer is responsible for returning the jewellery to
              our warehouse and will receive Rs.70 towards shipping charges with
              their refund.
            </li><br/>
            <li>
              • In the unlikely event that you receive an empty parcel or a
              missing product, we would request you to reach out to our customer
              support team for assistance within 48 hours of the package being
              delivered. We will be requiring a 360-degree unpacking video of
              the parcel for us to process the request further. Please note that
              insufficient evidence or visible signs of tampering with the
              packet may result in your claim not being honoured. In all such
              cases, the brand reserves the right to take the final decision.
            </li><br/>
            <li>
              • For more detailed TnCs, please refer to our{" "}
              <a
                href="https://www.sadashrijewelkart.com/pages/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service page
              </a>
              .
            </li>
          </ul>
          <p></p>
        </div>
        <div className="footer">
        <div className="seperator" />
        <div className="items-row">
          <div className="company">Sada Shri Jewel Kart Pvt. Ltd.</div>
          <div className="actions">
            <div
              onClick={() => handleFooterRedirect("privacy")}
              className="action-item"
            >
              Privacy Policy
            </div>
            <div
              onClick={() => handleFooterRedirect("shipping")}
              className="action-item"
            >
              Shipping & Delivery
            </div>
            <div
              onClick={() => handleFooterRedirect("term")}
              className="action-item"
            >
              Terms & Conditions
            </div>
            <div
              onClick={() => handleFooterRedirect("shipping")}
              className="action-item"
            >
              Refund Policy
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Shipping;
