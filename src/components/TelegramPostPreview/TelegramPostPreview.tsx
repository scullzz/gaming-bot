import React from "react";
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
const TelegramPost = ({ message, file }: ITelegramPostProps) => {
  let handledFiles = [];
  if (file) {
    handledFiles = handleFiles([file]);
    handledFiles.forEach((e) => {
      if (!React.isValidElement(e)) {
        const el = e as HTMLElement;
        el.classList.add("telegram-post__cover");
      }
    });
  }
  return (
    <div className="telegram-post">
      {file ? handledFiles[0] : null}
      <div className="details-text">{message || "Нет текста"}</div>
    </div>
  );
};
