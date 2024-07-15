import { useGetStreamerQuery } from "../../features/api";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { StreamerVideo } from "../StreamerVideo/StreamerVideo";
import "./StreamerVideo.scss";
export const StreamerVideos = ({ id }: IStreamerDetailsViewer) => {
  const tgId = id;
  const {
    data: streamer,
    isLoading,
    error: streamerError,
  } = useGetStreamerQuery(tgId);
  const { errorText, setErrorText } = useQueryError(streamerError);
  return (
    <div className="streamer__videos">
      {
        <Details
          isLoading={!streamer && isLoading}
          error={errorText}
          onClose={() => setErrorText(undefined)}
        ></Details>
      }
      {streamer?.socials
        .filter((s) => s.parameter.isLive && s.parameter.link != null)
        .map((s) => s.parameter)
        .map((s) => (
          <StreamerVideo url={s.link!}></StreamerVideo>
        ))}
    </div>
  );
};
