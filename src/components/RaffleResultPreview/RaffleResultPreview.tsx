import { formatRaffleDate } from "../../functions/formatRaffleDate";
import { GetRaffleDto } from "../../types/getRaffleDto";
import "./RaffleResultPreview.scss";
import prize from "/prize.png";

interface IRaffleResultPreviewProps extends Partial<GetRaffleDto> {}

export const RaffleResultPreview = ({
  amountOfWinners,
  amountOfParticipants,
  id,
  endTime,
}: IRaffleResultPreviewProps) => {
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
      <button className="raffle-result__button">Скачать результаты</button>
    </div>
  );
};
