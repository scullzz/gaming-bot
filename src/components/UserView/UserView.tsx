import { HTMLAttributes } from "react";
import "./UserView.scss";
import cover from "/cover.png";

export interface IUserViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  isStreamer?: boolean;
  withLine?: boolean;
  name: string;
  id: string | number;
  detailsText?: string;
}
export const UserView = ({
  isStreamer,
  name,
  id,
  detailsText,
  withLine = true,
  className,
  ...rest
}: IUserViewProps) => {
  return (
    <div className={`streamer-view ${className || ""}`} {...rest} key={id}>
      <img
        src={cover}
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
            {detailsText && <span className="details-text">{detailsText}</span>}
          </div>
          {isStreamer && <div className="btn">Открыть</div>}
        </div>
        {withLine && (
          <div className={`line ${!isStreamer && "line-user"}`}></div>
        )}
      </div>
    </div>
  );
};
