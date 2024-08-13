import React, { useEffect, useRef, useState } from "react";
import { handleFiles } from "../../functions/handleFiles";
import { Preview } from "../Preview/Preview";
import "./TelegramPostPreview.scss";
import { useLocation } from "react-router-dom";
import { FilePreview } from "../FilePreview/FilePreview";
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
  return (
    <div className="telegram-post">
      <FilePreview file={file}></FilePreview>
      <div className="details-text">{message || "Нет текста"}</div>
    </div>
  );
};
