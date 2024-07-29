import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RaffleResultPreview } from "../RaffleResultPreview/RaffleResultPreview";
import { RaffleResultWinnerGenerator } from "../RaffleResultWinnerGenerator/RaffleResultWinnerGenerator";
import { RaffleResultWinners } from "../RaffleResultWinners/RaffleResultWinners";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import "./RaffleResult.scss";
import { useGetAdminsQuery, useGetRaffleByIdQuery } from "../../features/api";
import { Details } from "../Details/Details";
import { useQueryError } from "../../functions/useQueryError";
import { formatRaffleDate } from "../../functions/formatRaffleDate";
import { useCheckStreamerYourself } from "../../functions/useCheckStreamerYourself";
import { getNameId } from "../../functions/getValueFromJwt";

export const RaffleResult = () => {
  const { id } = useParams();
  const location = useLocation();
  const { streamerId } = location.state;
  const {
    data: raffle,
    isLoading: raffleLoading,
    error: raffleError,
  } = useGetRaffleByIdQuery({
    raffleId: parseInt(id!),
  });
  const { errorText: raffleEt, setErrorText: setRaffleEt } =
    useQueryError(raffleError);
  const { data: admins } = useGetAdminsQuery(streamerId);
  const isStreamerYourself = useCheckStreamerYourself(getNameId(), admins);
  const showWinners = isStreamerYourself
    ? true
    : raffle?.showWinners
    ? true
    : false;

  return (
    <div className="section raffle-result">
      <Details
        isLoading={raffleLoading && !raffle}
        error={raffleEt}
        onClose={() => setRaffleEt(undefined)}
      ></Details>
      <SectionHeader center={<span>Результаты розыгрыша</span>}></SectionHeader>
      <div className="mt" style={{ minHeight: "21px" }}></div>
      <RaffleResultPreview
        {...raffle}
        streamerId={streamerId || ""}
      ></RaffleResultPreview>
      <div
        className="raffle-result__header"
        style={{
          width: "100%",
          textAlign: "left",
          marginTop: "30px",
          marginBottom: "15px",
        }}
      >
        Сгенерировать новых победителей
      </div>
      {isStreamerYourself && (
        <RaffleResultWinnerGenerator></RaffleResultWinnerGenerator>
      )}
      {showWinners && (
        <>
          <div className="raffle-result__subs-header">
            <div className="raffle-result__header" style={{ marginBottom: 0 }}>
              Победили:
            </div>
            <div className="raffle-result__time">
              {formatRaffleDate(raffle?.endTime || new Date().toISOString())}
            </div>
          </div>
          <RaffleResultWinners></RaffleResultWinners>
        </>
      )}
    </div>
  );
};
