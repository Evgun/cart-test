import { SiteCtx } from "ctx/siteCtx";
import useSiteCtxValues from "hooks/useSiteCtx";
import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutMain from "./components/Checkout/CheckoutMain";
import HomepageMain from "./components/Homepage/HomepageMain";
import "./styles/index.scss";

const App: FC = () => {
  const values = useSiteCtxValues();

  return (
    <SiteCtx.Provider value={{ ...values }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomepageMain />} />
          <Route path="checkout" element={<CheckoutMain />} />
        </Routes>
      </Router>
    </SiteCtx.Provider>
  );
};

export default App;
