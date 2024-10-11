import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../App";
import ProductCard from "../com_home/ProductCard";
import "../../styles/Search.css";

const Search = () => {
  const { searchQuery } = useContext(SearchContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  //   전체 상품 불러오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/mockData.json");
        setProducts(response.data);
        console.log("전체 상품 불러오기 성공", response.data);
      } catch (error) {
        console.log("전체 상품 불러오기 실패", error);
      }
    };
    fetchProducts();
  }, []);

  //   상품명으로 필터링, 추후에 상품코드로 필터링 만들어야 함
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.ProductName?.toLowerCase().includes(
          searchQuery.toLowerCase().trim()
        )
      );
      setFilteredProducts(filtered);
      console.log("필터된 데이터", filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  return (
    <div className="Search">
      <p className="Search_p">
        검색된 상품 <span>{filteredProducts.length}개</span>
      </p>
      <div className="Search_filteredProducts">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.ProductId}
              ProductId={product.ProductId}
              Category={product.Category}
              Brand={product.Brand}
              ProductName={product.ProductName}
              Price={product.Price}
              DiscountRate={product.DiscountRate}
              OriginalPrice={product.OriginalPrice}
              ProductURL={product.ProductURL}
              ImageURL={product.ImageURL}
            />
          ))
        ) : (
          <p>상품이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default Search;
