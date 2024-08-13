import { HTMLAttributes } from "react";
import { Initials } from "../../functions/getInitials";
import "./MenuItem.scss";
import { Avatar } from "../Avatar/Avatar";
interface IMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string;
  label: string;
  onIcon?: string;
  isProfile?: boolean;
  active: boolean;
  initials?: Initials;
}
export const MenuItem = ({
  icon,
  label,
  active,
  onIcon,
  isProfile = false,
  initials,
  ...rest
}: IMenuItemProps) => {
  return (
    <div className="menu-item" {...rest}>
      {icon !== undefined ? (
        <img
          src={active ? onIcon : icon}
          className="menu-item__icon"
          style={{ borderRadius: isProfile ? "100%" : "0px" }}
        />
      ) : (
        <Avatar initials={initials} url={onIcon} size={24}></Avatar>
      )}
      <span
        className={`menu-item__label ${
          active ? "menu-item__label_active" : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
};
