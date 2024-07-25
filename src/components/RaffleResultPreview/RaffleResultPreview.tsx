import {
  useGetAdminsQuery,
  useGetRaffleReportMutation,
} from "../../features/api";
import { formatRaffleDate } from "../../functions/formatRaffleDate";
import { getNameId } from "../../functions/getValueFromJwt";
import { handleError } from "../../functions/handleError";
import { useCheckStreamerYourself } from "../../functions/useCheckStreamerYourself";
import { GetRaffleDto } from "../../types/getRaffleDto";
import { Details } from "../Details/Details";
import "./RaffleResultPreview.scss";
import prize from "/prize.png";

interface IRaffleResultPreviewProps extends Partial<GetRaffleDto> {
  streamerId: string;
}

export const RaffleResultPreview = ({
  amountOfWinners,
  amountOfParticipants,
  id,
  streamerId,
  endTime,
}: IRaffleResultPreviewProps) => {
  const { data: admins } = useGetAdminsQuery(streamerId);
  const isStreamerYourself = useCheckStreamerYourself(getNameId(), admins);
  const [getReport, { isLoading, error, reset }] = useGetRaffleReportMutation();
  const errorText = handleError(error);
  return (
    <div className="raffle-result__preview">
      <Details
        isLoading={isLoading}
        error={errorText}
        onClose={() => reset()}
      ></Details>
      <div className="raffle-result__preview-info">
        <div className="prize__wrapper">
          <div className="prize__winner-count">X{amountOfWinners || 0}</div>
          <img src={prize} alt="Изображение приза" className="prize__img" />
        </div>
        <div className="raffle-result__details">
          <div className="header">Розыгрыш #{id || 0}</div>
          <div className="details">
            Дата завершения:
            {formatRaffleDate(endTime || new Date().toISOString())}
          </div>
          <div className="label">{amountOfParticipants || 0} участников</div>
        </div>
      </div>
      {isStreamerYourself && (
        <button
          className="raffle-result__button"
          onClick={() => getReport(id || 0)}
        >
          Создать результаты
        </button>
      )}
    </div>
  );
};
