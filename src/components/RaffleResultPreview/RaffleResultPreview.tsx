import "./RaffleResultPreview.scss";
import prize from "/prize.png";
export const RaffleResultPreview = () => {
  return (
    <div className="raffle-result__preview">
      <div className="raffle-result__preview-info">
        <div className="prize__wrapper">
          <div className="prize__winner-count">X{5}</div>
          <img src={prize} alt="Изображение приза" className="prize__img" />
        </div>
        <div className="raffle-result__details">
          <div className="header">Розыгрыш #253</div>
          <div className="details">Дата завершения: 12 мая 2024 в 23:59</div>
          <div className="label">825 участников</div>
        </div>
      </div>
      <button className="raffle-result__button">Скачать результаты</button>
    </div>
  );
};
