import { createPortal } from "react-dom";
import "./ModalWindow.scss";
export const ModalWindow = ({ children }: { children: React.ReactNode }) => {
  return createPortal(
    <div className="modal">
      <div className="modal-form">{children}</div>
    </div>,
    document.body
  );
};
