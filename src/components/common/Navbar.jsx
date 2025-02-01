import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { PiGiftDuotone } from "react-icons/pi";
import Gift from "../com_popup/Gift";

// 이미지
import home from "../../assets/img_common/home.svg";
import logo from "../../assets/img_common/logo.svg";

const Navbar = () => {
  const nav = useNavigate();
  const [popup, setPopup] = useState(false);

  return (
    <>
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
        <PiGiftDuotone
          className="gift"
          onClick={() => {
            setPopup(true);
          }}
        />
      </div>

      {popup && (
        <div className="popup-gift">
          <Gift
            onClose={() => {
              setPopup(false);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
