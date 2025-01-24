import Navbar from "../components/common/Navbar";
import SearchBox from "../components/common/SearchBox";
import Search from "../components/com_search/Search";

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
