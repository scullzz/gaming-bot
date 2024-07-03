import "./StreamerView.scss";
import cover from "/cover.png";
interface IStreamerViewProps {}
export const StreamerView = () => {
  return (
    <div className="streamer-view">
      <img src={cover} alt="" className="streamer-view__avatar" />
      <div className="streamer-view__info">
        <div className="streamer-view__info-header">
          <div className="streamer-view__info-header-description">
            <div className="streamer-view__name">
              <span className="label-text">Mellstroy</span>
            </div>
            <span className="details-text">777 подписчиков</span>
          </div>
          <div className="btn">Открыть</div>
        </div>
        <div className="line"></div>
      </div>
    </div>
  );
};
