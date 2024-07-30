import { useGetStreamerQuery } from "../../features/api";
import { getNameId } from "../../functions/getValueFromJwt";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { StreamerVideo } from "../StreamerVideo/StreamerVideo";
import "./StreamerVideo.scss";
export const StreamerVideos = ({ id }: IStreamerDetailsViewer) => {
  const tgId = id;
  const userId = getNameId();
  const {
    data: streamer,
    isLoading,
    error: streamerError,
  } = useGetStreamerQuery({ tgId, userId });
  const { errorText, setErrorText } = useQueryError(streamerError);
  const liveSocials = streamer?.socials.filter(
    (s) => s.parameter.isLive && s.parameter.link != null
  );
  return (
    <div className="streamer__videos">
      {
        <Details
          isLoading={!streamer && isLoading}
          error={errorText}
          onClose={() => setErrorText(undefined)}
        ></Details>
      }
      {liveSocials?.length == 0 ? null : (
        <span className="header-text">Стрим онлайн</span>
      )}
      {liveSocials
        .map((s) => s.parameter)
        .map((s) => (
          <StreamerVideo url={s.link!} key={s.link}></StreamerVideo>
        ))}
    </div>
  );
};
