import { StreamerHeader } from "../StreamerHeader/StreamerHeader";
import { StreamerManagement } from "../StreamerManagement/StreamerManagement";
import { StreamerVideo } from "../StreamerVideo/StreamerVideo";
import "./StreamerPage.scss";
import { StreamerPrizes } from "../StreamerPrizes/StreamerPrizes";
import { StreamerSubscribers } from "../StreamerSubscribers/StreamerSubscribers";
export const StreamerPage = () => {
  return (
    <div className="section streamer">
      <StreamerHeader></StreamerHeader>
      <StreamerManagement></StreamerManagement>
      <StreamerVideo></StreamerVideo>
      <StreamerPrizes></StreamerPrizes>
      <StreamerSubscribers></StreamerSubscribers>
    </div>
  );
};
