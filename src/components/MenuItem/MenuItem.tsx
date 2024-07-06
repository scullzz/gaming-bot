import { Initials } from "../../functions/getInitials";
import "./MenuItem.scss";
interface IMenuItemProps {
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
}: IMenuItemProps) => {
  return (
    <div className="menu-item">
      {icon !== undefined ? (
        <img
          src={icon}
          className="menu-item__icon"
          style={{ borderRadius: isProfile ? "100%" : "0px" }}
        />
      ) : (
        <div
          className="menu-item__icon"
          style={{ backgroundColor: initials?.color }}
        >
          <span className="menu-item__text">{initials?.initials}</span>
        </div>
      )}
      <span className="menu-text">{label}</span>
    </div>
  );
};
