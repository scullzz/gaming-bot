import "./MenuItem.scss";
interface IMenuItemProps {
  icon: string;
  label: string;
  isProfile?: boolean;
}
export const MenuItem = ({
  icon,
  label,
  isProfile = false,
}: IMenuItemProps) => {
  return (
    <div className="menu-item">
      <img
        src={icon}
        className="menu-item__icon"
        style={{ borderRadius: isProfile ? "100%" : "0px" }}
      />
      <span className="menu-text">{label}</span>
    </div>
  );
};
