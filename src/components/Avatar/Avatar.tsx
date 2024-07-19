import cover from "/cover.png";
import "./Avatar.scss";
import { IsLive } from "../IsLive/IsLive";
import { Initials } from "../../functions/getInitials";
export interface AvatarProps {
  url?: string;
  isLive?: boolean;
  initials?: Initials;
  size?: number;
}

export const Avatar = ({ url, isLive, initials, size = 94 }: AvatarProps) => {
  return (
    <div className="avatar" style={{ width: size, height: size }}>
      {url ? (
        <img
          src={url}
          alt=""
          className="avatar__body"
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className="menu-item__icon"
          style={{
            backgroundColor: initials?.color,
            width: size,
            height: size,
          }}
        >
          <span className="menu-item__text">{initials?.initials}</span>
        </div>
      )}
      {isLive && <IsLive></IsLive>}
    </div>
  );
};
