import { SectionHeader } from "../SectionHeader/SectionHeader";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import { SubscriberProfileInfo } from "../SubscriberProfileInfo/SubscriberProfileInfo";
import { SubscriberRafflesParticipant } from "../SubscriberRafflesParticipant/SubscriberRafflesParticipant";
import { SubscriberRafflesStats } from "../SubscriberRafflesStats/SubscriberRafflesStats";
import "./SubscriberProfile.scss";
interface UserInfoProps {
  TelegramId: string;
  username: string;
  email?: string | null;
}
interface UserPaymentInfoProps {
  TetherTRC20: string | null;
  TetherERC20: string | null;
  Piastrix: string | null;
}
export const SubscriberProfile = () => {
  return (
    <div className="subscriber-profile section">
      <SectionHeader
        left="Отмена"
        center="Профиль"
        right="Готово"
      ></SectionHeader>
      <div className="mt" style={{ minHeight: "31px" }}></div>
      <StreamerPreview
        name="Peter Parker"
        isLive={false}
        details="Подписан с 2000-ых"
      ></StreamerPreview>
      <button
        className="start-btn"
        style={{ textTransform: "none", marginTop: "20px" }}
      >
        Написать сообщение
      </button>
      <textarea name="" id="" placeholder="Заметки о пользователе"></textarea>
      <div
        className="details-text details-text_add subscriber-profile__details"
        style={{ marginTop: "8px" }}
      >
        Заметка, которую видит только стример и его модераторы.
      </div>
      <div className="mt" style={{ marginTop: "37px" }}></div>
      <SubscriberProfileInfo
        obj={{ TelegramId: [false, "1"], username: [true, "#f"] }}
      ></SubscriberProfileInfo>
      <div className="subscriber-profile__header" style={{ marginTop: "20px" }}>
        Платежная информация
      </div>
      <SubscriberProfileInfo
        obj={{ TetherTRC20: [false, "423432432"] }}
      ></SubscriberProfileInfo>
      <div className="subscriber-profile__header" style={{ marginTop: "20px" }}>
        Участник розыгрышей
      </div>
      <SubscriberRafflesParticipant></SubscriberRafflesParticipant>
      <SubscriberRafflesStats></SubscriberRafflesStats>
    </div>
  );
};
