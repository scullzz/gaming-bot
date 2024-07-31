import { StreamerHeader } from "../StreamerHeader/StreamerHeader";
import { StreamerManagement } from "../StreamerManagement/StreamerManagement";
import "./StreamerPage.scss";
import { StreamerPrizes } from "../StreamerPrizes/StreamerPrizes";
import { StreamerSubscribers } from "../StreamerSubscribers/StreamerSubscribers";
import { StreamerVideos } from "../StreamerVideos/StreamerVideos";
import { useParams } from "react-router-dom";
import { useState } from "react";

export interface IStreamerDetailsViewer {
  id: string;
}

export const StreamerPage = () => {
  const { id } = useParams();
  const [refetch, setRefetch] = useState<() => void>(() => {});
  if (id === undefined) return <div>Nothing found</div>;

  return (
    <div className="section streamer">
      <StreamerHeader id={id} refetch={refetch}></StreamerHeader>
      <StreamerManagement id={id} refetch={refetch}></StreamerManagement>
      <StreamerVideos id={id}></StreamerVideos>
      <StreamerPrizes id={id}></StreamerPrizes>
      <StreamerSubscribers
        id={id}
        setRefetch={setRefetch}
      ></StreamerSubscribers>
    </div>
  );
};
