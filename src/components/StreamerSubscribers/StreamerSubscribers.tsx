import { useNavigate } from "react-router-dom";
import {
  subscribersAdapter,
  useGetAdminsQuery,
  useGetStreamerReportMutation,
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

import { handleError } from "../../functions/handleError";
import { useEffect } from "react";
interface StreamerSubscribersProps extends IStreamerDetailsViewer {
  setRefetch: (func: () => void) => void;
}
export const StreamerSubscribers = ({
  id,
  setRefetch,
}: StreamerSubscribersProps) => {
  const { page, pageSize, handleScroll, setPageSize } = useScrollPagination();

  const {
    data: admins,
    isLoading: adminsLoading,
    error: adminsError,
  } = useGetAdminsQuery(id);
  const isStreamerYourself = useCheckStreamerYourself(id, admins);
  const { errorText: adminErrorText, setErrorText: setAdminErrorText } =
    useQueryError(adminsError);
  const [
    getReport,
    {
      isLoading: reportCreating,
      error: createReportError,
      reset: resetCreateReportError,
    },
  ] = useGetStreamerReportMutation();
  const createReportErrorText = handleError(createReportError);
  const {
    subscribers,
    isLoading,
    refetch,
    error: subscribersError,
  } = useGetSubscribersQuery(
    { page, pageSize, id },
    {
      pollingInterval: 10000,
      selectFromResult: ({ data, ...other }) => ({
        subscribers: subscribersAdapter
          .getSelectors()
          .selectAll(data ?? subscribersAdapter.getInitialState()),
        ...other,
      }),
    }
  );
  const { errorText, setErrorText } = useQueryError(subscribersError);
  const navigate = useNavigate();
  const onSubClick = (userId: string) => {
    if (isStreamerYourself)
      navigate(`/subscriber-profile/${userId}?streamerId=${id}`);
  };
  useEffect(() => {
    setRefetch(() => setPageSize((pageSizePrev) => pageSizePrev + 1));
  }, [setRefetch]);
  return (
    <div className="streamer__subscribers">
      {
        <Details
          isLoading={
            (subscribers.length === 0 && isLoading) ||
            adminsLoading ||
            reportCreating
          }
          error={errorText || adminErrorText || createReportErrorText}
          onClose={() => {
            setErrorText(undefined);
            setAdminErrorText(undefined);
            resetCreateReportError();
          }}
        ></Details>
      }
      <span className="streamer__subscribers-header">Подписчики</span>
      <div className="streamer__subscribers-body">
        {isStreamerYourself && (
          <button
            className="attention-opacity-btn"
            onClick={() => getReport(id)}
            style={{
              marginBottom: "7px",
              marginRight: "15px",
              width: "calc(100% - 15px)",
            }}
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
          {subscribers.map((t, i) => (
            <UserView
              img={t.imageUrl}
              {...mapSubscriberToUserView(t)}
              key={t.tgId}
              onClick={() => onSubClick(t.tgId)}
              withLine={i != subscribers.length - 1}
            ></UserView>
          ))}
        </div>
      </div>
    </div>
  );
};
