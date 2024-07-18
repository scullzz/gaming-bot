import prize from "/prize.png";
import "./Prize.scss";
import Done from "/corrrect-green.png";
import notDone from "/cross-red.png";
import { GetRaffleDto } from "../../types/getRaffleDto";
import { formatRaffleDate } from "../../functions/formatRaffleDate";
import { formatRaffleTimeRemaining } from "../../functions/formatRaffleTimeRemaining";
import { GetRaffleConditionDto } from "../../types/getRaffleConditionDto";

interface IPrizeProps extends GetRaffleDto {}
export const Prize = ({
  description,
  amountOfWinners,
  amountOfParticipants,
  raffleConditions,
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
        {raffleConditions.map((t, i) => (
          <PrizeCondition {...t} key={i}></PrizeCondition>
        ))}
      </ul>
      <div className="header-text">Дата окончания</div>
      <span className="details-text" style={{ textAlign: "center" }}>
        {formatRaffleDate(endTime)}
      </span>
      <button className="attention-btn">Участвовать</button>
    </div>
  );
};

interface IPrizeConditionProps extends GetRaffleConditionDto {}
const PrizeCondition = ({ isDone, description }: IPrizeConditionProps) => {
  return (
    <li className="prize__condition">
      <img src={isDone ? Done : notDone} className="icon" />
      <span className="details-text">{description}</span>
    </li>
  );
};
