import { StreamerView } from "../StreamerView/StreamerView";
import ".//Streamers.scss";
export const Streamers = () => {
  const streamers = [1, 2, 3, 4, 5, 6];
  return (
    <div className="section streamers">
      <p className="header-text">Стримеры</p>
      <p className="details-text">
        Подпишитесь на стримера, чтобы участвовать в его розыгрышах и получать
        уведомления от него
      </p>

      {streamers.map((s) => (
        <StreamerView></StreamerView>
      ))}
    </div>
  );
};
