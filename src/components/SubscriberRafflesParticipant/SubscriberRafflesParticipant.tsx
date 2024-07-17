import pointer from "/pointer-right.png";
import "./SubscriberRafflesParticipant.scss";
export const SubscriberRafflesParticipant = () => {
  const items = [1, 2];
  return (
    <ul className="subscriber-profile-raffles-participant">
      {items.map((t) => (
        <SubscriberRafflesParticipantItem></SubscriberRafflesParticipantItem>
      ))}
    </ul>
  );
};

const SubscriberRafflesParticipantItem = () => {
  return (
    <li>
      <div className="header">
        <span className="label">Something #443</span>
        <div className="extensions">
          <div className="status">Abuse</div>
          <div className="date"></div>
          <img src={pointer} className="icon" />
        </div>
      </div>
      <div className="line"></div>
    </li>
  );
};
