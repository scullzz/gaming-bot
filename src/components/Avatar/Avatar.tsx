import cover from "/cover.svg";
import "./Avatar.scss";
import { IsLive } from "../IsLive/IsLive";
import { Initials } from "../../functions/getInitials";
import { useCheckImageCorrect } from "../../functions/useCheckImageCorrect";
export interface AvatarProps {
  url?: string;
  isLive?: boolean;
  initials?: Initials;
  size?: number;
}

export const Avatar = ({ url, isLive, initials, size = 94 }: AvatarProps) => {
  const correct = useCheckImageCorrect(url);
  return (
    <div className="avatar" style={{ width: size, height: size }}>
      {correct ? (
        <img
          src={url}
          alt="фото профиля"
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
