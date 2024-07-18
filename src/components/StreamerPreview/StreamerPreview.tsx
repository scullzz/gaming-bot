import { Avatar, AvatarProps } from "../Avatar/Avatar";
import "./StreamerPreview.scss";
interface IStreamerPreviewProps extends AvatarProps {
  details?: string;
  name: string;
  isLive: boolean;
}

export const StreamerPreview = ({
  name,
  details,
  isLive,
  ...rest
}: IStreamerPreviewProps) => {
  return (
    <div className="streamer__info">
      <Avatar {...rest} isLive={isLive}></Avatar>
      <span className="header-text">{name}</span>
      {details && <span className="details-text">{details}</span>}
    </div>
  );
};
