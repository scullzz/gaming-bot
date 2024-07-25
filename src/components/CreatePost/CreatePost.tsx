import { useLocation, useNavigate } from "react-router-dom";
import { CreatePostFilePicker } from "../CreatePostFilePicker/CreatePostFilePicker";
import "./CreatePost.scss";
import { useState } from "react";
import { useMemoryState } from "../../functions/useMemoryState";
import { useCreatePostMutation } from "../../features/api";
import { Details } from "../Details/Details";
import { handleError } from "../../functions/handleError";
export const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { streamerId } = location.state;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setPostMessage] = useMemoryState<string | null>(
    null,
    "postMessage"
  );
  const [
    createPost,
    { isLoading: postCreating, error: postError, reset: resetPostError },
  ] = useCreatePostMutation();
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
      <textarea
        value={message || undefined}
        onInput={(e) => setPostMessage(e.currentTarget.value)}
        placeholder="Сообщение"
        style={{ marginTop: "20px" }}
      ></textarea>
      <span
        className="details-text details-text_add create-post__details"
        style={{ marginTop: "6px" }}
      >
        Сообщение получат все ваши подписчики, у которых бот включен.
      </span>
      <div className="create-post__buttons">
        <button className="start-btn" onClick={onPostCreate}>
          Опубликовать
        </button>
      </div>
    </div>
  );
};
