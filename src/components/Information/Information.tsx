import { ModalWindow } from "../ModalWindow/ModalWinodw";
import { Spinner } from "../Spinner/Spinner";
import "./Information.scss";
interface IInformationProps {
  isLoading?: boolean;
  error?: string;
  onClose?: () => void;
}

export const Information = ({
  isLoading,
  error,
  onClose,
}: IInformationProps) => {
  return (
    <>
      {isLoading && (
        <ModalWindow style={{ backgroundColor: "var(--main-color)" }}>
          <Spinner style={{ marginInline: "auto", display: "block" }}></Spinner>
        </ModalWindow>
      )}
      {error && (
        <ModalWindow>
          <div className="info__error">
            <span className="label-text label-text-error">{error}</span>
            <button className="attention-btn" onClick={onClose}>
              ОК
            </button>
          </div>
        </ModalWindow>
      )}
    </>
  );
};
