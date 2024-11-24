import "../../styles/Detail.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Line34 from "../../assets/img/Line34.svg";
import share from "../../assets/img/share.svg";
import leftButton from "../../assets/img_common/leftButton.svg";
import rightButton from "../../assets/img_common/rightButton.svg";
import { ResponsiveContainer } from "recharts";
import LikeButton from "../common/LikeButton";
// 필요한 Recharts 컴포넌트를 import
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const Detail = ({ ProductId }) => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingKakao, setLoadingKakao] = useState(true);
  const [term, setTerm] = useState("three-month"); // 3개월/전체

  // 카카오 SDK 초기화
  useEffect(() => {
    if (window.Kakao) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
      setLoadingKakao(false);
    }
  }, []);

  useEffect(() => {
    const Detailed = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APIT_URL}/api/product/${ProductId}`
        );
        console.log("데이터 디테일 불러오기 성공", response.data.data);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("데이터 디테일 불러오기 실패", error);
      }
    };

    Detailed();
  }, [ProductId]);

  if (loading || loadingKakao) {
    return <p></p>;
  }

  //   3개월/전체 변동 함수
  const onClickTerm = () => {
    if (term === "three-month") {
      setTerm("whole");
    } else {
      setTerm("three-month");
    }
  };

  const data = product.priceHistoryList.map((item) => ({
    date: new Date(item.date).getTime(),
    price: item.price,
  }));

  // 날짜 형식 변환
  const formatDate = (timestamp) => {
    const date = new Date(timestamp); // timestamp 사용
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Y축 범위를 비율로 설정하는 부분
  const priceRange = product.highestPrice - product.lowestPrice;
  const margin = priceRange * 0.1; // 가격 차이의 10%를 margin으로 설정

  //   추천 상품 mockData
  const recommendedProducts = [
    {
      ProductId: 0,
      Category: "아우터",
      Brand: "트릴리온",
      ProductName: "유니섹스 발마칸 더플 숏 코트 (BEIGE)",
      Price: 98000,
      DiscountRate: "24%",
      OriginalPrice: 128900,
      ProductURL: "https://www.musinsa.com/app/goods/2862908",
      ImageURL:
        "https://image.msscdn.net/thumbnails/images/goods_img/20221014/2862908/2862908_1_big.jpg?w=780",
    },
    {
      ProductId: 1,
      Category: "아우터",
      Brand: "데밀",
      ProductName: "LOT.062 파이오니어 셀비지 데님자켓 인디고",
      Price: 223200,
      DiscountRate: "20%",
      OriginalPrice: 279000,
      ProductURL: "https://www.musinsa.com/app/goods/3510056",
      ImageURL:
        "https://image.msscdn.net/thumbnails/images/goods_img/20230829/3510056/3510056_17147199908980_big.jpg?w=780",
    },
  ];

  //   ProductURL 열기
  const handleButtonClick = () => {
    window.open(product.productURL, "_blank");
  };

  //   카카오톡 링크 공유
  const KaKaoShare = (productName, imageURL, price) => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "MUSINSA OBSERVER",
        description: `${productName} ${price}원`,
        imageUrl: imageURL,
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
        {
          title: "앱으로 이동",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
      ],
    });
  };

  const onClickKakao = () => {
    KaKaoShare(
      product.productName,
      product.imageURL,
      product.price.toLocaleString()
    );
  };

  // x축 시작, 끝 날짜
  const minDate = Math.min(...data.map((item) => item.date)); // 첫 번째 날짜
  const maxDate = Math.max(...data.map((item) => item.date)); // 마지막 날짜

  //   평균 가격
  const avgPrice =
    data.reduce((sum, item) => sum + item.price, 0) / data.length;

  return (
    <div className="Detail">
      <div className="Detail_main">
        <img src={product.imageURL} alt="" className="productImg" />
        <div className="title">
          <div className="like_share">
            <p>{product.brand}</p>
            <div>
              <LikeButton />
              <img
                src={share}
                alt=""
                className="share"
                onClick={onClickKakao}
              />
            </div>
          </div>
          <h3>{product.productName}</h3>
          <div className="link_price">
            <button onClick={handleButtonClick}>무신사 구매 링크</button>
            <p>
              <span>{product.discountRate}%</span>{" "}
              {product.price.toLocaleString()}원
            </p>
          </div>
          <div className="priceGraph">
            <div className="graph_ment">
              <div>
                <p className={`three-month three-month_${term}`}>3개월</p>
                <p>/</p>
                <p className={`whole whole_${term}`}>전체</p>
                <img
                  src={term === "three-month" ? leftButton : rightButton}
                  alt=""
                  // onClick={onClickTerm}
                  // 전체 그래프 안 만들어짐
                />
              </div>
              <p className="graph_p">가격 그래프</p>
            </div>
            <div className="graph_div">
              <ResponsiveContainer width="100%">
                <LineChart
                  data={data}
                  margin={{ top: 0, right: 10, left: 30, bottom: 0 }}
                >
                  <CartesianGrid stroke="#FFFFFF33" strokeDasharray="2 1" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    scale="time"
                    type="number"
                    domain={[minDate, maxDate]} // 첫 번째 날짜부터 마지막 날짜로 설정
                    stroke="#FFFFFF"
                    tick={{ fontSize: 17 }}
                    interval="preserveStartEnd" // 시작과 끝을 보존하는 설정
                  />
                  <YAxis
                    domain={[
                      product.lowestPrice - margin,
                      product.highestPrice + margin,
                    ]}
                    ticks={data.map((item) => item.price).sort((a, b) => a - b)} // 정렬된 ticks
                    stroke="#FFFFFF"
                    tickFormatter={(value) => value.toLocaleString()} // y값 포맷팅
                    tickLine={false}
                    tick={(props) => {
                      const { x, y, payload } = props;
                      const isCurrentPrice =
                        payload.value === product.currentPrice;

                      return (
                        <text
                          x={x}
                          y={y}
                          fill={isCurrentPrice ? "#FF7777" : "#FFFFFF"} // currentPrice일 때 빨간색
                          fontSize={17}
                          textAnchor="end"
                        >
                          {payload.value.toLocaleString()}
                        </text>
                      );
                    }}
                  />
                  <Line type="linear" dataKey="price" stroke="#FF7777" />
                  <ReferenceLine
                    y={product.currentPrice || 0}
                    stroke="#FF7777"
                    strokeDasharray="10 10"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="price4">
              <p>정가: {product.originalPrice.toLocaleString()}원</p>
              <p>최고가: {product.highestPrice.toLocaleString()}원</p>
              <p>최저가: {product.lowestPrice.toLocaleString()}원</p>
              <p>평균 가격: {avgPrice.toLocaleString()}원</p>
            </div>
            <img src={Line34} alt="" className="Line34" />
          </div>
        </div>
      </div>
      {/* <div className="recommend">
        <p className="recommend_ment">추천 유사 상품</p>
        <div className="recomment_map">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.ProductId}
              ProductId={product.ProductId}
              Category={product.Category}
              Brand={product.Brand}
              ProductName={product.ProductName}
              Price={product.Price}
              DiscountRate={product.DiscountRate}
              OriginalPrice={product.OriginalPrice}
              ProductURL={product.ProductURL}
              ImageURL={product.ImageURL}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Detail;
