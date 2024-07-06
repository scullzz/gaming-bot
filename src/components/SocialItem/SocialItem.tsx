export interface SocialItemProps {
  text: string;
  url: string;
  onClick: () => void;
}
import "./SocialItem.scss";
export const SocialItem = ({ text, url, onClick }: SocialItemProps) => {
  return (
    <div className="social-btn social-item" onClick={onClick}>
      <img src={url} alt={text} className="social-item__icon" />
      <span className="social-item__text">{text}</span>
    </div>
  );
};
