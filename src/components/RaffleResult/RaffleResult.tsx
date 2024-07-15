import { RaffleResultPreview } from "../RaffleResultPreview/RaffleResultPreview";
import { RaffleResultWinnerGenerator } from "../RaffleResultWinnerGenerator/RaffleResultWinnerGenerator";
import "./RaffleResult.scss";

export const RaffleResult = () => {
  return (
    <div className="section raffle-result">
      <div className="raffle-result__header">Результаты розыгрыша</div>
      <RaffleResultPreview></RaffleResultPreview>
      <div
        className="raffle-result__header"
        style={{
          width: "100%",
          textAlign: "left",
          marginTop: "30px",
          marginBottom: "15px",
        }}
      >
        Сгенерировать новых победителей
      </div>
      <RaffleResultWinnerGenerator></RaffleResultWinnerGenerator>
    </div>
  );
};
