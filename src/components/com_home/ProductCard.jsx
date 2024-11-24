import "../../styles/ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LikeButton from "../common/LikeButton";

import logo from "../../assets/img_common/logo.svg";

const ProductCard = ({
  ProductId,
  Brand,
  ProductName,
  Price,
  DiscountRate,
  OriginalPrice,
  ProductURL,
  ImageURL,
}) => {
  const nav = useNavigate();
  const [imgSrc, setImgSrc] = useState(ImageURL);

  return (
    <div
      className="ProductCard"
      onClick={() => {
        nav(`/product_detail/${ProductId}`);
      }}
    >
      <div className="product_img">
        <img src={imgSrc} alt="상품 이미지" onError={() => setImgSrc(logo)} />
        <LikeButton />
      </div>
      <div className="product_info">
        <h4>{Brand}</h4>
        <p className="title">{ProductName}</p>
        <p className="product_price">
          <span className="discount">{DiscountRate}% </span>
          {Price.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
