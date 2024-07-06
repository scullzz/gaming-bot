import prize from "/prize.png";
import "./Prize.scss";
export const Prize = () => {
  return (
    <div className="prize">
      <div className="prize__partipiciant-count">Участников: 1205</div>
      <div className="avatar__is-live prize__available-time">
        00ч : 52м : 55с
      </div>
      <div className="prize__wrapper">
        <div className="prize__winner-count">X10</div>
        <img src={prize} alt="Изображение приза" className="prize__img" />
      </div>
      <span className="header-text">Розыгрыш</span>
      <span className="details-text">
        Розыгрыш на 100к для рефералов казино R7 используй промо COBRIK (100FS)
        ИЛИ COBRIK200 (200%+100FS): https://cobrik.pro/r7
      </span>
      <span className="header-text">Для участия:</span>
      <ul className="prize__conditions">
        <li className="details-text">заполнить email от VAVADA</li>
        <li className="details-text">заполнить email от VAVADA</li>
        <li className="details-text">заполнить email от VAVADA</li>
      </ul>
      <div className="header-text">Дата окончания</div>
      <span className="details-text" style={{ textAlign: "center" }}>
        12 мая 2024 в 23:59
      </span>
      <button className="attention-btn">Участвовать</button>
    </div>
  );
};
