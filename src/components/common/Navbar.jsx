import "./Navbar.css";
import { useNavigate } from "react-router-dom";

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
        // 일단 로그아웃 페이지로 이동
        onClick={() => {
          nav("/main_loggedOut");
        }}
      />
      <img src={logo} alt="" className="logo" />
      <img src={mypage} alt="" className="mypage" />
    </div>
  );
};

export default Navbar;
