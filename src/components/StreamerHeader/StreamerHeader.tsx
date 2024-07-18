import { SocialItem } from "../SocialItem/SocialItem";
import "./StreamerHeader.scss";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import {
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
    unsubFromStreamer({ streamerId: streamer?.tgId || "", userId }).then(() =>
      navigate("/streamers")
    );
  };
  const unsubErrorText = handleError(unsubError);
  const { errorText, setErrorText } = useQueryError(streamerError);
  const socials = getSocials(
    streamer?.socials || [],
    () => {},
    streamer?.isSubscribed ? () => onUnsub() : undefined
  );
  return (
    <div className="streamer__header">
      {
        <Details
          isLoading={(!streamer && isLoading) || unsubingFromStreamer}
          error={errorText || unsubErrorText}
          onClose={() => {
            setErrorText(undefined);
            clearUnsubError();
          }}
        ></Details>
      }
      <StreamerPreview
        name={streamer?.name || "Стример"}
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
