import { SocialItem } from "../SocialItem/SocialItem";
import "./StreamerHeader.scss";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import { useGetStreamerQuery } from "../../features/api";
import { tg } from "../../App";
import { Details } from "../Details/Details";
import { useQueryError } from "../../functions/useQueryError";
import { getSocials } from "../../functions/getSocials";
import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";

export const StreamerHeader = ({ id }: IStreamerDetailsViewer) => {
  const tgId = tg.initDataUnsafe.user?.id.toString() || "";
  const {
    data: streamer,
    isLoading,
    error: streamerError,
  } = useGetStreamerQuery(tgId);
  const { errorText, setErrorText } = useQueryError(streamerError);
  const socials = getSocials(streamer?.socials || [], true);
  return (
    <div className="streamer__header">
      {
        <Details
          isLoading={!streamer && isLoading}
          error={errorText}
          onClose={() => setErrorText(undefined)}
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
