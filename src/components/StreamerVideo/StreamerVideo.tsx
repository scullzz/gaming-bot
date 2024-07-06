import { useLayoutEffect, useState } from "react";
import { IsLive } from "../IsLive/IsLive";
import "./StreamerVideo.scss";
export const StreamerVideo = () => {
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
      <span className="header-text">Стрим онлайн</span>
      <div className="streamer__broadcast-wrapper">
        <IsLive></IsLive>
        <iframe
          className="streamer__broadcast-frame"
          width={width}
          height="315"
          src="https://www.youtube.com/embed/_uMuuHk_KkQ?si=Qgw6THqfbXjSQCxt&amp;controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ borderRadius: "7px" }}
        ></iframe>
      </div>
    </div>
  );
};
