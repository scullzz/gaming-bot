import { toPercentageString } from "../../functions/toPercentageString";
import { SubscriberStat } from "../../types/subscriberStat";
import "./SubscriberRafflesStats.scss";

interface ISubscriberRafflesStatsProps extends Partial<SubscriberStat> {}
export const SubscriberRafflesStats = ({
  spottedInStreamerAbusing,
  participatedInStreamer,
  participated,
  wonStreamer,
  spottedInAbusing,
  won,
}: ISubscriberRafflesStatsProps) => {
  return (
    <div className="subscriber-profile__raffles-stats">
      <div className="header">
        <span>Участвовал в розыгрышах стримера:</span>
        <span className="amount">{participatedInStreamer?.amount}</span>
        <span></span>
        <span>Выигрывал в розыгрышах стримера:</span>
        <span className="amount">{wonStreamer?.amount}</span>
        <span>{`(${wonStreamer?.percentage || 0})`}</span>
        <span>Замечен в абузинге стримера:</span>
        <span className="amount">{spottedInStreamerAbusing?.amount}</span>
        <span>{`(${toPercentageString(
          spottedInStreamerAbusing?.percentage || 0
        )})`}</span>
      </div>

      <div className="footer-stats">
        <span>Участвовал в розыгрышах:</span>
        <span className="amount">{participated?.amount}</span>
        <span></span>
        <span>Выигрывал в розыгрышах:</span>
        <span className="amount">{won?.amount}</span>
        <span>{`(${toPercentageString(won?.percentage || 0)})`}</span>
        <span>Замечен в абузинге:</span>
        <span className="amount">{spottedInAbusing?.amount}</span>
        <span>{`(${toPercentageString(
          spottedInAbusing?.percentage || 0
        )})`}</span>
      </div>
    </div>
  );
};
