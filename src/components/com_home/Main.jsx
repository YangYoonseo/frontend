import "../../styles/Main.css";

const Main = () => {
  return (
    <div className="Main">
      <div className="middle">
        <p>로그인 시 찜하기 및 가격 변동 알림 받기가 가능합니다.</p>
        <p>
          옷 살 때마다 항상 바뀌는 가격,
          <br />
          편하게 비교해보세요!
        </p>
        <p>
          무신사 스카우터는
          <br />
          소비자들의 합리적인 구매를 위한
          <br />
          목적으로 개발되었습니다.
        </p>
        <p>저희는 수익을 창출하지 않습니다.</p>
      </div>

      <div className="bottom">
        <p>
          무신사스카우터에서 제공하는 제품의 가격과 정보는
          <br />
          주기적으로 업데이트 되고 있습니다.
        </p>
        <p>
          업데이트 후 무신사에서 제품 가격이 변경될 수 있으므로,
          <br />
          무신사스카우터에서 제공하는 제품 가격과 다르게 조회될 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Main;
