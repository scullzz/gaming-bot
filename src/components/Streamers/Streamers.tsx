import { useRef } from "react";
import { useStickyScroll } from "../../functions/useStickyScroll";
import { StreamerView } from "../StreamerView/StreamerView";
import { WithMenu } from "../withMenu/withMenu";
import ".//Streamers.scss";
const StreamersView = () => {
  const streamers = [1, 2, 3, 4, 5, 6, 434, 43, 43, 4343, 434, 343];
  const streamersRef = useRef<HTMLDivElement | null>(null);
  useStickyScroll(streamersRef);
  return (
    <div className="section streamers" ref={streamersRef}>
      <p className="header-text">Стримеры</p>

      {streamers.map((s) => (
        <StreamerView></StreamerView>
      ))}
    </div>
  );
};

export const Streamers = () => {
  return (
    <WithMenu>
      <StreamersView></StreamersView>
    </WithMenu>
  );
};
