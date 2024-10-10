import Navbar from "../components/common/Navbar";
import SearchBox from "../components/common/SearchBox";
import Search from "../components/com_search/Search";
import { useState } from "react";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="ProductSearch">
      <Navbar />
      <SearchBox setSearchQuery={setSearchQuery} />
      <Search searchQuery={searchQuery} />
    </div>
  );
};

export default ProductSearch;
