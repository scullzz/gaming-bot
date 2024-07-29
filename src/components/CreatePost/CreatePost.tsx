import { useLocation, useNavigate } from "react-router-dom";
import { CreatePostFilePicker } from "../CreatePostFilePicker/CreatePostFilePicker";
import "./CreatePost.scss";
import { useMemoryState } from "../../functions/useMemoryState";
import { useCreatePostMutation } from "../../features/api";
import { Details } from "../Details/Details";
import { handleError } from "../../functions/handleError";
import { TextBox } from "../TextBox/TextBox";
import { ITelegramPostProps } from "../TelegramPostPreview/TelegramPostPreview";
import { useEffect, useState } from "react";
import { FilePreview } from "../FilePreview/FilePreview";
let File: File | null = null;
export const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { streamerId } = location.state;
  const [selectedFile, setSelectedFile] = useState<File | null>(File);
  const [message, setPostMessage] = useMemoryState<string | undefined>(
    "",
    "postMessage"
  );
  const [
    createPost,
    { isLoading: postCreating, error: postError, reset: resetPostError },
  ] = useCreatePostMutation();
  useEffect(() => {
    File = selectedFile;
  }, [selectedFile]);
  const postErrorText = handleError(postError);
  const onPostCreate = () => {
    let data = new FormData();
    if (selectedFile != null) data.append("media", selectedFile);

    if (message == null) return;
    data.append("message", message);
    createPost({ id: streamerId as string, data })
      .unwrap()
      .then(() => navigate(`/streamer/${streamerId}`));
  };
  function onPreview(): void {
    const post: ITelegramPostProps = { message, file: selectedFile };
    navigate("/telegram-post-preview", { state: { post } });
  }

  return (
    <div className="section create-post">
      <Details
        isLoading={postCreating}
        error={postErrorText}
        onClose={() => resetPostError()}
      ></Details>
      <div className="create-post__header">Написать сообщение</div>
      <CreatePostFilePicker
        value={selectedFile}
        onChange={setSelectedFile}
      ></CreatePostFilePicker>
      <TextBox
        value={message}
        onInput={(e) => setPostMessage(e.currentTarget.value)}
        placeholder="Сообщение"
        style={{ marginTop: "20px" }}
      ></TextBox>
      <span
        className="details-text details-text_add create-post__details"
        style={{ marginTop: "6px" }}
      >
        Сообщение получат все ваши подписчики, у которых бот включен.
      </span>
      <div className="create-post__buttons">
        <button className="preview-btn" onClick={onPreview}>
          Предпросмотр
        </button>
        <button className="start-btn" onClick={onPostCreate}>
          Опубликовать
        </button>
      </div>
      {
        <FilePreview
          file={selectedFile}
          style={{ marginTop: "15px" }}
        ></FilePreview>
      }
    </div>
  );
};
