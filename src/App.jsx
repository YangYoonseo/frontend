import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createContext, useContext, useState } from "react";
// page
import Home from "./pages/Home";
import HomeLoggedOut from "./pages/HomeLoggedOut";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import ProductSearch from "./pages/ProductSearch";
import ProductDetail from "./pages/ProductDetail";

// API 연결 테스트
import ProductedSearch from "./components/test/ProductedSearch";

export const SearchContext = createContext();

function App() {
  // 검색어
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/main_loggedOut" element={<HomeLoggedOut />} />
          <Route path="/main_loggedIn" element={<HomeLoggedIn />} /> */}
          <Route path="product_search" element={<ProductSearch />} />
          <Route
            path="/product_detail/:ProductId"
            element={<ProductDetail />}
          />
          <Route path="/test" element={<ProductedSearch />} />
        </Routes>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
