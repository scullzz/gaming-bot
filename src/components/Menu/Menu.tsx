import { useLocation, useNavigate } from "react-router-dom";
import { tg } from "../../App";
import { getInitials } from "../../functions/getInitials";
import { MenuItem } from "../MenuItem/MenuItem";
import "./Menu.scss";
import streamers from "/players.svg";
import streamersOn from "/players-on.svg";
import { getImage, getNameId, getRole } from "../../functions/getValueFromJwt";
import { useIsStreamersRoute } from "../../functions/useIsStreamerRoute";
import { useDisableBounces } from "../../functions/useDisableScroll";
const UserRole = "User";
export const Menu = () => {
  const userProfileInitials = getInitials(tg.initDataUnsafe.user);
  const navigate = useNavigate();
  const location = useLocation();
  const isStreamersPage = useIsStreamersRoute();
  const onProfileClick = () => {
    const role = getRole();

    if (role == UserRole) navigate(`/user-profile/${getNameId()}`);
    else navigate(`/streamer/${getNameId()}`);
  };
  useDisableBounces("footer");
  return (
    <div className="footer">
      {isStreamersPage && (
        <div className="ad">
          <span className="details-text ad__text">
            Если вы стример и хотите попасть в этот список - обращайтесь
            <span className="details__text ad__link"> @SupportBot</span>
          </span>
        </div>
      )}
      <div
        className="menu"
        style={{
          backgroundColor: isStreamersPage
            ? "var(--menu-color)"
            : "var(--main-color)",
        }}
      >
        <MenuItem
          active={location.pathname == "/streamers"}
          label="Стримеры"
          icon={streamers}
          onIcon={streamersOn}
          onClick={() => navigate("/streamers")}
        ></MenuItem>
        <MenuItem
          active={location.pathname !== "/streamers"}
          label="Профиль"
          isProfile
          onIcon={getImage()}
          icon={getImage()}
          onClick={onProfileClick}
          initials={userProfileInitials}
        ></MenuItem>
      </div>
    </div>
  );
};
