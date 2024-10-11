import "../../styles/ProductCard.css";
import { useNavigate } from "react-router-dom";
import LikeButton from "../common/LikeButton";

const ProductCard = ({
  ProductId,
  Category,
  Brand,
  ProductName,
  Price,
  DiscountRate,
  OriginalPrice,
  ProductURL,
  ImageURL,
}) => {
  const nav = useNavigate();

  return (
    <div
      className="ProductCard"
      onClick={() => {
        nav(`/product_detail/${ProductId}`, {
          state: {
            Category,
            Brand,
            ProductName,
            Price,
            DiscountRate,
            OriginalPrice,
            ProductURL,
            ImageURL,
          },
        });
      }}
    >
      <div className="product_img">
        <img src={ImageURL} alt="사진이 안 보여" />
        <LikeButton />
      </div>
      <div className="product_info">
        <h4>{Brand}</h4>
        <p className="title">{ProductName}</p>
        <p className="product_price">
          <span className="discount">{DiscountRate}</span>{" "}
          {Price.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
