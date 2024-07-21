import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAdminsQuery,
  useGetRaffleWinnersQuery,
} from "../../features/api";
import { UserView } from "../UserView/UserView";
import "./RaffleResultWinners.scss";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import { formatRaffleDate } from "../../functions/formatRaffleDate";
import { NotAvailable } from "../NotAvailable.tsx/NotAvailable";
import { useCheckStreamerYourself } from "../../functions/useCheckStreamerYourself";
import { useQueryParams } from "../../functions/useQueryParams";
export const RaffleResultWinners = () => {
  const { id } = useParams();
  const { data: admins } = useGetAdminsQuery(id || "");
  const query = useQueryParams();
  const streamerId = query.get("streamerId") || "";
  const isStreamerYourself = useCheckStreamerYourself(streamerId, admins);
  const navigate = useNavigate();
  const {
    data: winers,
    isLoading: winnersLoading,
    error: winnersError,
  } = useGetRaffleWinnersQuery(parseInt(id || "0"), { pollingInterval: 10000 });
  const { errorText, setErrorText } = useQueryError(winnersError);
  return (
    <div className="raffle-result__winners">
      <Details
        isLoading={!winers && winnersLoading}
        error={errorText}
        onClose={() => setErrorText(undefined)}
      ></Details>
      {
        <NotAvailable
          text="Победители еще не определены или слишком мало участников"
          available={winers != undefined && winers.length > 0}
        ></NotAvailable>
      }
      {winers?.map((t) => (
        <UserView
          {...t}
          onClick={() => {
            if (isStreamerYourself)
              navigate(
                `/subscriber-profile/${t.tgId}?streamerId=${streamerId}`
              );
          }}
          id={4}
          name={t.firstName}
          detailsText={`Подписан с ${formatRaffleDate(t.subscribeTime)}`}
        ></UserView>
      ))}
    </div>
  );
};
