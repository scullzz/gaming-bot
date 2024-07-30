import { useLayoutEffect, useState } from "react";
import { IsLive } from "../IsLive/IsLive";
import "./StreamerVideo.scss";
import { StreamerFrame } from "../StreamerFrame/StreamerFrame";
interface IStreamerVideoProps {
  url: string;
}
export const StreamerVideo = ({ url }: IStreamerVideoProps) => {
  const [width, setWidth] = useState<number>();
  useLayoutEffect(() => {
    const element = document.querySelector(".section");
    if (element != null) {
      const computedStyle = getComputedStyle(element);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);
      const width = element.clientWidth - paddingLeft - paddingRight;
      setWidth(width);
    }
  });
  return (
    <div className="streamer__broadcast">
      <div className="streamer__broadcast-wrapper">
        <IsLive></IsLive>
        <StreamerFrame
          url={url}
          width={width || 100}
          height={400}
        ></StreamerFrame>
      </div>
    </div>
  );
};
