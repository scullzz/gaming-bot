import prize from "/prize.png";
import "./Prize.scss";
import { GetRaffleDto } from "../../types/getRaffleDto";
import { formatRaffleDate } from "../../functions/formatRaffleDate";
import { formatRaffleTimeRemaining } from "../../functions/formatRaffleTimeRemaining";

interface IPrizeProps extends GetRaffleDto {}
export const Prize = ({
  description,
  amountOfWinners,
  amountOfParticipants,
  endTime,
}: IPrizeProps) => {
  return (
    <div className="prize">
      <div className="prize__partipiciant-count">
        Участников: {amountOfParticipants}
      </div>
      <div className="avatar__is-live prize__available-time">
        {formatRaffleTimeRemaining(endTime)}
      </div>
      <div className="prize__wrapper">
        <div className="prize__winner-count">X{amountOfWinners}</div>
        <img src={prize} alt="Изображение приза" className="prize__img" />
      </div>
      <span className="header-text">Розыгрыш</span>
      <span className="details-text">{description}</span>
      <span className="header-text">Для участия:</span>
      <ul className="prize__conditions">
        <li className="details-text">заполнить email от VAVADA</li>
        <li className="details-text">заполнить email от VAVADA</li>
        <li className="details-text">заполнить email от VAVADA</li>
      </ul>
      <div className="header-text">Дата окончания</div>
      <span className="details-text" style={{ textAlign: "center" }}>
        {formatRaffleDate(endTime)}
      </span>
      <button className="attention-btn">Участвовать</button>
    </div>
  );
};
