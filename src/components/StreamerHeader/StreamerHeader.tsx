import { SocialItem } from "../SocialItem/SocialItem";
import "./StreamerHeader.scss";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import {
  useGetAdminsQuery,
  useGetStreamerQuery,
  useUnSubFromStreamerMutation,
} from "../../features/api";
import { Details } from "../Details/Details";
import { useQueryError } from "../../functions/useQueryError";
import { getSocials } from "../../functions/getSocials";
import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { getNameId } from "../../functions/getValueFromJwt";
import { handleError } from "../../functions/handleError";
import { useNavigate } from "react-router-dom";
import { useCheckStreamerYourself } from "../../functions/useCheckStreamerYourself";
import { useState } from "react";
import { SocialsModal } from "../SocialsModal/SocialsModal";

export const StreamerHeader = ({ id }: IStreamerDetailsViewer) => {
  const tgId = id;
  const userId = getNameId();
  const navigate = useNavigate();
  const {
    data: streamer,
    isLoading,
    error: streamerError,
  } = useGetStreamerQuery({ tgId, userId });
  const [
    unsubFromStreamer,
    {
      isLoading: unsubingFromStreamer,
      error: unsubError,
      reset: clearUnsubError,
    },
  ] = useUnSubFromStreamerMutation();
  const onUnsub = () => {
    unsubFromStreamer({ streamerId: streamer?.tgId || "", userId }).unwrap();
  };
  const unsubErrorText = handleError(unsubError);
  const { errorText, setErrorText } = useQueryError(streamerError);
  const [showModal, setShowModal] = useState(false);
  const socials = getSocials(
    streamer?.socials || [],
    () => setShowModal(true),
    streamer?.isSubscribed ? () => onUnsub() : undefined
  );
  const { data: admins } = useGetAdminsQuery(id);
  const isStreamerYourself = useCheckStreamerYourself(tgId, admins);
  return (
    <div className="streamer__header">
      {isStreamerYourself && (
        <button
          className="streamer__edit-btn"
          onClick={() => navigate(`/streamer-edit/${id}`)}
        >
          Изменить
        </button>
      )}
      {showModal && (
        <SocialsModal
          socials={streamer?.socials}
          onClose={() => setShowModal(false)}
        ></SocialsModal>
      )}
      <Details
        isLoading={(!streamer && isLoading) || unsubingFromStreamer}
        error={errorText || unsubErrorText}
        onClose={() => {
          setErrorText(undefined);
          clearUnsubError();
        }}
      ></Details>

      <StreamerPreview
        name={streamer?.name || "Стример"}
        url={streamer?.imageUrl}
        details={`${streamer?.amountOfSubscribers || 0} подписчиков`}
        isLive={streamer?.isLive || false}
      ></StreamerPreview>
      <div className="streamer__socials">
        {socials.map((item) => (
          <SocialItem {...item} key={item.url}></SocialItem>
        ))}
      </div>
    </div>
  );
};
