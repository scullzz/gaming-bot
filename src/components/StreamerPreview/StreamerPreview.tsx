import { getInitialsByNameWithColor } from "../../functions/getInitialsByName";
import { Avatar, AvatarProps } from "../Avatar/Avatar";
import "./StreamerPreview.scss";
interface IStreamerPreviewProps extends AvatarProps {
  details?: string;
  name: string;
  isLive: boolean;
  img?: string | null;
}

export const StreamerPreview = ({
  name,
  details,
  isLive,
  img,
  ...rest
}: IStreamerPreviewProps) => {
  return (
    <div className="streamer__info">
      <Avatar
        url={img}
        {...rest}
        isLive={isLive}
        initials={getInitialsByNameWithColor(name)}
      ></Avatar>
      <span className="header-text">{name}</span>
      {details && <span className="details-text">{details}</span>}
    </div>
  );
};
