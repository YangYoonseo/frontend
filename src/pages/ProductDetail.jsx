import Navbar from "../components/common/Navbar";
import { useParams } from "react-router-dom";
import Detail from "../components/com_detail/Detail";

const ProductDetail = () => {
  const { ProductId } = useParams();
  return (
    <div className="ProductDetail">
      <Navbar />
      <Detail ProductId={ProductId} />
    </div>
  );
};

export default ProductDetail;
