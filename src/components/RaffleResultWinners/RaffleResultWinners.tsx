import { UserView } from "../UserView/UserView";
import "./RaffleResultWinners.scss";
const template = {
  name: "Peter parker",
  detailsText: "Подписан с 22 февраля 2024 г",
};
export const RaffleResultWinners = () => {
  return (
    <div className="raffle-result__winners">
      {[1, 2, 3].map((t) => (
        <UserView {...template} id={4}></UserView>
      ))}
    </div>
  );
};
