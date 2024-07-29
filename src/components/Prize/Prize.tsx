import prize from "/prize.png";
import "./Prize.scss";
import Done from "/correct-green.svg";
import notDone from "/cross-red.svg";
import { GetRaffleDto } from "../../types/getRaffleDto";
import { formatRaffleDate } from "../../functions/formatRaffleDate";
import { formatRaffleTimeRemaining } from "../../functions/formatRaffleTimeRemaining";
import { GetRaffleConditionDto } from "../../types/getRaffleConditionDto";
import correct from "/correct-green-prize.svg";
import { NotAvailable } from "../NotAvailable.tsx/NotAvailable";
import { useDoParticipantInRaffleMutation } from "../../features/api";
import { getNameId } from "../../functions/getValueFromJwt";
import { Details } from "../Details/Details";
import { handleError } from "../../functions/handleError";
import { useNavigate } from "react-router-dom";

export interface IPrizeProps extends GetRaffleDto {
  streamerId?: string;
  update: () => void;
}
export const Prize = ({
  description,
  id,
  amountOfWinners,
  amountOfParticipants,
  raffleConditions,
  isCreator,
  streamerId,
  update,
  isParticipant,
  endTime,
}: IPrizeProps) => {
  const available = new Date(endTime) > new Date();
  const userId = getNameId();
  const navigate = useNavigate();
  const [
    doParticipant,
    {
      isLoading: doParticipantLoading,
      error: participantError,
      reset: resetParticipantError,
    },
  ] = useDoParticipantInRaffleMutation();
  const participantErrorText = handleError(participantError);
  const onClick = () => {
    const available = new Date(endTime) > new Date();
    const canParticipate = !isParticipant && !isCreator && available;
    if (canParticipate) {
      doParticipant({ raffleId: id, userId })
        .unwrap()
        .then(() => update());
    }
    if (!available)
      navigate(`/raffle/${id}?streamerId=${streamerId}`, {
        state: { streamerId },
      });
  };
  return (
    <div className="prize">
      <Details
        isLoading={doParticipantLoading}
        error={participantErrorText}
        onClose={() => resetParticipantError()}
      ></Details>
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
      <span className="header-text">Розыгрыш #{id}</span>
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
        <button
          className="attention-btn"
          onClick={onClick}
          style={{
            marginTop: "20px",
            textTransform: "uppercase",
          }}
        >
          Участвовать
        </button>
      )}
      {isParticipant && available && (
        <button
          onClick={onClick}
          className="attention-opacity-btn"
          style={{
            backgroundColor: "#edfeee",
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
