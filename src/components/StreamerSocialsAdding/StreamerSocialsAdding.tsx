import "./StreamerSocialsAdding.scss";
export const StreamerSocialsAdding = () => {
  return (
    <div className="streamer-socials-adding">
      <span
        className="details-text details-text_add"
        style={{ textTransform: "uppercase", marginInline: "20px" }}
      >
        Ссылки на соцсети
      </span>
      <form className="streamer-socials-adding__form">
        <div className="wrapper">
          <input type="text" className="input" placeholder="Название ссылки" />
          <div
            className="line"
            style={{ width: "calc(100% - 20px)", marginLeft: "20px" }}
          ></div>
          <input type="text" className="input" placeholder="URL ссылки" />
        </div>
        <div className="btn attention-btn streamer-socials-adding__form-btn">
          Добавить
        </div>
      </form>
      <span
        className="details-text details-text_add"
        style={{ marginTop: "8px", marginInline: "20px" }}
      >
        Добавьте до 5 ссылок на социальные сети, которые будут отображаться в
        профиле канала.
      </span>
    </div>
  );
};
