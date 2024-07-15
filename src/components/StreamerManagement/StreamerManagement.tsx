import "./StreamerManagement.scss";

import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { useCheckStreamerYourself } from "../../functions/useCheckStreamerYourself";
export const StreamerManagement = ({ id }: IStreamerDetailsViewer) => {
  const isStreamerYourself = useCheckStreamerYourself(id);

  return (
    <div
      className={`streamer__management ${
        !isStreamerYourself && "streamer__management-user"
      }`}
    >
      {isStreamerYourself ? (
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
