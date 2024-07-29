import React, { useEffect, useRef, useState } from "react";
import { handleFiles } from "../../functions/handleFiles";
import { Preview } from "../Preview/Preview";
import "./TelegramPostPreview.scss";
import { useLocation } from "react-router-dom";
export const TelegramPostPreview = () => {
  const location = useLocation();
  const { post } = location.state;
  const props = post as ITelegramPostProps;
  return (
    <Preview header="Предпросмотр поста">
      <TelegramPost {...props}></TelegramPost>
    </Preview>
  );
};

export interface ITelegramPostProps {
  message?: string | undefined;
  file?: File | undefined;
}
export const TelegramPost = ({ message, file }: ITelegramPostProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  let handledFiles = [];
  const [elemNode, setElemNode] = useState<React.ReactNode | null>(null);
  useEffect(() => {
    if (file) {
      handledFiles = handleFiles([file]);
      console.log(handledFiles);
      handledFiles.forEach((e) => {
        if (!React.isValidElement(e)) {
          const el = e as HTMLElement;
          el.classList.add("telegram-post__cover");
        }
      });
      const elem = handledFiles[0];

      if (React.isValidElement(elem)) {
        setElemNode(elem);
      } else {
        if (ref.current) ref.current.prepend(elem);
      }
    }
  }, [file]);
  return (
    <div className="telegram-post" ref={ref}>
      {elemNode}
      <div className="details-text">{message || "Нет текста"}</div>
    </div>
  );
};
