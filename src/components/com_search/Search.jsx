import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../App";
import ProductCard from "../com_home/ProductCard";
import "../../styles/Search.css";

const Search = () => {
  const { searchQuery } = useContext(SearchContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const Filtering = async () => {
      if (searchQuery) {
        const url = "https://hongdae.site";
        try {
          const response = await axios.get(`${url}/api/product/search`, {
            params: { query: searchQuery },
          });
          console.log("데이터 필터 성공", response.data.data);
          setFilteredProducts(response.data.data);
        } catch (error) {
          console.log("데이터 필터 실패", error);
        }
      }
    };
    Filtering();
  }, [searchQuery]);

  return (
    <div className="Search">
      <p className="Search_p">
        검색된 상품 <span>{filteredProducts.length}개</span>
      </p>
      <div className="Search_filteredProducts">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                ProductId={product.id}
                Brand={product.brand}
                ProductName={product.productName}
                Price={product.price}
                DiscountRate={product.discountRate}
                OriginalPrice={product.originalPrice}
                ProductURL={product.productURL}
                ImageURL={product.imageURL}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Search;
