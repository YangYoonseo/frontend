import Navbar from "../components/common/Navbar";
import { useParams, useLocation } from "react-router-dom";
import Detail from "../components/com_detail/Detail";

const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { brand, title, discount, price, img } = location.state || {};
  console.log("productId는", productId, brand, title, discount, price, img);
  return (
    <div className="ProductDetail">
      <Navbar />
      <Detail
        productId={productId}
        brand={brand}
        title={title}
        discount={discount}
        price={price}
        img={img}
      />
    </div>
  );
};

export default ProductDetail;
