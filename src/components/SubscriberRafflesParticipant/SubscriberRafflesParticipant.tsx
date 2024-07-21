import pointer from "/pointer-right.png";
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
import { formatRaffleDate } from "../../functions/formatRaffleDate";
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
        text="Подписчик пока не участвлвал в Ваших розыгрышах"
      ></NotAvailable>
      {participants.map((t) => (
        <SubscriberRafflesParticipantItem
          {...t}
        ></SubscriberRafflesParticipantItem>
      ))}
    </div>
  );
};

const Abused = "Abused";
const Winner = "Winner";
interface ISubscriberRafflesParticipantItemProps extends GetSubParticipant {}
const SubscriberRafflesParticipantItem = ({
  id,
  endTime,
  status,
}: ISubscriberRafflesParticipantItemProps) => {
  return (
    <li>
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
          <div className="date">{formatRaffleDate(endTime)}</div>
          <img src={pointer} className="icon" />
        </div>
      </div>
      <div className="line"></div>
    </li>
  );
};
