import "./DataPickerModal.scss";
import { DefaultModalProps, ModalWindow } from "../ModalWindow/ModalWinodw";
interface IDataPickerModalProps extends Omit<DefaultModalProps, "children"> {
  value: any;
  setValue: (v: any) => void;
  placeholderText?: string;
  btnText?: string;
}
export const DataPickerModal = ({
  value,
  setValue,
  onSubmit,
  btnText,
  placeholderText,
  ...rest
}: IDataPickerModalProps) => {
  return (
    <ModalWindow {...rest}>
      <div className="data-picker">
        <input
          type="text"
          value={value}
          placeholder={placeholderText || "Введите значение"}
          onInput={(e) => setValue(e.currentTarget.value)}
        />
        <div
          className="btn attention-btn streamer-socials-adding__form-btn"
          onClick={onSubmit}
        >
          {btnText || "OK"}
        </div>
      </div>
    </ModalWindow>
  );
};
