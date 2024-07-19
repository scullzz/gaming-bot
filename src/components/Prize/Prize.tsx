import prize from "/prize.png";
import "./Prize.scss";
import Done from "/corrrect-green.png";
import notDone from "/cross-red.png";
import { GetRaffleDto } from "../../types/getRaffleDto";
import { formatRaffleDate } from "../../functions/formatRaffleDate";
import { formatRaffleTimeRemaining } from "../../functions/formatRaffleTimeRemaining";
import { GetRaffleConditionDto } from "../../types/getRaffleConditionDto";
import correct from "/corrrect-green.png";
import { NotAvailable } from "../NotAvailable.tsx/NotAvailable";

export interface IPrizeProps extends GetRaffleDto {
  onClick: () => void;
}
export const Prize = ({
  description,
  amountOfWinners,
  amountOfParticipants,
  raffleConditions,
  isCreator,
  onClick,
  isParticipant,
  endTime,
}: IPrizeProps) => {
  const available = new Date(endTime) > new Date();
  return (
    <div className="prize">
      {isParticipant && (
        <div className="prize__partipiciant-count">
          Участников: {amountOfParticipants}
        </div>
      )}
      {available && (
        <div className="avatar__is-live prize__available-time">
          {formatRaffleTimeRemaining(endTime)}
        </div>
      )}

      <div className="prize__wrapper">
        <div className="prize__winner-count">X{amountOfWinners}</div>
        <img src={prize} alt="Изображение приза" className="prize__img" />
      </div>
      <span className="header-text">Розыгрыш</span>
      <span className="details-text">
        {
          <NotAvailable
            available={description !== ""}
            text="Нет описания"
          ></NotAvailable>
        }
        {description}
      </span>
      <span className="header-text">Для участия:</span>
      <ul className="prize__conditions">
        <NotAvailable
          available={raffleConditions.length !== 0}
          text="Нет специальных условий"
        ></NotAvailable>
        {raffleConditions.map((t, i) => (
          <PrizeCondition {...t} key={i}></PrizeCondition>
        ))}
      </ul>
      <div className="header-text">Дата окончания</div>
      <span className="details-text" style={{ textAlign: "center" }}>
        {formatRaffleDate(endTime)}
      </span>
      {!isParticipant && !isCreator && available && (
        <button className="attention-btn" onClick={onClick}>
          Участвовать
        </button>
      )}
      {isParticipant && available && (
        <button
          onClick={onClick}
          className="attention-opacity-btn"
          style={{
            backgroundColor: "#48F955",
            color: "#35C759",
            marginTop: "20px",
            columnGap: "20px",
          }}
        >
          <img src={correct} className="icon" />
          Вы участвуете в розыгрыше
        </button>
      )}
      {!available && (
        <button
          onClick={onClick}
          className="attention-opacity-btn"
          style={{
            marginTop: "20px",
            textTransform: "uppercase",
          }}
        >
          подробнее
        </button>
      )}
    </div>
  );
};

interface IPrizeConditionProps extends GetRaffleConditionDto {}
const PrizeCondition = ({ isDone, title }: IPrizeConditionProps) => {
  return (
    <li className="prize__condition">
      <img src={isDone ? Done : notDone} className="icon" />
      <span className="details-text" style={{ marginTop: 0 }}>
        {title}
      </span>
    </li>
  );
};
