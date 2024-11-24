import unlikeImg from "../../assets/img_common/unlikeImg.svg";
import likeImg from "../../assets/img_common/likeImg.svg";
import { useState } from "react";

// 추후 likeButton api 연결해야함
const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  // 현재 로그인 기능이 없어서 경고창으로 해놓음(추후 수정)
  const handleClick = (e) => {
    e.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 막음
    alert("로그인이 필요합니다");
    // setLiked(!liked); // 하트 상태 변경
    console.log("하트 버튼 누름");
  };

  return (
    <div className="LikeButton">
      <button onClick={handleClick}>
        <img src={liked ? likeImg : unlikeImg} alt="like/unlike icon" />
      </button>
    </div>
  );
};

export default LikeButton;
