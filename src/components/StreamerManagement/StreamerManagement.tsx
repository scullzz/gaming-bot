import "./StreamerManagement.scss";
export const StreamerManagement = () => {
  const isStreamer = false;
  return (
    <div
      className={`streamer__management ${
        !isStreamer && "streamer__management-user"
      }`}
    >
      {isStreamer ? (
        <>
          <button className="attention-btn">Создать розыгрыш</button>
          <button className="attention-btn">Создать пост</button>
        </>
      ) : (
        <>
          <button className="attention-btn">Подписаться</button>
          <span className="details-text details-text_add">
            Подпишитесь на стримера, чтобы участвовать в его розыгрышах и
            получать уведомления от него
          </span>
        </>
      )}
    </div>
  );
};
