import { StreamerHeader } from "../StreamerHeader/StreamerHeader";
import { StreamerManagement } from "../StreamerManagement/StreamerManagement";
import { StreamerVideo } from "../StreamerVideo/StreamerVideo";
import "./StreamerPage.scss";
export const StreamerPage = () => {
  return (
    <div className="section streamer">
      <StreamerHeader></StreamerHeader>
      <StreamerManagement></StreamerManagement>
      <StreamerVideo></StreamerVideo>
    </div>
  );
};
