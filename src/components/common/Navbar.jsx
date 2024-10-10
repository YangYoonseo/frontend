import "./Navbar.css";

// 이미지
import home from "../../assets/img_common/home.svg";
import logo from "../../assets/img_common/logo.svg";
import mypage from "../../assets/img_common/mypage.svg";

const Navbar = () => {
  return (
    <div className="Navbar">
      <img src={home} alt="" className="home" />
      <img src={logo} alt="" className="logo" />
      <img src={mypage} alt="" className="mypage" />
    </div>
  );
};

export default Navbar;
