import { MenuItem } from "../MenuItem/MenuItem";
import "./Menu.scss";
import streamers from "/players.png";
export const Menu = () => {
  return (
    <div className="menu">
      <MenuItem label="Стримеры" icon={streamers}></MenuItem>
      <MenuItem label="Профиль" icon="p" isProfile></MenuItem>
    </div>
  );
};
