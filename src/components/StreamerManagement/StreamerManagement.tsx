import "./StreamerManagement.scss";

import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { useCheckStreamerYourself } from "../../functions/useCheckStreamerYourself";
import { useGetAdminsQuery, useGetStreamerQuery } from "../../features/api";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import { getNameId } from "../../functions/getValueFromJwt";
import { useNavigate } from "react-router-dom";
export const StreamerManagement = ({ id }: IStreamerDetailsViewer) => {
  const { data: admins, isLoading, error } = useGetAdminsQuery(id);
  const isStreamerYourself = useCheckStreamerYourself(id, admins);
  const userId = getNameId();
  const navigate = useNavigate();
  const {
    data: streamer,
    isLoading: streamerLoading,
    error: streamerError,
  } = useGetStreamerQuery({ userId, tgId: id });
  const { errorText: streamerErrorText, setErrorText: setStreamerErrorText } =
    useQueryError(streamerError);
  const { errorText, setErrorText } = useQueryError(error);
  return (
    <div
      className={`streamer__management ${
        !isStreamerYourself && "streamer__management-user"
      }`}
    >
      {
        <Details
          isLoading={isLoading || streamerLoading}
          error={errorText || streamerErrorText}
          onClose={() => {
            setErrorText(undefined);
            setStreamerErrorText(undefined);
          }}
        ></Details>
      }
      {isStreamerYourself ? (
        <>
          <button
            className="attention-btn"
            onClick={() =>
              navigate("/create-raffle", { state: { streamerId: id } })
            }
          >
            Создать розыгрыш
          </button>
          <button
            className="attention-btn"
            onClick={() => navigate("/create-post")}
          >
            Создать пост
          </button>
        </>
      ) : streamer?.isSubscribed ? (
        <></>
      ) : (
        <>
          <button className="attention-btn">Подписаться</button>
          <span className="details-text details-text_add">
            Подпишитесь на стримера, чтобы участвовать в его розыгрышах и
            получать уведомления от него
          </span>
        </>
      )}
    </div>
  );
};
