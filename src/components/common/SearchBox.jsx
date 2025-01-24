import "./SearchBox.css";
import { IoIosSearch } from "react-icons/io";
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../App";

import leftButton from "../../assets/img_common/leftButton.svg";
import rightButton from "../../assets/img_common/rightButton.svg";

const SearchBox = () => {
  const nav = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const searchRef = useRef("");
  const [searchType, setSearchType] = useState("name");

  //   검색 함수
  const handleSearch = () => {
    if (searchRef.current.trim()) {
      setSearchQuery(searchRef.current);
      // console.log("검색창:", searchRef.current);
      nav("/product_search");
    } else {
      alert("원하는 상품을 검색하세요!");
    }
  };

  //   엔터키 입력
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 검색창 입력값 업데이트
  const handleInputChange = (e) => {
    searchRef.current = e.target.value;
  };

  // 상품명/상품코드 변경
  const onClickSearch = () => {
    if (searchType === "name") {
      alert("상품 코드 검색 기능이 준비 중입니다.");
      // setSearchType("code");
    } else {
      setSearchType("name");
    }
  };

  return (
    <div className="SearchBox">
      <div className="Searching">
        <input
          type="text"
          defaultValue={searchRef.current}
          onChange={handleInputChange}
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
