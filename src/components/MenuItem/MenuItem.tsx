import { HTMLAttributes } from "react";
import { Initials } from "../../functions/getInitials";
import "./MenuItem.scss";
import { Avatar } from "../Avatar/Avatar";
interface IMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string;
  label: string;
  isProfile?: boolean;
  initials?: Initials;
}
export const MenuItem = ({
  icon,
  label,
  isProfile = false,
  initials,
  ...rest
}: IMenuItemProps) => {
  return (
    <div className="menu-item" {...rest}>
      {icon !== undefined ? (
        <img
          src={icon}
          className="menu-item__icon"
          style={{ borderRadius: isProfile ? "100%" : "0px" }}
        />
      ) : (
        <Avatar initials={initials} url={icon} size={27}></Avatar>
      )}
      <span className="menu-text">{label}</span>
    </div>
  );
};
