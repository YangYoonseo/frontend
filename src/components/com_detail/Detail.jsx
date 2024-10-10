import "../../styles/Detail.css";
import Line34 from "../../assets/img/Line34.svg";
import ProductCard from "../com_home/ProductCard";
// 필요한 Recharts 컴포넌트를 import
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const Detail = ({ productId, brand, title, discount, price, img }) => {
  // 가격변동 mockData
  const data = [
    { date: new Date("2023-05-19").getTime(), price: 12800 },
    { date: new Date("2023-05-28").getTime(), price: 21900 },
    { date: new Date("2023-08-02").getTime(), price: 21900 },
    { date: new Date("2023-08-19").getTime(), price: 14700 },
  ];

  //   추천 상품 mockData
  const recommendedProducts = [
    {
      productId: 0,
      brand: "굿라이프웍스",
      title: "오버사이즈 에센셜 스트라이프 셔츠 그레이",
      discount: "70%",
      price: "14,700원",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIDBAUGB//EADoQAAIBAgMFBAYJBAMAAAAAAAABAgMRBBIhBTFBUXETMmGBBiIjQrHBFFJicpGh0eHwFTM0ggck8f/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHREBAQADAAMBAQAAAAAAAAAAAAECAxESITFBIv/aAAwDAQACEQMRAD8A+h5gzCAyyeYMwgAeaQZhAA8wZhAA8wZhAA8wswWAAzSDNIhVqRpQcpytFb0eR25tqvWnKjQnki9N/wAefkc89kxbwwuXx6ettLC0XlqYmlHqy+FftYZqU1OPNWaPkmPxNSg7upUlJ8v0XzZm2dtraOBxCrUqmWCesZPR9UtPxMY7bfx0uqT9fZc8h55Hnthek2H2lko1JRp4iS0itVPp+h3kzrLK42WJdpIXaS8AZF7zSJdpLwDtJeBEQEu1kHayIAFT7WQu1qfZ/AixAaQGIIAGIACwwATAAABDAAQr2V27eJI5XpFiPo2zKk81k9OpMrydXGdvHnvSj0ignKlRn6i3W97x/c8vQx8alRt957rGPa+E2tiJRxUcPH6PKVnOM4ycOV43vFdUdv0c9E3Wj220neL91PRrxPJy33Xtk8f5jLCksXPs6EHUn9WLvm6vcv5qOv6H46Xta2MWZ92lFNRXh+57inSwGy6NodlQprdzZneOwmLbjhsVQqyW+MJpteW8fF5K+bYrDYvZVSE4JQnTlmV9ya4n1v0d2h/Vdj4fF2Sc4esk7rMt55TamGpV6Tp1Y3UuJ1f+OsLUwno+oVZOSdWeW/K511XtcNuPI9OIYHd5yEMQCCwxAJhYYXCtAAAQAAAAAAAAAAAAAB4v/kPaNOhThho1Iuo0nkT3XfE9jUqQowlUnPLFK7lyPkXp1iadf0rrToyhKjGnHNUjLMm7abr2RjZ7nHTX969tShKapT7SCwTpJU0oKz01u950MFFKnlVvC24+TbIr7ZxNOeF2fXj9DzLMlNXSb1tf5H1ahGUaEWt6ik7nnezvWDbM9pUYylgeyllWqlKzfnZnH2bh8RtLESniKMHOm7qrpe/XQ9BX7SW/ukaOOw9GCp1J06Tl3YvezMy76b8ePMYzay+l1MJh8tfEwl69LPZ+R9DwVGNHB0oQpqnFQSUdNDyfo5szDVvSDF4pxhLK1UTt7269z2Z6NePrrx7svfCExiOrgQiQmAmIbEAAJsLgahDEFAAAQAMQAAAAAASegGOrUc5SjUV6b0yy1T8i6nG0MtODhH6qgooyUaWIc26koU4N3UKd3KS8ZfJLzNH0al70HL7+vxR0iOfj8DSoXrQw9KE29ZRppX623mehioyi4P1XHh8zqLA0VJuFKMXyg2k+qX6HO2hsXtI9tha7o1od2TWaD8Gcdmvy9x217PH1VGKxDjH2cFKfCLdjz+0tq15NYOvhF7R2bp1cy+COyvp1KMqeMwEpyS1lh06kX+Sb/At2DsrtcbPG18LOlCP9uE4tXfOzPP4XvOPVduMnXS2Bs2OzsCotWqztKfhyR0hgemTk48WWXle0hDEVkhDEwExAxBSYCYEGwQxFQDEMAEMQAAwACipLPPKTrTyxtxZnT935r/w1IVbCP80fzLLfY16NCX83Mi+9blwas/KxtEm8+nL62q6c0Nq+j/fzFTVtdNePB9URlL2kV8eH7AYq9V4eulBWl7vJmvCYmGLoKrGNldprkzDtlSjRjKN1klqhbDqZliYfbzLnZmKOoAyJlQIHvBgIixtkWwE2IBMKTYXEBBuAAKgAAAAAAAQyvESy0rcyiiUs0s34bt3mFHvdPFaEZrJB+ruV+BKm7ZJrfonwW43EXv7WX/aFvzRCj6ze+1+7nuvLkOT7JSa8xYfRZvytvKLHqpPTlm/UoTvLdqtEnr5F1R2g8msmnb9HzKacc9SEOFtWtF0Az7YX/X0d7q265zdh1rY5xl78fM7O0E5NQW9QbPM0JujtFSjooy+ZjIeuIsd7pW3W0IsyouJsGQbAdyLYribIBsVxCCmAgCOgAwKEMAAAEADMtaWaTfJGibywk/5cyteq/wCcTeMKqxU+zw9SfKFy6C9SC5JfAz7T/wAWr4xsXrfD+cDSJ13amvEcPVjFLe95XUdow8idF9pOcuWnUC+p/acun5kaEMi8iya9XroQqyyw/MgyVpZsWvq2djzWOj2ePnHwPQy0qLwZx9vUsuJp1PraMlR3sFV7bB0p/Zs+pY2c3YVTNh5U/qu/4nQkzDUDZBsGyLYUNkWwbERDEJsVwJARuFwOoAAUAAACGAAU4mWVRjzZTEMRPNVa5Au7LyOk+IpxizUsvOxZV9WEevyFiV6yj9pfEWJ/trqyiGMrZKdKO+UtF1NmGWWlFZs0eBjxUFVoKnxktHyN+Hg40aan31HXqBbzfhfzMmIlebgty3mt8+G/8TLKEdI+RBmS1033X7mPbkM2EjNe5I6ThGe4z7QhnwNboKjmbFqZcRlW6cWdps81s6patTl4pfI9Jc51qE2RbBiIAi2DEwE2FxABIBDA6oABQhgAAKTywzchmXaEqkaC7LvXt3c35XXEooXet7zbZbH3uqRlwyrZvb1IzeuXLTy2VuV3qal3vP5HREKr1X318QxC9lflcJrWP3kSqL2c+jf5AZ5vNh4vxJ4OvOnVnB/2nacPDmiFBXw7h9qyLKsMrvy3BG/MtVx3fiQlGUrvwIU5Xin4W/Qi8Tr6ivx/UKlVUYxt/LGOvUpuMoSlG7Vjm7XxOIhXbnrQesLbok9nYd1pRqVd1yI5VL2dRrlJnpYSvBS8EefxH+TVyx3Sdjs4KebDU/BWMVY0XFcTYmzKmRY2AEQHYEgBDsFhgdQAEUMBDACrFxzYepHwv+BaRms0JR5qwHNw797w1L+fVlNBaTl469S73v8AZnWIKm+PVEuMvuie+Pl8Qe9/dYGbBStiJxl18zXWhePdzW0te2nU51+zxzfQ6GeUo97l8SpGejK05QXTnYclaWm/veZmqS7PGZeE3p1Nc9Y3W9akGbEUY1aLhNWi+PgUrHUcHTrU4y/7EFpTejehrXJ7uPQw47AYbF1IvEUozlDRS42IOTTquV5zlrffzZ19mT9hKPJnM2jh1RlFxisktE1ojTsed5VF4I50dW4CYrkaMYgAkAkSAAsAXA6gABQCAAABiAwQWVVOr+JJ9+P3mOUYxqzUOLu+r3ife/2Z1iCW5eRKb9qujFx80Kr30BixitiHLyNlKWaKMmPUliMz3aW/A0Yd5VbnEqMW2IT7GVSjH2lNuUepbsrGQ2hgoYikrZ1qt7UuKLcbx6/I83svE/0nalbCz/x6s1JP6rfEg9JpGdnu+KIStma56foXpRetr31XKwp0VLqQcvHKLpOnOMvs24MzbKlkr2lxVjftNQpU1OrOK1tvsc7CVaVbExqUKkWk7NmaOxcCNx3ObRjuRuMCSGmRQyiYCQwOmAAUAAIB3C4gAy1O9PqRnw+8yU+8+pCXD7z+J1iLIr115fAqqFy766r4FbAzY1ZoxnyLqSvSz8ldCrRzYeS5NFmD9bDroviEUY+UdJePyPObSpxq1IVMusUk/FHfxlCpXqvs/Vin/NDNPZay3nPKnxZYlT2ZWz4eMXvgtGW4nGOnTmqDzVLeryKKUFKXY0dKdNWtpmb534nAW3qf9QjhKuHrxlKo4qdtIvm0/kSijaU63bwq4mpKTbs7lqxFHD4jC0oZlOqpSgt6duZv2rg3iMJVyJZ0tOvh1ONhaEquIwmKi3HsINvw5ozxXraUlOCkuKJmXAyjKk8ppOV+tQySIjRBJEkRRJFDQxLcFyj/2Q==",
    },
    {
      productId: 1,
      brand: "후크",
      title: "빈티지 워싱 네이비 체크셔츠",
      discount: "53%",
      price: "43,900원",
      img: "data:image/jpeg;base64,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",
    },
    {
      productId: 2,
      brand: "이즈",
      title: "린넨 셔츠 [오버사이즈 핏]",
      discount: "50%",
      price: "31,500원",
      img: "data:image/jpeg;base64,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",
    },
  ];

  // 날짜 형식 변환
  const formatDate = (timestamp) => {
    const date = new Date(timestamp); // timestamp 사용
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // x축 시작, 끝 날짜
  const minDate = Math.min(...data.map((item) => item.date)); // 첫 번째 날짜
  const maxDate = Math.max(...data.map((item) => item.date)); // 마지막 날짜

  // Y축 시작, 끝 가격
  const minPrice = Math.min(...data.map((item) => item.price));
  const maxPrice = Math.max(...data.map((item) => item.price));

  //   평균 가격
  const avgPrice =
    data.reduce((sum, item) => sum + item.price, 0) / data.length;

  return (
    <div className="Detail">
      <div className="Detail_main">
        <img src={img} alt="" className="productImg" />
        <div className="title">
          <p>{brand}</p>
          <h3>{title}</h3>
          <div className="link_price">
            <button>무신사 구매 링크</button>
            <p>
              <span>{discount}</span> {price}
            </p>
          </div>
          <div className="priceGraph">
            <div className="graph_ment">
              <button>3개월/전체</button>
              <p>가격 그래프</p>
            </div>

            <LineChart width={350} height={198} data={data}>
              <CartesianGrid stroke="#FFFFFF33" strokeDasharray="2 1" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                scale="time"
                type="number"
                domain={[minDate, maxDate]} // 첫 번째 날짜부터 마지막 날짜로 설정
                stroke="#FFFFFF"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[minPrice - 5000, maxPrice + 5000]}
                stroke="#FFFFFF"
                tick={{ fontSize: 12 }}
              />
              <Line type="linear" dataKey="price" stroke="#FF7777" />
            </LineChart>
            <div className="price4">
              <p>정가: {price}</p>
              <p>최고 할인가: {minPrice}원</p>
              <p>최저 할인가: {maxPrice}원</p>
              <p>평균 가격: {avgPrice}원</p>
            </div>
            <img src={Line34} alt="" className="Line34" />
          </div>
        </div>
      </div>
      <div className="recommend">
        <p className="recommend_ment">추천 유사 상품</p>
        <div className="recomment_map">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.productId}
              productId={product.productId}
              brand={product.brand}
              title={product.title}
              discount={product.discount}
              price={product.price}
              img={product.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
