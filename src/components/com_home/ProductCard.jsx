import "../../styles/ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ productId, brand, title, discount, price, img }) => {
  const nav = useNavigate();

  return (
    <div
      className="ProductCard"
      onClick={() => {
        nav(`/product_detail/${productId}`, {
          state: {
            brand,
            title,
            discount,
            price,
            img,
          },
        });
      }}
    >
      <img src={img} alt="사진이 안 보여" />
      <div className="product_info">
        <h4>{brand}</h4>
        <p className="title">{title}</p>
        <p className="product_price">
          <span className="discount">{discount}</span> {price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
