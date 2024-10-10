import "./SearchBox.css";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

const SearchBox = ({ setSearchQuery }) => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");

  //   검색 함수
  const handleSearch = () => {
    if (search.trim()) {
      setSearchQuery(search);
      console.log("검색창:", search);
    } else {
      alert("입력 ㄱ");
    }
  };

  //   엔터키 입력
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="SearchBox">
      <div className="Searching">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="원하는 상품을 검색해보세요!"
          className="searchInput"
        />
        <IoIosSearch className="IoIosSearch" onClick={handleSearch} />
      </div>
      <div className="option">
        <p>검색 옵션</p>
        <div>
          <button
            className="searchButton searchButton_name"
            onClick={() => setSearchType("name")}
          >
            상품명
          </button>
          <button
            className="searchButton searchButton_code"
            onClick={() => setSearchType("code")}
          >
            상품코드
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
