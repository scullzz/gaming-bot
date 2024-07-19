import { createPortal } from "react-dom";
import "./ModalWindow.scss";
import { useEffect } from "react";
type DefaultModalProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};
export const ModalWindow = ({ children, style }: DefaultModalProps) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return createPortal(
    <div className="modal" style={style}>
      <div className="modal-form">{children}</div>
    </div>,
    document.body
  );
};
