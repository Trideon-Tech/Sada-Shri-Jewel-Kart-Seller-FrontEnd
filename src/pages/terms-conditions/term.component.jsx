import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Grid,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./term.styles.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, display, height, width } from "@mui/system";

const TermsandConditions = () => {
  const matches = useMediaQuery("(min-width:600px)");
  let navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div className="landing">
      {/* Top Section */}
      <AppBar elevation={0} position="static" className="appbar">
        <Toolbar
          variant="dense"
          className="toolbar"
          style={{
            margin: matches ? "auto" : "0px",
            width: matches ? "80vw" : "100vw",
          }}
        >
          <img
            alt="logo"
            className="logo"
            src={process.env.PUBLIC_URL + "/assets/logo_white.png"}
            onClick={handleLogoClick}
          />
          {matches ? (
            <div className="btns">
              <Link className="link" to={"/login"}>
                <Button className="btn">Login</Button>
              </Link>
              <Link className="link-primary">
                <Button className="btn">Contact Us</Button>
              </Link>
            </div>
          ) : (
            <div style={{ marginLeft: "auto" }}>
              <MenuIcon onClick={handleClick} style={{ fontSize: "2rem" }} />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link className="link" to={"/login"}>
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                </Link>

                <Link className="link">
                  <MenuItem onClick={handleClose}>Contact Us</MenuItem>
                </Link>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/* Middle Section */}
      <div className="content">
        <div className="top" style={{ height: matches ? "20%" : "10%" }}>
          <div
            style={{
              height: "100%",
            }}
          />
          <div
            className="hero-text"
            style={{
              fontSize: matches ? "3rem" : "1.5rem ",
              paddingBottom: matches ? "50px" : "5px",
            }}
          >
            Term and Conditions
          </div>
        </div>
        <div
          className="text"
          style={{ paddingBottom: matches ? "10vh" : "100px" }}
        >
          {/* <h2><strong>Shipping & Handling</strong></h2> */}
          <p>
            <strong>Terms of service:</strong>
          </p>
          <ul>
            <li>
              <strong>Overview</strong>
              <br />
            </li>

            <li>
              This website is operated by SADĀSHRĪ JEWELKART. Throughout the
              site, the terms “we”, “us” and “our” refer to SADĀSHRĪ JEWELKART.
              SADĀSHRĪ JEWELKART offers this website, including all information,
              tools and services available from this site to you, the user,
              conditioned upon your acceptance of all terms, conditions,
              policies and notices stated here. By visiting our site and/ or
              purchasing something from us, you engage in our “Service” and
              agree to be bound by the following terms and conditions (“Terms of
              Service”, “Terms”), including those additional terms and
              conditions and policies referenced herein and/or available by
              hyperlink. These Terms of Service apply to all users of the site,
              including without limitation users who are browsers, vendors,
              customers, merchants, and/ or contributors of content. Please read
              these Terms of Service carefully before accessing or using our
              website. By accessing or using any part of the site, you agree to
              be bound by these Terms of Service. If you do not agree to all the
              terms and conditions of this agreement, then you may not access
              the website or use any services. If these Terms of Service are
              considered an offer, acceptance is expressly limited to these
              Terms of Service. Any new features or tools which are added to the
              current store shall also be subject to the Terms of Service. You
              can review the most current version of the Terms of Service at any
              time on this page. We reserve the right to update, change or
              replace any part of these Terms of Service by posting updates
              and/or changes to our website. It is your responsibility to check
              this page periodically for changes. Your continued use of or
              access to the website following the posting of any changes
              constitutes acceptance of those changes. Our store is hosted on
              __________________ Inc. They provide us with the online e-commerce
              platform that allows us to sell our products and services to you.
            </li>
            <br />
            <li>
              <strong>SECTION 1 - ONLINE STORE TERMS</strong>
              <br /> By agreeing to these Terms of Service, you represent that
              you are at least the age of majority in your state or province of
              residence, or that you are the age of majority in your state or
              province of residence and you have given us your consent to allow
              any of your minor dependents to use this site. You may not use our
              products for any illegal or unauthorized purpose nor may you, in
              the use of the Service, violate any laws in your jurisdiction
              (including but not limited to copyright laws). You must not
              transmit any worms or viruses or any code of a destructive nature.
              A breach or violation of any of the Terms will result in an
              immediate termination of your Services.
            </li>
            <br />
            <li>
              <strong>SECTION 2 - GENERAL CONDITIONS</strong>
              <br /> We reserve the right to refuse service to anyone for any
              reason at any time. You understand that your content (not
              including credit card information), may be transferred unencrypted
              and involve (a) transmissions over various networks; and (b)
              changes to conform and adapt to technical requirements of
              connecting networks or devices. Credit card information is always
              encrypted during transfer over networks. You agree not to
              reproduce, duplicate, copy, sell, resell or exploit any portion of
              the Service, use of the Service, or access to the Service or any
              contact on the website through which the service is provided,
              without express written permission by us. The headings used in
              this agreement are included for convenience only and will not
              limit or otherwise affect these Terms.
            </li>
            <br />
            <li>
              <strong>
                SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
              </strong>
              <br />
              We are not responsible if information made available on this site
              is not accurate, complete or current. The material on this site is
              provided for general information only and should not be relied
              upon or used as the sole basis for making decisions without
              consulting primary, more accurate, more complete or more timely
              sources of information. Any reliance on the material on this site
              is at your own risk. This site may contain certain historical
              information. Historical information, necessarily, is not current
              and is provided for your reference only. We reserve the right to
              modify the contents of this site at any time, but we have no
              obligation to update any information on our site. You agree that
              it is your responsibility to monitor changes to our site.
            </li>
            <br />
            <li>
              <strong>
                SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES
              </strong>
              <br />
              Prices for our products are subject to change without notice. We
              reserve the right at any time to modify or discontinue the Service
              (or any part or content thereof) without notice at any time. We
              shall not be liable to you or to any third-party for any
              modification, price change, suspension or discontinuance of the
              Service.
            </li>
            <br />
            <li>
              <strong>SECTION 5 - PRODUCTS OR SERVICES (if applicable)</strong>
              <br />
              Certain products or services may be available exclusively online
              through the website. These products or services may have limited
              quantities and are subject to return or exchange only according to
              our Return Policy. We have made every effort to display as
              accurately as possible the colors and images of our products that
              appear at the store. We cannot guarantee that your computer
              monitor's display of any color will be accurate. We reserve the
              right, but are not obligated, to limit the sales of our products
              or Services to any person, geographic region or jurisdiction. We
              may exercise this right on a case-by-case basis. We reserve the
              right to limit the quantities of any products or services that we
              offer. All descriptions of products or product pricing are subject
              to change at anytime without notice, at the sole discretion of us.
              We reserve the right to discontinue any product at any time. Any
              offer for any product or service made on this site is void where
              prohibited. We do not warrant that the quality of any products,
              services, information, or other material purchased or obtained by
              you will meet your expectations, or that any errors in the Service
              will be corrected.
            </li>
            <br />
            <li>
              <strong>
                SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION
              </strong>
              <br />
              We reserve the right to refuse any order you place with us. We
              may, in our sole discretion, limit or cancel quantities purchased
              per person, per household or per order. These restrictions may
              include orders placed by or under the same customer account, the
              same credit card, and/or orders that use the same billing and/or
              shipping address. In the event that we make a change to or cancel
              an order, we will make our best attempt to notify you by
              contacting the e mail and/or billing address/phone number provided
              at the time the order was made. We reserve the right to limit or
              prohibit orders that, in our sole judgment, appear to be placed by
              dealers, resellers or distributors. You agree to provide current,
              complete and accurate purchase and account information for all
              purchases made at our store. You agree to promptly update your
              account and other information, including your email address and
              credit card numbers and expiration dates, so that we can complete
              your transactions and contact you as needed. For more detail,
              please review our Returns Policy.
            </li>
            <br />
            <li>
              <strong>SECTION 7 - OPTIONAL TOOLS</strong>
              <br />
              We may provide you with access to third-party tools over which we
              neither monitor nor have any control nor input. You acknowledge
              and agree that we provide access to such tools ”as is” and “as
              available” without any warranties, representations or conditions
              of any kind and without any endorsement. We shall have no
              liability whatsoever arising from or relating to your use of
              optional third-party tools. Any use by you of optional tools
              offered through the site is entirely at your own risk and
              discretion and you should ensure that you are familiar with and
              approve of the terms on which tools are provided by the relevant
              third-party provider(s). We may also, in the future, offer new
              services and/or features through the website (including, the
              release of new tools and resources). Such new features and/or
              services shall also be subject to these Terms of Service.
            </li>
            <br />
            <li>
              <strong>SECTION 8 - THIRD-PARTY LINKS</strong>
              <br />
              Certain content, products and services available via our Service
              may include materials from third-parties. Third-party links on
              this site may direct you to third-party websites that are not
              affiliated with us. We are not responsible for examining or
              evaluating the content or accuracy and we do not warrant and will
              not have any liability or responsibility for any third-party
              materials or websites, or for any other materials, products, or
              services of third-parties. We are not liable for any harm or
              damages related to the purchase or use of goods, services,
              resources, content, or any other transactions made in connection
              with any third-party websites. Please review carefully the
              third-party's policies and practices and make sure you understand
              them before you engage in any transaction. Complaints, claims,
              concerns, or questions regarding third-party products should be
              directed to the third-party.
            </li>
            <br />
            <li>
              <strong>
                SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
              </strong>
              <br />
              If, at our request, you send certain specific submissions (for
              example contest entries) or without a request from us you send
              creative ideas, suggestions, proposals, plans, or other materials,
              whether online, by email, by postal mail, or otherwise
              (collectively, 'comments'), you agree that we may, at any time,
              without restriction, edit, copy, publish, distribute, translate
              and otherwise use in any medium any comments that you forward to
              us. We are and shall be under no obligation (1) to maintain any
              comments in confidence; (2) to pay compensation for any comments;
              or (3) to respond to any comments. We may, but have no obligation
              to, monitor, edit or remove content that we determine in our sole
              discretion are unlawful, offensive, threatening, libellous,
              defamatory, pornographic, obscene or otherwise objectionable or
              violates any party’s intellectual property or these Terms of
              Service. You agree that your comments will not violate any right
              of any third-party, including copyright, trademark, privacy,
              personality or other personal or proprietary right. You further
              agree that your comments will not contain libellous or otherwise
              unlawful, abusive or obscene material, or contain any computer
              virus or other malware that could in any way affect the operation
              of the Service or any related website. You may not use a false e
              mail address, pretend to be someone other than yourself, or
              otherwise mislead us or third-parties as to the origin of any
              comments. You are solely responsible for any comments you make and
              their accuracy. We take no responsibility and assume no liability
              for any comments posted by you or any third-party.
            </li>
            <br />
            <li>
              <strong>SECTION 10 - PERSONAL INFORMATION</strong>
              <br />
              Your submission of personal information through the store is
              governed by our Privacy Policy. To view our Privacy Policy.
            </li>
            <br />
            <li>
              <strong>SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS</strong>
              <br />
              Occasionally there may be information on our site or in the
              Service that contains typographical errors, inaccuracies or
              omissions that may relate to product descriptions, pricing,
              promotions, offers, product shipping charges, transit times and
              availability. We reserve the right to correct any errors,
              inaccuracies or omissions, and to change or update information or
              cancel orders if any information in the Service or on any related
              website is inaccurate at any time without prior notice (including
              after you have submitted your order). We undertake no obligation
              to update, amend or clarify information in the Service or on any
              related website, including without limitation, pricing
              information, except as required by law. No specified update or
              refresh date applied in the Service or on any related website,
              should be taken to indicate that all information in the Service or
              on any related website has been modified or updated.
            </li>
            <br />
            <li>
              <strong>SECTION 12 - PROHIBITED USES</strong>
              <br />
              In addition to other prohibitions as set forth in the Terms of
              Service, you are prohibited from using the site or its content:
              (a) for any unlawful purpose; (b) to solicit others to perform or
              participate in any unlawful acts; (c) to violate any
              international, federal, provincial or state regulations, rules,
              laws, or local ordinances; (d) to infringe upon or violate our
              intellectual property rights or the intellectual property rights
              of others; (e) to harass, abuse, insult, harm, defame, slander,
              disparage, intimidate, or discriminate based on gender, sexual
              orientation, religion, ethnicity, race, age, national origin, or
              disability; (f) to submit false or misleading information; (g) to
              upload or transmit viruses or any other type of malicious code
              that will or may be used in any way that will affect the
              functionality or operation of the Service or of any related
              website, other websites, or the Internet; (h) to collect or track
              the personal information of others; (i) to spam, phish, pharm,
              pretext, spider, crawl, or scrape; (j) for any obscene or immoral
              purpose; or (k) to interfere with or circumvent the security
              features of the Service or any related website, other websites, or
              the Internet. We reserve the right to terminate your use of the
              Service or any related website for violating any of the prohibited
              uses.
            </li>
            <br />
            <li>
              <strong>
                SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
              </strong>
              <br />
              We do not guarantee, represent or warrant that your use of our
              service will be uninterrupted, timely, secure or error-free. Only
              warranties explicitly set out in the relevant product page shall
              apply to said product. We do not warrant that the results that may
              be obtained from the use of the service will be accurate or
              reliable. You agree that from time to time we may remove the
              service for indefinite periods of time or cancel the service at
              any time, without notice to you. You expressly agree that your use
              of, or inability to use, the service is at your sole risk. The
              service and all products and services delivered to you through the
              service are (except as expressly stated by us) provided 'as is'
              and 'as available' for your use, without any representation,
              warranties or conditions of any kind, either express or implied,
              including all implied warranties or conditions of merchantability,
              merchantable quality, fitness for a particular purpose,
              durability, title, and non-infringement. In no case shall SADĀSHRĪ
              JEWELKART, our directors, officers, employees, affiliates, agents,
              contractors, interns, suppliers, service providers or licensors be
              liable for any injury, loss, claim, or any direct, indirect,
              incidental, punitive, special, or consequential damages of any
              kind, including, without limitation lost profits, lost revenue,
              lost savings, loss of data, replacement costs, or any similar
              damages, whether based in contract, tort (including negligence),
              strict liability or otherwise, arising from your use of any of the
              service or any products procured using the service, or for any
              other claim related in any way to your use of the service or any
              product, including, but not limited to, any errors or omissions in
              any content, or any loss or damage of any kind incurred as a
              result of the use of the service or any content (or product)
              posted, transmitted, or otherwise made available via the service,
              even if advised of their possibility. Because some states or
              jurisdictions do not allow the exclusion or the limitation of
              liability for consequential or incidental damages, in such states
              or jurisdictions, our liability shall be limited to the maximum
              extent permitted by law.
            </li>
            <br />
            <li>
              <strong>SECTION 14 - INDEMNIFICATION</strong>
              <br />
              You agree to indemnify, defend and hold harmless SADĀSHRĪ
              JEWELKART and our parent, subsidiaries, affiliates, partners,
              officers, directors, agents, contractors, licensors, service
              providers, subcontractors, suppliers, interns and employees,
              harmless from any claim or demand, including reasonable attorneys’
              fees, made by any third-party due to or arising out of your breach
              of these Terms of Service or the documents they incorporate by
              reference, or your violation of any law or the rights of a
              third-party.
            </li>
            <br />
            <li>
              <strong>SECTION 15 - SEVERABILITY</strong>
              <br />
              In the event that any provision of these Terms of Service is
              determined to be unlawful, void or unenforceable, such provision
              shall nonetheless be enforceable to the fullest extent permitted
              by applicable law, and the unenforceable portion shall be deemed
              to be severed from these Terms of Service, such determination
              shall not affect the validity and enforceability of any other
              remaining provisions.
            </li>
            <br />
            <li>
              <strong>SECTION 16 - TERMINATION</strong>
              <br />
              The obligations and liabilities of the parties incurred prior to
              the termination date shall survive the termination of this
              agreement for all purposes. These Terms of Service are effective
              unless and until terminated by either you or us. You may terminate
              these Terms of Service at any time by notifying us that you no
              longer wish to use our Services, or when you cease using our site.
              If in our sole judgment you fail, or we suspect that you have
              failed, to comply with any term or provision of these Terms of
              Service, we also may terminate this agreement at any time without
              notice and you will remain liable for all amounts due up to and
              including the date of termination; and/or accordingly may deny you
              access to our Services (or any part thereof).
            </li>
            <br />
            <li>
              <strong>SECTION 17 - ENTIRE AGREEMENT</strong>
              <br />
              The failure of us to exercise or enforce any right or provision of
              these Terms of Service shall not constitute a waiver of such right
              or provision. These Terms of Service and any policies or operating
              rules posted by us on this site or in respect to The Service
              constitutes the entire agreement and understanding between you and
              us and govern your use of the Service, superseding any prior or
              contemporaneous agreements, communications and proposals, whether
              oral or written, between you and us (including, but not limited
              to, any prior versions of the Terms of Service). Any ambiguities
              in the interpretation of these Terms of Service shall not be
              construed against the drafting party.
            </li>
            <br />
            <li>
              <strong>SECTION 18 - GOVERNING LAW</strong>
              <br />
              These Terms of Service and any separate agreements whereby we
              provide you Services shall be governed by and construed in
              accordance with the laws of India without regard to its conflict
              of laws principles. Disputes, if any, shall be subject to the
              jurisdiction of the courts located in Bengaluru, India.
            </li>
            <br />
            <li>
              <strong>SECTION 19 - CHANGES TO TERMS OF SERVICE</strong>
              <br />
              You can review the most current version of the Terms of Service at
              any time at this page. We reserve the right, at our sole
              discretion, to update, change or replace any part of these Terms
              of Service by posting updates and changes to our website. It is
              your responsibility to check our website periodically for changes.
              Your continued use of or access to our website or the Service
              following the posting of any changes to these Terms of Service
              constitutes acceptance of those changes.
            </li>
            <br />
            <li>
              <strong>SECTION 20 - CONTACT INFORMATION</strong>
              <br />
              Questions about the Terms of Service should be sent to us at
              care@sadashrijewelkart.com. Our address is Third Floor, Magnum
              Vista, Raghuvanahalli, Bangalore 560062.
            </li>
            <br />
            <li>
              <strong>
                SECTION 21 - ADDITIONAL TERMS AND CONDITIONS FOR GOLD JEWELLERY
              </strong>
              <br />
              1. 1. 30-day returns: You can return your item for upto 30 days
              from the date of delivery, no questions asked against a full
              refund subject to a successful inspection of the items (which may
              take up to 7 days from the date of receipt at the Company's
              warehouse/store) and submission of the video showcasing the return
              packaging with the original product, invoice and authenticity
              certificate. However, Personalised and Made-To-Order products are
              not eligible for 30-day returns and can only be returned in case
              of spurious/defective products. 2. Please note that any claim for
              non-receipt of a product or empty box will be entertained only if
              submitted within 24 hours of receipt along with an unboxing video
              which includes the original outer seal. 3. Lifetime exchange &
              buyback - Beyond 30 days, you can opt for an exchange or buyback
              on your jewellery purchased from SADĀSHRĪ JEWELKART
              stores/SADĀSHRĪ JEWELKART website/SADĀSHRĪ JEWELKART App in India
              for up to 5 years from the date of purchase. - Exchange: We will
              offer you credits for (a) gold (adjusted for 24kt purity) at its
              prevailing market value and (b) diamonds/solitaires/pearls at 100%
              of the value you paid for them. However, making charges and GST
              paid at the time of purchase will be deducted. This credit can be
              claimed as a discount against your future orders or can be
              credited to your SADĀSHRĪ JEWELKART Wallet, which you can choose
              to use against a future order. Adjustments may be made subject to
              product inspection. - Buyback: We will value (a) gold (adjusted
              for 24kt purity) at its prevailing market value and (b)
              diamonds/solitaires/pearls at 90% of the value you paid for them
              as a refund. However, making charges and GST cannot be refunded.
              Further, an additional 3% of the buyback value will be deducted as
              processing charges. The refund will mandatorily be processed to
              your original payment method and may take 7-10 days for our
              payment partners to process. Further adjustments may be made
              subject to product inspection. 4. For both exchange and buyback,
              should we find any deficiencies/defects in the product returned to
              us (including but not limited to missing stones/packaging,
              damages, etc.), the buyback or exchange amount shall be adjusted
              depending on the extent of the deficiency or defect. In case of
              significant damage, the Company may, at its sole discretion,
              refuse to accept the product. In all such matters, the decision of
              the Company shall be final and binding. 5. The price on the
              website/app is based on average product weight. Your actual
              product weight may wary. A deviation in weight of the actual
              product may result in a minor excess charge/refund, both of which
              shall be communicated within 48 hours of placing your order. You
              shall have the option to cancel your order within 24 hours of this
              communication. In case of COD, we request you to pay the full
              amount upfront. Excess amount collected, if any, shall be refunded
              and short collection shall be requested, within a maximum of 48
              hours after delivery. The weight communicated in the invoice shall
              be the final weight 6. Please note that refunds take a minimum of
              7-10 working days from the date of receipt of the jewellery at our
              store/central warehouse. 7. Please note that to avail of any of
              the features offered in the authenticity certificate (return,
              exchange, buyback or warranty), you must produce the original
              invoice (hard/soft copy), and all certificates including IGI/SGL
              certificates (strictly original and hard copy). The absence of any
              of the documents will make the product ineligible for
              return/exchange/warranty. 8. Please note exchange and buyback are
              only valid on SADĀSHRĪ JEWELKART - any other jewellery will not be
              accepted, regardless of brand/purity, etc. 9. 6-month Warranty: We
              offer a limited six-month warranty on our range of gold and
              diamond jewellery valid from the date of delivery. This warranty
              covers only pre-existing damages or manufacturing defects and does
              not cover wear and tear in due course. In case we cannot repair
              the item, we will, at our discretion, replace the item with
              another item of equal value. However, please do note that the
              warranty does not apply to the following: - Damages due to
              mishandling, negligence, impact damage, accidents, tampering, etc.
              - Surface finish/colour of the product and loss of stones from the
              product. 10. Please note there might be up to 2% variation in the
              weight/dimensions/colour of the product against mentioned
              specifications. 11. Lifetime Plating service - The Lifetime
              plating service on your jewellery purchased from SADĀSHRĪ
              JEWELKART stores/SADĀSHRĪ JEWELKART website/SADĀSHRĪ JEWELKART App
              in India is valid for 5 years from the date of purchase. 12. For
              more details please check our detailed Terms of Service here:
              https://www.sadashrijewelkart.com/pages/terms-of-service. In case
              of any conflict, the terms and conditions specified on your
              invoice shall prevail.
            </li>
            <br />
            <li>
              <strong>Our Address:</strong>
              <br />
              SADĀSHRĪ JEWELKART 3rd floor, Magnum Vista, Raghuvanahalli
              <br />
              Bangalore - 560062 Karnataka Opp KSIT college <br />
              (Landmark: Above Bata Showroom)
            </li>
          </ul>
        </div>
        {matches ? (
          <div className="footer">
            <div className="seperator" />
            <div className="items-row">
              <div className="company">Sada Shri Jewel Kart Pvt. Ltd.</div>
              <div className="actions">
                <a
                  href="https://blogs.sadashrijewelkart.com/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-item"
                >
                  Privacy Policy
                </a>
                <a
                  href="https://blogs.sadashrijewelkart.com/shipping-and-returns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-item"
                >
                  Shipping & Delivery
                </a>
                <a
                  href="https://blogs.sadashrijewelkart.com/terms-and-conditions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-item"
                >
                  Terms & Conditions
                </a>
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-item"
                >
                  Refund Policy
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              position: "fixed",
              bottom: "0px",
              width: "100%",
              backgroundColor: "white",
              height: "100px",
            }}
          >
            <Divider />
            <Typography
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Sada Shri Jewel Kart Pvt. Ltd.
            </Typography>
            <Grid
              container
              spacing={1}
              style={{ textAlign: "left", paddingLeft: "10%", color: "gray" }}
            >
              <Grid item xs={6}>
                <a
                  href="https://blogs.sadashrijewelkart.com/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography>Privacy Policy</Typography>
                </a>
              </Grid>
              <Grid item xs={6}>
                <a
                  href="https://blogs.sadashrijewelkart.com/shipping-and-returns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography>Shipping & Delivery</Typography>
                </a>
              </Grid>
              <Grid item xs={6}>
                <a
                  href="https://blogs.sadashrijewelkart.com/terms-and-conditions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography>Terms & Conditions</Typography>
                </a>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsandConditions;
