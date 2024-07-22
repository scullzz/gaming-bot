import { createPortal } from "react-dom";
import "./ModalWindow.scss";
import { useEffect, useRef } from "react";
export type DefaultModalProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClose?: () => void;
  onSubmit?: () => void;
};
export const ModalWindow = ({
  children,
  style,
  onClose,
}: DefaultModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Проверяем, что клик был именно на подложке
    if (ref.current && e.target === ref.current && onClose) {
      onClose();
    }
  };
  return createPortal(
    <div className="modal" style={style} ref={ref} onClick={onClick}>
      <div className="modal-form">{children}</div>
    </div>,
    document.body
  );
};
