import { tg } from "../../App";
import { subscribersAdapter, useGetSubscribersQuery } from "../../features/api";
import { useScrollPagination } from "../../functions/useScrollPagination";
import { UserView } from "../UserView/UserView";
import "./StreamerSubscribers.scss";
export const StreamerSubscribers = () => {
  const { page, pageSize, handleScroll } = useScrollPagination();
  const id = tg.initDataUnsafe.user?.id.toString() || "";
  const {
    subscribers,
    isLoading,
    error: subscribersError,
  } = useGetSubscribersQuery(
    { page, pageSize, id },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 5000,
      selectFromResult: ({ data, ...other }) => ({
        subscribers: subscribersAdapter
          .getSelectors()
          .selectAll(data ?? subscribersAdapter.getInitialState()),
        ...other,
      }),
    }
  );
  return (
    <div className="streamer__subscribers">
      <span className="streamer__subscribers-header">Подписчики</span>
      <div className="streamer__subscribers-body">
        <button
          className="attention-opacity-btn"
          style={{ width: "100%", marginBottom: "7px" }}
        >
          Скачать
        </button>
        <div
          className="streamer__subscribers-users"
          onScroll={
            isLoading || subscribers.length % pageSize !== 0
              ? () => {}
              : handleScroll
          }
        >
          {subscribers.map((t) => (
            <UserView {...t}></UserView>
          ))}
        </div>
      </div>
    </div>
  );
};
