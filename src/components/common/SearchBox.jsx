import "./SearchBox.css";
import { IoIosSearch } from "react-icons/io";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../App";

import leftButton from "../../assets/img_common/leftButton.svg";
import rightButton from "../../assets/img_common/rightButton.svg";

const SearchBox = () => {
  const nav = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");

  //   검색 함수
  const handleSearch = () => {
    if (search.trim()) {
      setSearchQuery(search);
      console.log("검색창:", search);
      // 검색창 초기화
      setSearch("");
      nav("/product_search");
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

  // 상품명/상품코드 변경
  const onClickSearch = () => {
    if (searchType === "name") {
      setSearchType("code");
    } else {
      setSearchType("name");
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
          <p className={`productName productName_${searchType}`}>상품명</p>
          <p>/</p>
          <p className={`productCode productCode_${searchType}`}>상품코드</p>
          <img
            src={searchType === "name" ? leftButton : rightButton}
            alt=""
            onClick={onClickSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
