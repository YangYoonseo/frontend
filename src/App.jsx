import "./App.css";
import { Routes, Route } from "react-router-dom";

// page
import Home from "./pages/Home";
import HomeLoggedOut from "./pages/HomeLoggedOut";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import ProductSearch from "./pages/ProductSearch";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main_loggedOut" element={<HomeLoggedOut />} />
        <Route path="/main_loggedIn" element={<HomeLoggedIn />} />
        <Route path="product_search" element={<ProductSearch />} />
        <Route path="/product_detail/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
