import "./StreamerManagement.scss";

import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { useCheckStreamerYourself } from "../../functions/useCheckStreamerYourself";
import {
  useGetAdminsQuery,
  useGetStreamerQuery,
  useSubscribeToStreamerMutation,
} from "../../features/api";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import { getNameId } from "../../functions/getValueFromJwt";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../functions/handleError";
interface IStreamerManagementProps extends IStreamerDetailsViewer {
  refetch: () => void;
}
export const StreamerManagement = ({
  id,
  refetch: refetchSubs,
}: IStreamerManagementProps) => {
  const { data: admins, isLoading, error } = useGetAdminsQuery(id);
  const isStreamerYourself = useCheckStreamerYourself(id, admins);
  const userId = getNameId();
  const navigate = useNavigate();
  const [
    subscribe,
    { isLoading: subscribing, error: subError, reset: resetSubError },
  ] = useSubscribeToStreamerMutation();
  const subErrorText = handleError(subError);
  const {
    data: streamer,
    isLoading: streamerLoading,
    error: streamerError,
    refetch,
  } = useGetStreamerQuery({ userId, tgId: id });

  const { errorText: streamerErrorText, setErrorText: setStreamerErrorText } =
    useQueryError(streamerError);
  const { errorText, setErrorText } = useQueryError(error);
  const onSub = () => {
    subscribe({ streamerId: id, userId })
      .unwrap()
      .then(() => {
        refetch();
        refetchSubs();
      });
  };
  return (
    <div className="streamer__management-body">
      {
        <Details
          isLoading={(isLoading && !admins) || (streamerLoading && !streamer)}
          error={errorText || streamerErrorText || subErrorText}
          onClose={() => {
            setErrorText(undefined);
            setStreamerErrorText(undefined);
            resetSubError();
          }}
        ></Details>
      }
      {isStreamerYourself && (
        <div className="streamer__management">
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
            onClick={() =>
              navigate("/create-post", { state: { streamerId: id } })
            }
          >
            Создать пост
          </button>
        </div>
      )}
      {streamer?.isSubscribed ? (
        <></>
      ) : (
        <div className="streamer__management-user">
          <button className="attention-btn" onClick={onSub} id="sub-refetch">
            Подписаться
          </button>
          <span className="details-text details-text_add">
            Подпишитесь на стримера, чтобы участвовать в его розыгрышах и
            получать уведомления от него
          </span>
        </div>
      )}
    </div>
  );
};
