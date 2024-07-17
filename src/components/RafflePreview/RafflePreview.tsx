import { GetRaffleDto } from "../../types/getRaffleDto";
import { Prize } from "../Prize/Prize";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import "./RafflePreview.scss";
const template: GetRaffleDto = {
  amountOfParticipants: 10,
  description: "Raffle preview",
  amountOfWinners: 5,
  endTime: new Date().toLocaleDateString(),
  id: 5,
  raffleConditions: [],
};

export const RafflePreview = () => {
  return (
    <div className="section raffle-preview">
      <SectionHeader left="Закрыть"></SectionHeader>
      <div className="mt" style={{ minHeight: "31px" }}></div>
      <div className="raffle-preview__header">Предпросмотр розыгрыша</div>
      <Prize {...template}></Prize>
    </div>
  );
};
