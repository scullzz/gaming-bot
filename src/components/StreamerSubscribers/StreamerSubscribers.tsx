import { IUserViewProps, UserView } from "../UserView/UserView";
import "./StreamerSubscribers.scss";
const template: IUserViewProps = {
  name: "Колян",
  details: "Подписан с 22 февраля 2024 г.",
};
export const StreamerSubscribers = () => {
  const users = [1, 3, 35, 35, 3, 53];
  return (
    <div className="streamer__subscribers">
      <span className="streamer__subscribers-header">Подписчики</span>
      <div className="streamer__subscribers-body">
        <button
          className="attention-opacity-btn"
          style={{ width: "100%", marginBottom: "7px" }}
        >
          Скачать
        </button>
        <div className="streamer__subscribers-users">
          {users.map((t) => (
            <UserView {...template}></UserView>
          ))}
        </div>
      </div>
    </div>
  );
};
