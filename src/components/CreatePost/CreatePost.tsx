import { CreatePostFilePicker } from "../CreatePostFilePicker/CreatePostFilePicker";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import "./CreatePost.scss";
export const CreatePost = () => {
  return (
    <div className="section create-post">
      <SectionHeader left="Закрыть"></SectionHeader>
      <div className="create-post__header">Написать сообщение</div>
      <CreatePostFilePicker></CreatePostFilePicker>
      <textarea
        name=""
        id=""
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
        <button className="preview-btn">Предпросмотр</button>
        <button className="start-btn">Опубликовать</button>
      </div>
    </div>
  );
};
