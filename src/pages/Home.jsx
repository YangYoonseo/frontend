import "../styles/Home.css";
import Navbar from "../components/common/Navbar";
import SearchBox from "../components/common/SearchBox";
import Main from "../components/com_home/Main";

const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <SearchBox />
      <Main />
    </div>
  );
};

export default Home;
