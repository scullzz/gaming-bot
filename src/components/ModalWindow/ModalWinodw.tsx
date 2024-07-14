import { createPortal } from "react-dom";
import "./ModalWindow.scss";
type DefaultModalProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};
export const ModalWindow = ({ children, style }: DefaultModalProps) => {
  return createPortal(
    <div className="modal" style={style}>
      <div className="modal-form">{children}</div>
    </div>,
    document.body
  );
};
