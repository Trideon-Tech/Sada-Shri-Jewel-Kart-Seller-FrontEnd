import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import ContactUs from "./pages/contact-us/contact-us.component";
import Home from "./pages/home/home.component";
import Landing from "./pages/landing/landing.component";
import Login from "./pages/login/login.component";
import PrivacyPolicy from "./pages/Privacy-Policy/privacy.component";
import ProductPage from "./pages/productspage/productpage.component";
import Profile from "./pages/profile/profile.component";
import Register from "./pages/register/register.component";
import Shipping from "./pages/shippingandreturns/shipping.component";
import Staging from "./pages/staging/staging.component";
import TermsandConditions from "./pages/terms-conditions/term.component";

import AddProductPage from "./pages/addnewproduct/addnewproductpage.component";
import EditProductPage from "./pages/editproductpage/editproductpage.component";
import OrderDetailsComponent from "./pages/orderDetails/orderDetails.component";
import OrdersPage from "./pages/orders/ordersPage.component";
import PaymentsPage from "./pages/payments/paymentsPage.component";

function App() {
  const isMobile = window.innerWidth <= 768;
  console.log(process.env.NODE_ENV);
  if (isMobile) {
    return (
      <div
        className="App"
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/assets/logo_dark.png"}
          alt="Sadashi Logo"
          style={{
            width: "150px",
            marginBottom: "30px",
          }}
        />
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#333",
            fontFamily: "'Work Sans', sans-serif",
          }}
        >
          Please open Sadāshrī Jewelkart Seller Portal on a laptop or tablet for
          the best experience.
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/register/:step" element={<Register />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/add" element={<AddProductPage />} />
          <Route path="/products/edit" element={<EditProductPage />} />
          <Route path="/staging" element={<Staging />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/term" element={<TermsandConditions />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/order-detail/:id" element={<OrderDetailsComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
