import "./DataPickerModal.scss";
import { DefaultModalProps, ModalWindow } from "../ModalWindow/ModalWinodw";
interface IDataPickerModalProps extends Omit<DefaultModalProps, "children"> {
  value: any;
  setValue: (v: any) => void;
  placeholderText?: string;
  btnText?: string;
  compact?: boolean;
}
export const DataPickerModal = ({
  value,
  setValue,
  compact = true,
  onSubmit,
  btnText,
  placeholderText,
  ...rest
}: IDataPickerModalProps) => {
  return (
    <ModalWindow {...rest}>
      <div className="data-picker">
        {compact ? (
          <input
            type="text"
            value={value}
            placeholder={placeholderText || "Введите значение"}
            onInput={(e) => setValue(e.currentTarget.value)}
          />
        ) : (
          <textarea
            value={value}
            placeholder={placeholderText || "Введите значение"}
            onInput={(e) => setValue(e.currentTarget.value)}
          ></textarea>
        )}

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
