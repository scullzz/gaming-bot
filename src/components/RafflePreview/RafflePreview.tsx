import { useLocation, useNavigate } from "react-router-dom";
import { Prize } from "../Prize/Prize";
import "./RafflePreview.scss";

export const RafflePreview = () => {
  const location = useLocation();
  const { prize } = location.state;
  return (
    <div className="section raffle-preview">
      <div className="mt" style={{ minHeight: "31px" }}></div>
      <div className="raffle-preview__header">Предпросмотр розыгрыша</div>
      <Prize {...prize}></Prize>
    </div>
  );
};
