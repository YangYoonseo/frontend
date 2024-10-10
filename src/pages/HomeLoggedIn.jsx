import "../styles/HomeLoggedIn.css";
import Navbar from "../components/common/Navbar";
import SearchBox from "../components/common/SearchBox";
import Chart from "../components/com_home/Chart";
import Line34 from "../assets/img/Line34.svg";

const HomeLoggedIn = () => {
  return (
    <div className="Home HomeLoggedIn">
      <Navbar />
      <SearchBox />
      <div className="Home_ment">
        <p>
          옷 살 때마다 항상 바뀌는 가격,
          <br />
          편하게 비교해보세요!
        </p>
      </div>
      <Chart title={"💛 찜 리스트"} />
      <img src={Line34} alt="" className="Line34" />
      <Chart title={"🔥 인기 차트"} />
      <img src={Line34} alt="" className="Line34" />
      <Chart title={"👍 많이 검색된 상품"} />
    </div>
  );
};

export default HomeLoggedIn;
