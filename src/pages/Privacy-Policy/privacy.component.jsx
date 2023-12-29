import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "./privacy.styles.scss";

const PrivacyPolicy = () => {
  let navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
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
          <div className="hero-text">Privacy Policy</div>
        </div>
        <div className="text">
          {/* <h2><strong>Shipping & Handling</strong></h2> */}
          <p>
            <strong>Privacy policy</strong>
          </p>
          <br />
          <ul>
            <li>
              This Privacy Policy describes how your personal information is
              collected, used, and shared when you visit or make a purchase from
              www.sadashrijewelkart.com (the “Site”).
            </li>
            <br />
            <li>
              <strong>PERSONAL INFORMATION WE COLLECT</strong>
            </li>
            <br />
            <li>
              When you visit the Site, we automatically collect certain
              information about your device, including information about your
              web browser, IP address, time zone, and some of the cookies that
              are installed on your device. Additionally, as you browse the
              Site, we collect information about the individual web pages or
              products that you view, what websites or search terms referred you
              to the Site, and information about how you interact with the Site.
              We refer to this automatically-collected information as “Device
              Information”.
            </li>
            <br />
            <li>
              We collect Device Information using the following technologies:{" "}
              <br />• “Cookies” are data files that are placed on your device or
              computer and often include an anonymous unique identifier. For
              more information about cookies, and how to disable cookies, visit
              http://www.allaboutcookies.org. <br />• “Log files” track actions
              occurring on the Site, and collect data including your IP address,
              browser type, Internet service provider, referring/exit pages, and
              date/time stamps.
              <br />• “Web beacons”, “tags”, and “pixels” are electronic files
              used to record information about how you browse the Site.
            </li>
            <br />
            <li>
              Additionally when you make a purchase or attempt to make a
              purchase through the Site, we collect certain information from
              you, including your name, billing address, shipping address,
              payment information (including credit card numbers), email
              address, and phone number. But we do not store your credit card
              and other payment details with us. We refer to this information as
              “Order Information”.
            </li>
            <br />
            <li>
              When we talk about “Personal Information” in this Privacy Policy,
              we are talking both about Device Information and Order
              Information.
            </li>
            <br />
            <li>
              <strong>HOW DO WE USE YOUR PERSONAL INFORMATION?</strong>
            </li>
            <br />
            <li>
              By using the Site or SADĀSHRĪ JEWELKART App and/or purchasing from
              us, you agree to allow your personal information to be used as
              stated below.
            </li>
            <br />
            <li>
              We use the Order Information that we collect generally to fulfil
              any orders placed through the Site (including processing your
              payment information, arranging for shipping, and providing you
              with invoices and/or order confirmations). Additionally, we use
              this Order Information to:
              <br />- Communicate with you on SMS, Email, WhatsApp, etc.; <br />
              - Screen our orders for potential risk or fraud; and <br />-
              Provide you with information or advertising relating to our
              products or services.
            </li>
            <br />
            <li>
              We use the Device Information that we collect to help us screen
              for potential risk and fraud (in particular, your IP address), and
              more generally to improve and optimize our Site (for example, by
              generating analytics about how our customers browse and interact
              with the Site, and to assess the success of our marketing and
              advertising campaigns).
            </li>
            <br />
            <li>
              <strong>SHARING YOUR PERSONAL INFORMATION</strong>
            </li>
            <br />
            <li>
              We share your Personal Information with third parties to help us
              use your Personal Information, as described above. For example, we
              use __________________ to power our online store--you can read
              more about how __________________ uses your Personal Information
              here: https://www.__________________.com/legal/privacy. We use
              __________________ to deliver products to your doorstep. We also
              use Google Analytics to help us understand how our customers use
              the Site -- you can read more about how Google uses your Personal
              Information here:
              https://www.google.com/intl/en/policies/privacy/. You can also
              opt-out of Google Analytics here:
              https://tools.google.com/dlpage/gaoptout.
            </li>
            <br />
            <li>
              Finally, we may also share your Personal Information to comply
              with applicable laws and regulations, to respond to a subpoena,
              search warrant or other lawful request for information we receive,
              or to otherwise protect our rights.
            </li>
            <br />
            <li>
              <strong>BEHAVIOURAL ADVERTISING </strong>
            </li>
            <br />
            <li>
              As described above, we use your Personal Information to provide
              you with targeted advertisements or marketing communications we
              believe may be of interest to you. For more information about how
              targeted advertising works, you can visit the Network Advertising
              Initiative’s (“NAI”) educational page at
              http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
              You can opt out of targeted advertising by using the links below:
              - Facebook: https://www.facebook.com/settings/?tab=ads - Google:
              https://www.google.com/settings/ads/anonymous - Bing:
              https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
            </li>
            <br />
            <li>
              Additionally, you can opt out of some of these services by
              visiting the Digital Advertising Alliance’s opt-out portal at:
              http://optout.aboutads.info/.
            </li>
            <br />
            <li>
              <strong>DO NOT TRACK </strong>
            </li>
            <br />
            <li>
              Please note that we do not alter our Site’s data collection and
              use standard practices when we see a Do Not Track signal from your
              browser.
            </li>
            <br />
            <li>
              <strong>YOUR RIGHTS</strong>
            </li>
            <br />
            <li>
              If you are a European resident, you have the right to access
              personal information we hold about you and to ask that your
              personal information be corrected, updated, or deleted. If you
              would like to exercise this right, please contact us through the
              contact information below. Additionally, if you are a European
              resident we note that we are processing your information in order
              to fulfill contracts we might have with you (for example if you
              make an order through the Site), or otherwise to pursue our
              legitimate business interests listed above. Additionally, please
              note that your information will be transferred outside of Europe,
              including to Canada and the United States.
            </li>
            <br />
            <li>
              <strong>DATA RETENTION</strong>
            </li>
            <br />
            <li>
              When you place an order through the Site, we will maintain your
              Order Information for our records unless and until you ask us to
              delete this information.
            </li>
            <br />
            <li>
              <strong>CHANGES</strong>
            </li>
            <br />
            <li>
              We may update this privacy policy from time to time in order to
              reflect, for example, changes to our practices or for other
              operational, legal or regulatory reasons.
            </li>
            <br />
            <li>
              <strong>CONTACT US </strong>
            </li>
            <br />
            <li>
              For more information about our privacy practices, if you have
              questions, or if you would like to make a complaint, please
              contact our grievance and nodal officer Mr. ______________________
              by e-mail at care@sadashrijewelkart.com or by mail using the
              details provided below: <br/>SADĀSHRĪ JEWELKART ______________________
              (Grievance and Nodal Officer) <br/>Indiejewel Fashions Private Limited,
              Third Floor, Magnum Vista, <br/>Raghuvanahalli, Bangalore, 560062,
              Bangalore KA, India
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
