import { Prize } from "../Prize/Prize";
import "./StreamerPrizes.scss";

export const StreamerPrizes = () => {
  return (
    <div className="streamer__prizes">
      <div className="streamer__prizes-top">
        <span className="streamer__prizes-top-header-active">
          Активные розыгрыши
        </span>
        <span className="streamer__prizes-top-header">Завершенные</span>
      </div>
      <div className="streamer__prizes-body">
        {[1, 2, 3, 4].map((t) => (
          <Prize></Prize>
        ))}
      </div>
    </div>
  );
};
