import { HTMLAttributes } from "react";
import "./UserView.scss";
import cover from "/cover.png";
import { GetSubscriberDto } from "../../types/getSubscriberDto";
export interface IUserViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id">,
    GetSubscriberDto {
  isStreamer?: boolean;
  withLine?: boolean;
}
export const UserView = ({
  isStreamer,
  firstName,
  id,
  subscribeTime,
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
              <span className="label-text">{firstName}</span>
            </div>
            <span className="details-text">{subscribeTime}</span>
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
