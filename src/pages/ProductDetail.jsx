import Navbar from "../components/common/Navbar";
import { useParams, useLocation } from "react-router-dom";
import Detail from "../components/com_detail/Detail";

const ProductDetail = () => {
  const { ProductId } = useParams();
  const location = useLocation();
  const {
    Category,
    Brand,
    ProductName,
    Price,
    DiscountRate,
    OriginalPrice,
    ProductURL,
    ImageURL,
  } = location.state || {};
  console.log(
    "productId는",
    Category,
    Brand,
    ProductName,
    Price,
    DiscountRate,
    OriginalPrice,
    ProductURL,
    ImageURL
  );
  return (
    <div className="ProductDetail">
      <Navbar />
      <Detail
        ProductId={ProductId}
        Category={Category}
        Brand={Brand}
        ProductName={ProductName}
        Price={Price}
        DiscountRate={DiscountRate}
        OriginalPrice={OriginalPrice}
        ProductURL={ProductURL}
        ImageURL={ImageURL}
      />
    </div>
  );
};

export default ProductDetail;
