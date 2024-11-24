import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductedSearch = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "http://localhost:5173/api/product/search",
          {
            params: {
              query: query,
            },
          }
        );

        console.log(response); // 응답 데이터 확인
        console.log("하이루");
      } catch (err) {
        setError("제품을 불러오는 중 오류가 발생했습니다.");
        console.error(err); // 에러 로그 출력
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0); // 새 검색 시 페이지 번호를 0으로 초기화
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>

      {loading && <p>로딩 중...</p>}
      {error && <p>{error}</p>}

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a href={product.url}>{product.name}</a> - {product.price}원
          </li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
          disabled={page === 0}
        >
          이전 페이지
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() =>
            setPage((prevPage) =>
              prevPage < totalPages - 1 ? prevPage + 1 : prevPage
            )
          }
          disabled={page >= totalPages - 1}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default ProductedSearch;
