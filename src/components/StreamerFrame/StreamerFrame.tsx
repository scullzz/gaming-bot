import {
  extractTwitchChannel,
  extractYouTubeVideoId,
} from "../../functions/getVideoId";

interface StreamerFrameProps {
  url: string;
  width: string | number;
  height: string | number;
}

export const StreamerFrame: React.FC<StreamerFrameProps> = ({
  url,
  width,
  height,
}) => {
  const youTubeVideoId = extractYouTubeVideoId(url);

  if (youTubeVideoId) {
    return (
      <iframe
        className="streamer__broadcast-frame"
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${youTubeVideoId}?amp;controls=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ borderRadius: "7px" }}
      ></iframe>
    );
  } else {
    return (
      <iframe
        src={`${url}`}
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        scrolling="no"
        height={height}
        width={width}
      ></iframe>
    );
  }
};
