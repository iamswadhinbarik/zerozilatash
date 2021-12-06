import React from "react";
import { Home } from "./pages/home";
import { Products } from "./pages/products";
import { ProductDetails } from "./pages/product";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/products/:catName" element={<Products />} />
        <Route
          exact
          path="/product-details/:productId"
          element={<ProductDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
