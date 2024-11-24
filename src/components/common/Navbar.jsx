import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

// 이미지
import home from "../../assets/img_common/home.svg";
import logo from "../../assets/img_common/logo.svg";
import mypage from "../../assets/img_common/myPage.svg";
// 로그인 했을때 마이페이지
import mypage_login from "../../assets/img_common/myPage_login.svg";

const Navbar = () => {
  const nav = useNavigate();
  return (
    <div className="Navbar">
      <img
        src={home}
        alt=""
        className="home"
        onClick={() => {
          nav("/");
        }}
      />
      <img src={logo} alt="" className="logo" />
      <FiUser
        className="mypage"
        onClick={() => {
          alert("아직 로그인 기능이 완성되지 않았습니다");
        }}
      />
    </div>
  );
};

export default Navbar;
