import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";

import Landing from "./pages/landing/landing.component";
import Register from "./pages/register/register.component";
import Home from "./pages/home/home.component";
import Staging from "./pages/staging/staging.component";
import Login from "./pages/login/login.component";
import Shipping from "./pages/shippingandreturns/shipping.component";
import PrivacyPolicy from "./pages/Privacy-Policy/privacy.component";
import TermsandConditions from "./pages/terms-conditions/term.component";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/register/:step" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/staging" element={<Staging />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="/term" element={<TermsandConditions/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
