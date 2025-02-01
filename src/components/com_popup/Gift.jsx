import "../../styles/Gift.css";

const Gift = ({ onClose }) => {
  return (
    <div className="Gift">
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <h2>안녕하세요, 무신사 옵저버입니다! 🛍️✨</h2>
      <p>
        무신사 옵저버는 옷 가격 변화를 한눈에 볼 수 있도록 만든 서비스예요.
        합리적인 쇼핑을 돕고자 대학생들이 모여 시작한 작은 프로젝트랍니다.
      </p>
      <p>
        그런데… 저희가 열심히 만든 이 서비스를 유지하려면 매달{" "}
        <strong>30달러 이상의 서버비</strong>가 필요해요. 😢
      </p>
      <p>
        큰 금액은 아니지만, 저희 같은 대학생들에겐 꽤 부담이 되는 금액이라서요.
      </p>
      <p>그래서 살짝 도움을 요청드리려고 합니다!</p>
      <p>
        무신사 옵저버가 유용하다고 느끼셨다면, 작은 후원으로 저희를 응원해
        주세요. 후원해 주신 금액은 100% 서버비와 서비스 운영에 사용될
        예정입니다.
      </p>
      <p>
        <span className="coffee">☕</span>{" "}
        <strong>커피 한 잔 대신 무신사 옵저버에 작은 응원하기</strong>
      </p>
      <a href="#" className="support-link">
        토스뱅크 1001-4401-6682
      </a>
      <p>
        여러분의 관심과 응원 덕분에 무신사 옵저버는 계속 발전하고 있습니다. 정말
        감사합니다! ❤️
      </p>
      <p className="team">- 무신사 옵저버 팀 드림</p>
    </div>
  );
};

export default Gift;
