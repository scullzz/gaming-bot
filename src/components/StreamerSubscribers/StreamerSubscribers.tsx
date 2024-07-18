import {
  subscribersAdapter,
  useGetAdminsQuery,
  useGetSubscribersQuery,
} from "../../features/api";

import { mapSubscriberToUserView } from "../../functions/mapSubscriberToUserView";
import { useCheckStreamerYourself } from "../../functions/useCheckStreamerYourself";
import { useQueryError } from "../../functions/useQueryError";
import { useScrollPagination } from "../../functions/useScrollPagination";
import { Details } from "../Details/Details";
import { NotAvailable } from "../NotAvailable.tsx/NotAvailable";
import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { UserView } from "../UserView/UserView";
import "./StreamerSubscribers.scss";
export const StreamerSubscribers = ({ id }: IStreamerDetailsViewer) => {
  const { page, pageSize, handleScroll } = useScrollPagination();

  const {
    data: admins,
    isLoading: adminsLoading,
    error: adminsError,
  } = useGetAdminsQuery(id);
  const isStreamerYourself = useCheckStreamerYourself(id, admins);
  const { errorText: adminErrorText, setErrorText: setAdminErrorText } =
    useQueryError(adminsError);
  const {
    subscribers,
    isLoading,
    error: subscribersError,
  } = useGetSubscribersQuery(
    { page, pageSize, id },
    {
      pollingInterval: 10000,
      refetchOnMountOrArgChange: true,
      selectFromResult: ({ data, ...other }) => ({
        subscribers: subscribersAdapter
          .getSelectors()
          .selectAll(data ?? subscribersAdapter.getInitialState()),
        ...other,
      }),
    }
  );
  const { errorText, setErrorText } = useQueryError(subscribersError);
  return (
    <div className="streamer__subscribers">
      {
        <Details
          isLoading={(subscribers.length === 0 && isLoading) || adminsLoading}
          error={errorText || adminErrorText}
          onClose={() => {
            setErrorText(undefined);
            setAdminErrorText(undefined);
          }}
        ></Details>
      }
      <span className="streamer__subscribers-header">Подписчики</span>
      <div className="streamer__subscribers-body">
        {isStreamerYourself && (
          <button
            className="attention-opacity-btn"
            style={{ width: "100%", marginBottom: "7px" }}
          >
            Скачать
          </button>
        )}

        <div
          className="streamer__subscribers-users"
          onScroll={
            isLoading || subscribers.length % pageSize !== 0
              ? () => {}
              : handleScroll
          }
        >
          {
            <NotAvailable
              available={subscribers.length !== 0}
              text="Нет подписчиков"
            ></NotAvailable>
          }
          {subscribers.map((t) => (
            <UserView {...mapSubscriberToUserView(t)}></UserView>
          ))}
        </div>
      </div>
    </div>
  );
};
