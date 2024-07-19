import { useParams } from "react-router-dom";
import { useGetRaffleWinnersQuery } from "../../features/api";
import { UserView } from "../UserView/UserView";
import "./RaffleResultWinners.scss";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import { formatRaffleDate } from "../../functions/formatRaffleDate";
export const RaffleResultWinners = () => {
  const { id } = useParams();
  const {
    data: winers,
    isLoading: winnersLoading,
    error: winnersError,
  } = useGetRaffleWinnersQuery(parseInt(id || "0"));
  const { errorText, setErrorText } = useQueryError(winnersError);
  return (
    <div className="raffle-result__winners">
      <Details
        isLoading={!winers && winnersLoading}
        error={errorText}
        onClose={() => setErrorText(undefined)}
      ></Details>
      {winers?.map((t) => (
        <UserView
          {...t}
          id={4}
          name={t.firstName}
          detailsText={`Подписан с ${formatRaffleDate(t.subscribeTime)}`}
        ></UserView>
      ))}
    </div>
  );
};
