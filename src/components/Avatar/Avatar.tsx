import cover from "/cover.png";
import "./Avatar.scss";
import { IsLive } from "../IsLive/IsLive";
import { Initials } from "../../functions/getInitials";
export interface AvatarProps {
  url?: string;
  isLive?: boolean;
  initials?: Initials;
}

export const Avatar = ({ url, isLive, initials }: AvatarProps) => {
  return (
    <div className="avatar">
      {url ? (
        <img src={url} alt="" className="avatar__body" />
      ) : (
        <div
          className="menu-item__icon"
          style={{ backgroundColor: initials?.color }}
        >
          <span className="menu-item__text">{initials?.initials}</span>
        </div>
      )}
      {isLive && <IsLive></IsLive>}
    </div>
  );
};
