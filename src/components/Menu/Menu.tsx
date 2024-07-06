import { tg } from "../../App";
import { getInitials } from "../../functions/getInitials";
import { MenuItem } from "../MenuItem/MenuItem";
import "./Menu.scss";
import streamers from "/players.png";
export const Menu = () => {
  const userProfileInitials = getInitials(tg.initDataUnsafe.user);
  return (
    <div className="footer">
      <div className="menu">
        <MenuItem label="Стримеры" icon={streamers}></MenuItem>
        <MenuItem
          label="Профиль"
          isProfile
          initials={userProfileInitials}
        ></MenuItem>
      </div>
      <div className="ad">
        <span className="details-text ad__text">
          Если вы стример и хотите попасть в этот список - обращайтесь
          <span className="details__text ad__link"> @SupportBot</span>
        </span>
      </div>
    </div>
  );
};
