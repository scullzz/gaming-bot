import burger from "/y-burger.svg";
import "./AddedSocialView.scss";
import pointer from "/pointer-right.svg";
import { GetSocialDto } from "../../types/GetSocialDto";
import { truncateValue } from "../../functions/truncateValue";

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
        <div className="details-text">{truncateValue(link, 35)}</div>
      </div>
      <img src={pointer} alt="Указатель" className="icon" />
    </div>
  );
};
