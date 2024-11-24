import Navbar from "../components/common/Navbar";
import SearchBox from "../components/common/SearchBox";
import Search from "../components/com_search/Search";

import { useLocation } from "react-router-dom";

const ProductSearch = () => {
  return (
    <div className="ProductSearch">
      <Navbar />
      <SearchBox />
      <Search />
    </div>
  );
};

export default ProductSearch;
