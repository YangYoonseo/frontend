// import ProductCard from "./ProductCard";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import "../../styles/Chart.css";

// const Chart = ({ title }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // api로 데이터 불러오기
//     const fetchProducts = async () => {
      
//       try {
//         const response = await axios.get("/mockData.json");
//         setProducts(response.data);
//         // console.log("products 리스트 불러오기 성공");
//         // console.log(response.data);
//       } catch (error) {
//         // console.log("products 리스트 불러오기 error", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <p>loading...</p>;
//   }

//   return (
//     <div className="Chart">
//       <div className="Chart_title">
//         <h1>{title}</h1>
//         <button className="more">더 보기</button>
//       </div>
//       <div className="Chart-list">
//         {products.map((product) => (
//           <ProductCard
//             key={product.ProductId}
//             productId={product.ProductId}
//             Category={product.Category}
//             Brand={product.Brand}
//             ProductName={product.ProductName}
//             Price={product.Price}
//             DiscountRate={product.DiscountRate}
//             OriginalPrice={product.OriginalPrice}
//             ProductURL={product.ProductURL}
//             ImageURL={product.ImageURL}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chart;
