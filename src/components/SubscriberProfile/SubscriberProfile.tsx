import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import { SubscriberProfileInfo } from "../SubscriberProfileInfo/SubscriberProfileInfo";
import { SubscriberRafflesParticipant } from "../SubscriberRafflesParticipant/SubscriberRafflesParticipant";
import { SubscriberRafflesStats } from "../SubscriberRafflesStats/SubscriberRafflesStats";
import "./SubscriberProfile.scss";
import { useQueryParams } from "../../functions/useQueryParams";
import {
  useEditNoteAboutSubMutation,
  useGetSubProfileQuery,
  useSendSubMessageMutation,
} from "../../features/api";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import { formatRaffleDate } from "../../functions/formatRaffleDate";
import { GetUserPayMethod } from "../../types/getUserDto";
import { useEffect, useState } from "react";
import { handleError } from "../../functions/handleError";
import { DataPickerModal } from "../DataPickerModal/DataPickerModal";
import { useStickyRef } from "../../functions/useStickyRef";
import { useClassnamedStickyScroll } from "../../functions/useStickyScroll";
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
const createPaymentSection = (
  items: GetUserPayMethod[]
): Record<string, [boolean, string]> => {
  return items.reduce((acc, item) => {
    if (item.data !== null) {
      acc[item.platform] = [false, item.data];
    }
    return acc;
  }, {} as Record<string, [boolean, string]>);
};
export const SubscriberProfile = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const queryParams = useQueryParams();
  const streamerId = queryParams.get("streamerId") || "";
  const {
    data: sub,
    isLoading: subLoading,
    error: subError,
    refetch,
  } = useGetSubProfileQuery({ id, streamerId });
  const { errorText: subErrorText, setErrorText: setSubErrorText } =
    useQueryError(subError);
  const paymentSection = createPaymentSection(sub?.userPayMethods || []);

  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [
    sendMessage,
    { isLoading: sendingMsg, error: sendError, reset: resetSendError },
  ] = useSendSubMessageMutation();
  const onSendMsg = () => {
    if (message != null)
      sendMessage({ message, id, streamerId })
        .unwrap()
        .then(() => setShowModal(false));
  };
  const sendErrorText = handleError(sendError);
  const [
    editNote,
    { isLoading: noteEditing, error: noteError, reset: resetNoteError },
  ] = useEditNoteAboutSubMutation();
  const noteErrorText = handleError(noteError);
  const onApply = () => {
    editNote({ id, streamerId, note })
      .unwrap()
      .then(() => {
        navigate(`/streamer/${streamerId}`);
        refetch();
      });
  };
  useEffect(() => {
    if (sub) setNote(sub?.note);
  }, [sub]);
  useClassnamedStickyScroll(
    "subscriber-profile-raffles-participant",
    "subscriber-profile"
  );
  return (
    <div className="subscriber-profile section">
      {showModal && (
        <DataPickerModal
          compact={false}
          onClose={() => setShowModal(false)}
          value={message}
          placeholderText="Ваше сообщение..."
          btnText="Отправить"
          setValue={setMessage}
          onSubmit={onSendMsg}
        ></DataPickerModal>
      )}

      <Details
        isLoading={subLoading || noteEditing || sendingMsg}
        error={subErrorText || noteErrorText || sendErrorText}
        onClose={() => {
          setSubErrorText(undefined);
          resetNoteError();
          resetSendError();
        }}
      ></Details>
      <SectionHeader
        left={
          <span onClick={() => navigate(`/streamer/${streamerId}`)}>
            Закрыть
          </span>
        }
        center={<span>Профиль</span>}
        right={<span onClick={() => onApply()}>Готово</span>}
      ></SectionHeader>
      <div className="mt" style={{ minHeight: "31px" }}></div>
      <StreamerPreview
        name={sub?.firstName || "Подписчик"}
        isLive={false}
        details={`Подписан с ${formatRaffleDate(
          sub?.subscribeTime || new Date().toISOString()
        )}`}
      ></StreamerPreview>
      <button
        onClick={() => setShowModal(true)}
        className="start-btn"
        style={{ textTransform: "none", marginTop: "20px" }}
      >
        Написать сообщение
      </button>
      <textarea
        placeholder="Заметки о пользователе"
        value={note || undefined}
        onChange={(e) => setNote(e.currentTarget.value)}
      ></textarea>
      <div
        className="details-text details-text_add subscriber-profile__details"
        style={{ marginTop: "8px" }}
      >
        Заметка, которую видит только стример и его модераторы.
      </div>
      <div className="mt" style={{ marginTop: "37px" }}></div>
      <SubscriberProfileInfo
        obj={{
          "Telegram ID": [false, sub?.tgId || "#"],
          "Имя пользователя": [true, sub?.firstName || "#"],
          "Email для связи": [true, sub?.email || "Email не указан"],
        }}
      ></SubscriberProfileInfo>
      <div className="subscriber-profile__header" style={{ marginTop: "20px" }}>
        Платежная информация
      </div>
      <SubscriberProfileInfo
        obj={paymentSection}
        text="Нет адресов оплаты"
      ></SubscriberProfileInfo>
      <div className="subscriber-profile__header" style={{ marginTop: "20px" }}>
        Участник розыгрышей
      </div>
      <SubscriberRafflesParticipant
        id={id || ""}
        streamerId={streamerId}
      ></SubscriberRafflesParticipant>
      <SubscriberRafflesStats {...sub?.subscriberStat}></SubscriberRafflesStats>
    </div>
  );
};
