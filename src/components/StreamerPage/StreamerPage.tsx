import { StreamerHeader } from "../StreamerHeader/StreamerHeader";
import { StreamerManagement } from "../StreamerManagement/StreamerManagement";
import "./StreamerPage.scss";
import { StreamerPrizes } from "../StreamerPrizes/StreamerPrizes";
import { StreamerSubscribers } from "../StreamerSubscribers/StreamerSubscribers";
import { StreamerVideos } from "../StreamerVideos/StreamerVideos";
export const StreamerPage = () => {
  return (
    <div className="section streamer">
      <StreamerHeader></StreamerHeader>
      <StreamerManagement></StreamerManagement>
      <StreamerVideos></StreamerVideos>
      <StreamerPrizes></StreamerPrizes>
      <StreamerSubscribers></StreamerSubscribers>
    </div>
  );
};
