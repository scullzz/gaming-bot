import cover from "/cover.png";
import "./Avatar.scss";
import { IsLive } from "../IsLive/IsLive";
export interface AvatarProps {
  url?: string;
  isLive?: boolean;
}

export const Avatar = ({ url, isLive }: AvatarProps) => {
  return (
    <div className="avatar">
      <img src={url || cover} alt="" className="avatar__body" />
      {isLive && <IsLive></IsLive>}
    </div>
  );
};
