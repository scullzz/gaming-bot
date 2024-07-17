import { RaffleResultPreview } from "../RaffleResultPreview/RaffleResultPreview";
import { RaffleResultWinnerGenerator } from "../RaffleResultWinnerGenerator/RaffleResultWinnerGenerator";
import { RaffleResultWinners } from "../RaffleResultWinners/RaffleResultWinners";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import "./RaffleResult.scss";

export const RaffleResult = () => {
  return (
    <div className="section raffle-result">
      <SectionHeader
        center="Результаты розыгрыша"
        left="Закрыть"
      ></SectionHeader>
      <div className="mt" style={{ minHeight: "21px" }}></div>
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
      <div className="raffle-result__subs-header">
        <div className="raffle-result__header" style={{ marginBottom: 0 }}>
          Победили:
        </div>
        <div className="raffle-result__time">12 мая 2024 в 23:59</div>
      </div>
      <RaffleResultWinners></RaffleResultWinners>
    </div>
  );
};
