import axios from "axios";
import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchContext } from "../../App";
import ProductCard from "../com_home/ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import "../../styles/Search.css";

const Search = () => {
  const { searchQuery } = useContext(SearchContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalElements, setTotalElements] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(
    async (page) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APIT_URL}/api/product/search`,
          { params: { query: searchQuery, page, size: 25 } }
        );

        // console.log(response.data);
        const newProducts = response.data.data;
        setTotalElements(response.data.pagination.totalElements);
        setFilteredProducts((prevProducts) => [
          ...prevProducts,
          ...newProducts,
        ]);
        setHasMore(!response.data.pagination.last);
      } catch (error) {
        // console.error("데이터 불러오기에 실패했습니다", error);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      setFilteredProducts([]);
      setCurrentPage(0);
      setHasMore(true);
      fetchProducts(0).then(() => setLoading(false));
    }
  }, [searchQuery, fetchProducts]);

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage);
  };

  const totalElementsText = useMemo(() => {
    return totalElements ? `${totalElements}개` : "0개";
  }, [totalElements]);

  return (
    <div className="Search">
      {loading && <LoadingSpinner />}
      <p className="Search_p">
        검색된 상품 <span>{totalElementsText}</span>
      </p>
      <InfiniteScroll
        dataLength={filteredProducts.length}
        next={loadMoreProducts}
        hasMore={hasMore}
      >
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
      </InfiniteScroll>
    </div>
  );
};

export default Search;
