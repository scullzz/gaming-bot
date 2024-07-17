import { SectionHeader } from "../SectionHeader/SectionHeader";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import question from "/question.png";
import "./UserProfile.scss";
export const UserProfile = () => {
  return (
    <div className="user-profile section">
      <SectionHeader
        left="Закрыть"
        center="Профиль"
        right="Готово"
      ></SectionHeader>
      <div className="mt" style={{ marginTop: "31px" }}></div>
      <StreamerPreview name="Peter Parker" isLive={false}></StreamerPreview>
      <div className="user-profile__header-label" style={{ marginTop: "24px" }}>
        Платежная информация
      </div>
      <form action="" className="user-profile__form">
        <div className="form__cell">
          <div className="info">
            <input type="text" placeholder="Tether TRC20" />
            <img src={question} alt="" className="icon" />
          </div>
          <div className="line"></div>
        </div>
        <div className="form__cell">
          <div className="info">
            <input type="text" placeholder="Tether ERC20" />
            <img src={question} alt="" className="icon" />
          </div>
          <div className="line"></div>
        </div>
        <div className="form__cell">
          <div className="info">
            <input type="text" placeholder="Piastrix" />
            <img src={question} alt="" className="icon" />
          </div>
        </div>
      </form>
      <span
        className="details-text details-text_add user-profile__details"
        style={{ marginTop: "8px" }}
      >
        На эти реквизиты будет отправлен приз, если вы выиграете в
        соответствующем розыгрыше. Эта информация будет доступна стримеру, на
        которого вы подписаны.
      </span>
    </div>
  );
};
