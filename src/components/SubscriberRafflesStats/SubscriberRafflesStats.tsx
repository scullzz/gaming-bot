import "./SubscriberRafflesStats.scss";
export const SubscriberRafflesStats = () => {
  return (
    <div className="subscriber-profile__raffles-stats">
      <div className="header">
        <span>Участвовал в розыгрышах стримера:</span>
        <span className="amount">2</span>
        <span></span>
        <span>Выигрывал в розыгрышах стримера:</span>
        <span className="amount">2</span>
        <span>{"(33,3%)"}</span>
        <span>Замечен в абузинге стримера:</span>
        <span className="amount">2</span>
        <span>{"(33,3%)"}</span>
      </div>

      <div className="footer-stats">
        <span>Участвовал в розыгрышах:</span>
        <span className="amount">3</span>
        <span></span>
        <span>Выигрывал в розыгрышах:</span>
        <span className="amount">3</span>
        <span>{"(33,3%)"}</span>
        <span>Замечен в абузинге:</span>
        <span className="amount">3</span>
        <span>{"(33,3%)"}</span>
      </div>
    </div>
  );
};
