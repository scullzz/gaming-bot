import { SocialItem, SocialItemProps } from "../SocialItem/SocialItem";
import "./StreamerHeader.scss";
import youtube from "/youtube.png";
import telegram from "/telegram.png";
import exit from "/exit.png";
import burger from "/burger.png";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import { useGetStreamerQuery } from "../../features/api";
import { tg } from "../../App";
import { Information } from "../Information/Information";
import { handleError } from "../../functions/handleError";
const SOCIALS: SocialItemProps[] = [
  {
    text: "youtube",
    url: youtube,
    onClick: () => {},
  },
  {
    text: "telegram",
    url: telegram,
    onClick: () => {},
  },
  {
    text: "отписаться",
    url: exit,
    onClick: () => {},
  },
  {
    text: "ещё",
    url: burger,
    onClick: () => {},
  },
];

export const StreamerHeader = () => {
  const tgId = tg.initDataUnsafe.user?.id.toString() || "";
  const {
    data: streamer,
    isLoading,
    error: streamerError,
  } = useGetStreamerQuery(tgId);
  const streamerErrorText = handleError(streamerError);
  if ((!streamer && isLoading) || streamerErrorText || !streamer)
    return (
      <Information
        isLoading={isLoading}
        error={streamerErrorText}
      ></Information>
    );
  return (
    <div className="streamer__header">
      <StreamerPreview
        name={streamer?.name}
        details={`${streamer?.amountOfSubscribers} подписчиков`}
        isLive={streamer.isLive}
      ></StreamerPreview>
      <div className="streamer__socials">
        {SOCIALS.map((item) => (
          <SocialItem {...item}></SocialItem>
        ))}
      </div>
    </div>
  );
};
