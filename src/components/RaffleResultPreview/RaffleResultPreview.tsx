import { useGetAdminsQuery } from "../../features/api";
import { formatRaffleDate } from "../../functions/formatRaffleDate";
import { getNameId } from "../../functions/getValueFromJwt";
import { useCheckStreamerYourself } from "../../functions/useCheckStreamerYourself";
import { GetRaffleDto } from "../../types/getRaffleDto";
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
  return (
    <div className="raffle-result__preview">
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
        <button className="raffle-result__button">Скачать результаты</button>
      )}
    </div>
  );
};
