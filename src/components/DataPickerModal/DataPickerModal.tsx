import "./DataPickerModal.scss";
import { DefaultModalProps, ModalWindow } from "../ModalWindow/ModalWinodw";
interface IDataPickerModalProps extends Omit<DefaultModalProps, "children"> {
  value: any;
  setValue: (v: any) => void;
}
export const DataPickerModal = ({
  value,
  setValue,
  onSubmit,
  ...rest
}: IDataPickerModalProps) => {
  return (
    <ModalWindow {...rest}>
      <div className="data-picker">
        <input
          type="text"
          value={value}
          placeholder="Введите telegram id пользователя"
          onInput={(e) => setValue(e.currentTarget.value)}
        />
        <div
          className="btn attention-btn streamer-socials-adding__form-btn"
          onClick={onSubmit}
        >
          Добавить
        </div>
      </div>
    </ModalWindow>
  );
};
