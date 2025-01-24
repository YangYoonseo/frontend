import "../../styles/Detail.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Line34 from "../../assets/img/Line34.svg";
import share from "../../assets/img/share.svg";
import { ResponsiveContainer } from "recharts";
import LikeButton from "../common/LikeButton";
import LoadingSpinner from "../com_search/LoadingSpinner";
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

  // 카카오 SDK 초기화
  useEffect(() => {
    const loadKakaoSDK = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        try {
          window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
          setLoadingKakao(false);
        } catch (error) {
          // console.error("Kakao SDK initialization error:", error);
        }
      }
    };

    // Kakao SDK가 로드되었는지 확인
    if (document.readyState === "complete") {
      loadKakaoSDK();
    } else {
      window.addEventListener("load", loadKakaoSDK);
      return () => {
        window.removeEventListener("load", loadKakaoSDK);
      };
    }
  }, []);

  useEffect(() => {
    const Detailed = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APIT_URL}/api/product/${ProductId}`
        );
        // console.log("데이터 디테일 불러오기 성공", response.data.data);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        // console.log("데이터 디테일 불러오기 실패", error);
      }
    };

    Detailed();
  }, [ProductId]);

  const data = useMemo(
    () =>
      product?.priceHistoryList.map((item) => ({
        date: new Date(item.date).getTime(),
        price: item.price,
      })),
    [product]
  );

  if (loading || !product) {
    return <LoadingSpinner />;
  }

  // 날짜 형식 변환
  const formatDate = (timestamp) => {
    const date = new Date(timestamp); // timestamp 사용
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const currentDate = new Date().getTime();

  const xDomain = data.map((item) => item.date); // X축은 data에 실제 있는 날짜로만 표시
  const minDate = Math.min(...data.map((item) => item.date));
  const minPrice = data.find((item) => item.date === minDate)?.price;

  const lineDataPast = [
    ...Array.from({ length: 3 }, (_, index) => ({
      date: minDate - (index + 1) * 24 * 60 * 60 * 1000, // 과거 날짜 생성
      price: minPrice, // 최소 날짜 가격 고정
    })),
    { date: minDate, price: minPrice },
  ];

  const maxDate = Math.max(...data.map((item) => item.date));
  const maxPrice = data.find((item) => item.date === maxDate)?.price;

  const lineDataCurrent = [
    ...data.filter((item) => item.date >= maxDate),
    { date: currentDate, price: maxPrice }, // 현재 시점 데이터 추가
  ];
  const combinedData = [...data, ...lineDataCurrent];

  // Y축 범위를 비율로 설정하는 부분
  const priceRange = product.highestPrice - product.lowestPrice;
  const margin = priceRange * 0.1; // 가격 차이의 10%를 margin으로 설정

  //   ProductURL 열기
  const handleButtonClick = () => {
    window.open(product.productURL, "_blank");
  };

  //   카카오톡 링크 공유
  const KaKaoShare = (productName, imageURL, price, ProductId) => {
    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "MUSINSA OBSERVER",
          description: `${productName} ${price}원`,
          imageUrl: imageURL,
          link: {
            mobileWebUrl: `https://www.google.com/search?q=js+let+%EB%A7%90%EA%B3%A0&sca_esv=5791a0164e19b13c&sxsrf=AHTn8zpT3fPC9ohiAe2o35_tMhInD9IPCQ%3A1737642797065&ei=LVOSZ-HXA-Khvr0PsevPyA8&ved=0ahUKEwihoqnth4yLAxXikK8BHbH1E_kQ4dUDCBI&uact=5&oq=js+let+%EB%A7%90%EA%B3%A0&gs_lp=Egxnd3Mtd2l6LXNlcnAiDWpzIGxldCDrp5Dqs6AyBRAhGKABSPkjUJoHWMMhcAN4AJABAZgBqAGgAfgOqgEEMC4xM7gBA8gBAPgBAZgCDaACxguoAgrCAgcQIxgnGOoCwgILEAAYgAQYsQMYgwHCAhEQLhiABBixAxjRAxiDARjHAcICBBAAGAPCAgQQLhgDwgIFEAAYgATCAg4QLhiABBixAxjRAxjHAcICBBAjGCfCAgsQABiABBiRAhiKBcICBRAuGIAEwgILEC4YgAQY0QMYxwHCAgoQABiABBhDGIoFwgIREC4YgAQYxwEYmAUYmQUYrwHCAggQABiABBjLAZgDC_EFf3vLEv_8vK6SBwQzLjEwoAeXUA&sclient=gws-wiz-serp`,
            webUrl: `https://www.google.com/search?q=js+let+%EB%A7%90%EA%B3%A0&sca_esv=5791a0164e19b13c&sxsrf=AHTn8zpT3fPC9ohiAe2o35_tMhInD9IPCQ%3A1737642797065&ei=LVOSZ-HXA-Khvr0PsevPyA8&ved=0ahUKEwihoqnth4yLAxXikK8BHbH1E_kQ4dUDCBI&uact=5&oq=js+let+%EB%A7%90%EA%B3%A0&gs_lp=Egxnd3Mtd2l6LXNlcnAiDWpzIGxldCDrp5Dqs6AyBRAhGKABSPkjUJoHWMMhcAN4AJABAZgBqAGgAfgOqgEEMC4xM7gBA8gBAPgBAZgCDaACxguoAgrCAgcQIxgnGOoCwgILEAAYgAQYsQMYgwHCAhEQLhiABBixAxjRAxiDARjHAcICBBAAGAPCAgQQLhgDwgIFEAAYgATCAg4QLhiABBixAxjRAxjHAcICBBAjGCfCAgsQABiABBiRAhiKBcICBRAuGIAEwgILEC4YgAQY0QMYxwHCAgoQABiABBhDGIoFwgIREC4YgAQYxwEYmAUYmQUYrwHCAggQABiABBjLAZgDC_EFf3vLEv_8vK6SBwQzLjEwoAeXUA&sclient=gws-wiz-serp`,
          },
        },
        buttons: [
          {
            title: "웹으로 이동",
            link: {
              mobileWebUrl: `https://www.google.com/search?q=js+let+%EB%A7%90%EA%B3%A0&sca_esv=5791a0164e19b13c&sxsrf=AHTn8zpT3fPC9ohiAe2o35_tMhInD9IPCQ%3A1737642797065&ei=LVOSZ-HXA-Khvr0PsevPyA8&ved=0ahUKEwihoqnth4yLAxXikK8BHbH1E_kQ4dUDCBI&uact=5&oq=js+let+%EB%A7%90%EA%B3%A0&gs_lp=Egxnd3Mtd2l6LXNlcnAiDWpzIGxldCDrp5Dqs6AyBRAhGKABSPkjUJoHWMMhcAN4AJABAZgBqAGgAfgOqgEEMC4xM7gBA8gBAPgBAZgCDaACxguoAgrCAgcQIxgnGOoCwgILEAAYgAQYsQMYgwHCAhEQLhiABBixAxjRAxiDARjHAcICBBAAGAPCAgQQLhgDwgIFEAAYgATCAg4QLhiABBixAxjRAxjHAcICBBAjGCfCAgsQABiABBiRAhiKBcICBRAuGIAEwgILEC4YgAQY0QMYxwHCAgoQABiABBhDGIoFwgIREC4YgAQYxwEYmAUYmQUYrwHCAggQABiABBjLAZgDC_EFf3vLEv_8vK6SBwQzLjEwoAeXUA&sclient=gws-wiz-serp`,
              webUrl: `http://localhost:5173/product_detail/${ProductId}`,
            },
          },
        ],
      });
    } catch (error) {
      console.error("KakaoShare error:", error);
    }
  };

  const onClickKakao = () => {
    KaKaoShare(
      product.productName,
      product.imageURL,
      product.price.toLocaleString(),
      ProductId
    );
  };

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
                {/* <p className={`three-month three-month_${term}`}>3개월</p>
                <p>/</p>
                <p className={`whole whole_${term}`}>전체</p>
                <img
                  src={term === "three-month" ? leftButton : rightButton}
                  alt=""
                  // onClick={onClickTerm}
                  // 전체 그래프 안 만들어짐
                /> */}
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
                    domain={[Math.min(...xDomain), currentDate]} // 첫 번째 날짜부터 오늘 날짜로 설정
                    ticks={xDomain}
                    stroke="#FFFFFF"
                    tick={{ fontSize: 17 }}
                    interval="preserveStartEnd" // 시작과 끝을 보존하는 설정
                  />
                  {console.log(data)}
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
                  {/* 과거 데이터(회색) 라인 */}
                  <Line
                    type="linear"
                    dataKey="price"
                    data={lineDataPast} // 과거 데이터만 표시
                    stroke="#B0B0B0" // 회색
                    dot={false}
                    activeDot={false}
                  />
                  {/* 현재 데이터(빨간색) 라인 */}
                  <Line
                    type="linear"
                    dataKey="price"
                    data={combinedData} // 현재 데이터만 표시
                    stroke="#FF7777" // 빨간색
                    strokeWidth={1.5} // 선 두께 설정 (기본값은 1)
                    dot={false}
                    activeDot={false}
                  />
                  {/* <ReferenceLine
                    y={product.currentPrice || 0}
                    stroke="#FF7777"
                    strokeDasharray="10 10"
                  /> */}
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
    </div>
  );
};

export default Detail;
