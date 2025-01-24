import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createContext, Suspense, useState, lazy } from "react";
// page 동적 임포트
const Home = lazy(() => import("./pages/Home"));
const ProductSearch = lazy(() => import("./pages/ProductSearch"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

import LoadingSpinner from "./components/com_search/LoadingSpinner";

export const SearchContext = createContext();

function App() {
  // 검색어
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className="App">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product_search" element={<ProductSearch />} />
            <Route
              path="/product_detail/:ProductId"
              element={<ProductDetail />}
            />
          </Routes>
        </Suspense>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
