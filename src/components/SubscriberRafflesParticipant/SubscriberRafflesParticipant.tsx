import pointer from "/pointer-right.svg";
import "./SubscriberRafflesParticipant.scss";
import { useScrollPagination } from "../../functions/useScrollPagination";
import {
  participantAdapter,
  useGetParticipantsQuery,
} from "../../features/api";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import { NotAvailable } from "../NotAvailable.tsx/NotAvailable";
import { GetSubParticipant } from "../../types/getSubParticipant";

import { formatDateShortly } from "../../functions/formatDateShortly";
import { useNavigate } from "react-router-dom";
interface ISubscriberRafflesParticipantProps {
  id: string;
  streamerId: string;
}
export const SubscriberRafflesParticipant = ({
  id,
  streamerId,
}: ISubscriberRafflesParticipantProps) => {
  const { handleScroll, page, pageSize } = useScrollPagination();
  const { participants, isLoading, error } = useGetParticipantsQuery(
    { page, pageSize, id, streamerId },
    {
      refetchOnMountOrArgChange: true,
      selectFromResult: ({ data, ...other }) => ({
        participants: participantAdapter
          .getSelectors()
          .selectAll(data ?? participantAdapter.getInitialState()),
        ...other,
      }),
    }
  );
  const navigate = useNavigate();
  const { errorText, setErrorText } = useQueryError(error);
  return (
    <div
      className="subscriber-profile-raffles-participant"
      onScroll={
        isLoading || participants.length % pageSize !== 0
          ? () => {}
          : handleScroll
      }
    >
      <Details
        isLoading={isLoading}
        error={errorText}
        onClose={() => setErrorText(undefined)}
      ></Details>
      <NotAvailable
        available={participants.length !== 0}
        text="Подписчик пока не участвовал в Ваших розыгрышах"
      ></NotAvailable>
      {participants.map((t) => (
        <SubscriberRafflesParticipantItem
          onClick={() => navigate(`/raffle/${t.id}`, { state: { streamerId } })}
          {...t}
        ></SubscriberRafflesParticipantItem>
      ))}
    </div>
  );
};

const Abused = "Abused";
const Winner = "Winner";
interface ISubscriberRafflesParticipantItemProps extends GetSubParticipant {
  onClick: () => void;
}
const SubscriberRafflesParticipantItem = ({
  id,
  endTime,
  onClick,
  status,
}: ISubscriberRafflesParticipantItemProps) => {
  return (
    <li onClick={onClick}>
      <div className="header">
        <span className="label">Розыгрыш #{id}</span>
        <div className="extensions">
          <div
            className={`status ${
              status === Abused
                ? ""
                : status === Winner
                ? "status-winner"
                : "status-participant"
            }`}
          >
            {status === Winner ? "Выиграл" : "Абузер"}
          </div>
          <div className="date">{formatDateShortly(endTime)}</div>
          <img src={pointer} className="icon" />
        </div>
      </div>
      <div className="line"></div>
    </li>
  );
};
