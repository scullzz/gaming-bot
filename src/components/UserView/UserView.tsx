import "./UserView.scss";
import cover from "/cover.png";
export interface IUserViewProps {
  img?: string;
  name: string;
  details: string;
  isStreamer?: boolean;
}
export const UserView = ({
  isStreamer,
  img,
  name,
  details,
}: IUserViewProps) => {
  return (
    <div className="streamer-view">
      <img
        src={img || cover}
        alt="Изображение"
        className={`streamer-view__avatar ${
          !isStreamer && "streamer-view__avatar-user"
        }`}
      />
      <div className="streamer-view__info">
        <div className="streamer-view__info-header">
          <div className="streamer-view__info-header-description">
            <div className="streamer-view__name">
              <span className="label-text">{name}</span>
            </div>
            <span className="details-text">{details}</span>
          </div>
          {isStreamer && <div className="btn">Открыть</div>}
        </div>
        <div className={`line ${!isStreamer && "line-user"}`}></div>
      </div>
    </div>
  );
};
