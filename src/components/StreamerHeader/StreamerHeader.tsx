import { Avatar } from "../Avatar/Avatar";
import { SocialItem, SocialItemProps } from "../SocialItem/SocialItem";
import "./StreamerHeader.scss";
import youtube from "/youtube.png";
import telegram from "/telegram.png";
import exit from "/exit.png";
import burger from "/burger.png";
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
  return (
    <div className="streamer__header">
      <div className="streamer__info">
        <Avatar isLive></Avatar>
        <span className="header-text">Mellstroy</span>
        <span className="details-text">666 подписчиков</span>
      </div>
      <div className="streamer__socials">
        {SOCIALS.map((item) => (
          <SocialItem {...item}></SocialItem>
        ))}
      </div>
    </div>
  );
};
