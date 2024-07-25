import { HTMLAttributes } from "react";
import "./UserView.scss";

import { Avatar } from "../Avatar/Avatar";

import { getInitialsByNameWithColor } from "../../functions/getInitialsByName";

export interface IUserViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  isStreamer?: boolean;
  withLine?: boolean;
  isSubscribed?: boolean;
  withCircle?: boolean;
  name: string;
  onButtonClick?: () => void;
  id: string | number;
  detailsText?: string;
  onClick?: () => void;
  img?: string | null;
}
export const UserView = ({
  isStreamer,
  name,
  id,
  withCircle,
  onButtonClick,
  detailsText,
  onClick,
  isSubscribed,
  withLine = true,
  className,
  img,
  ...rest
}: IUserViewProps) => {
  return (
    <div
      className={`streamer-view ${className || ""}`}
      {...rest}
      key={id}
      onClick={onClick}
    >
      <Avatar
        url={img}
        initials={getInitialsByNameWithColor(name)}
        size={isStreamer ? 60 : 40}
      ></Avatar>

      <div className="streamer-view__info">
        <div className="streamer-view__info-header">
          <div className="streamer-view__info-header-description">
            <div className="streamer-view__name">
              {withCircle && <div className="circle"></div>}
              <span className="label-text">{name}</span>
            </div>
            {detailsText && <span className="details-text">{detailsText}</span>}
          </div>
          {isStreamer && (
            <div className="btn" onClick={onButtonClick}>
              {isSubscribed ? "Открыть" : "Подписаться"}
            </div>
          )}
        </div>
        {withLine && (
          <div className={`line ${!isStreamer && "line-user"}`}></div>
        )}
      </div>
    </div>
  );
};
