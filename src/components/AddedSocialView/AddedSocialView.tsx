import burger from "/y-burger.png";
import "./AddedSocialView.scss";
import pointer from "/pointer-right.png";
export const AddedSocialView = () => {
  return (
    <div className="added-social">
      <div className="added-social__icon">
        <img src={burger} alt="" className="icon" />
      </div>
      <div className="added-social__info">
        <div className="label-text">Telegram</div>
        <div className="details-text">https://t.me/cobriktm</div>
      </div>
      <img src={pointer} alt="Указатель" className="icon" />
    </div>
  );
};
