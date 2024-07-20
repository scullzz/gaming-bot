import burger from "/y-burger.png";
import "./AddedSocialView.scss";
import pointer from "/pointer-right.png";
import { GetSocialDto } from "../../types/GetSocialDto";

interface IAddedSocialViewProps extends GetSocialDto {
  onClick: () => void;
}
export const AddedSocialView = ({
  name,
  link,
  onClick,
}: IAddedSocialViewProps) => {
  return (
    <div className="added-social" key={name} onClick={onClick}>
      <div className="added-social__icon">
        <img src={burger} alt="" className="icon" />
      </div>
      <div className="added-social__info">
        <div className="label-text">{name}</div>
        <div className="details-text">{link}</div>
      </div>
      <img src={pointer} alt="Указатель" className="icon" />
    </div>
  );
};
