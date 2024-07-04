import { StreamerView } from "../StreamerView/StreamerView";
import { WithMenu } from "../withMenu/withMenu";
import ".//Streamers.scss";
const StreamersView = () => {
  const streamers = [1, 2, 3, 4, 5, 6, 434, 43, 43, 4343, 434, 343];
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

export const Streamers = () => {
  return (
    <WithMenu>
      <StreamersView></StreamersView>
    </WithMenu>
  );
};
