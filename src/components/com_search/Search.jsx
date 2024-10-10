import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../com_home/ProductCard";
import "../../styles/Search.css";

const Search = ({ searchQuery }) => {
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
        product.title?.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      setFilteredProducts(filtered);
      console.log("필터된 데이터", filtered);
      console.log("제목들", products[0].title);
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
              key={product.productId}
              productId={product.productId}
              brand={product.brand}
              title={product.title}
              discount={product.discount}
              price={product.price}
              img={product.img}
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
