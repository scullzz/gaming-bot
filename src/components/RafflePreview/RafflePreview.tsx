import { useLocation, useNavigate } from "react-router-dom";
import { Prize } from "../Prize/Prize";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import "./RafflePreview.scss";

export const RafflePreview = () => {
  const location = useLocation();
  const { prize, streamerId } = location.state;
  const navigate = useNavigate();
  return (
    <div className="section raffle-preview">
      <SectionHeader
        left={
          <span
            onClick={() =>
              navigate("/create-raffle", { state: { streamerId } })
            }
          >
            Закрыть
          </span>
        }
      ></SectionHeader>
      <div className="mt" style={{ minHeight: "31px" }}></div>
      <div className="raffle-preview__header">Предпросмотр розыгрыша</div>
      <Prize {...prize}></Prize>
    </div>
  );
};
