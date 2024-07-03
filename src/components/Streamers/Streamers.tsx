import { StreamerView } from "../StreamerView/StreamerView";

export const Streamers = () => {
  const streamers = [1, 2, 3, 4, 5, 6];
  return (
    <div className="section">
      {streamers.map((s) => (
        <StreamerView></StreamerView>
      ))}
    </div>
  );
};
