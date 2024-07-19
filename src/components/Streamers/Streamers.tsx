import { useRef } from "react";
import { useStickyScroll } from "../../functions/useStickyScroll";
import { WithMenu } from "../withMenu/withMenu";
import ".//Streamers.scss";
import { useScrollPagination } from "../../functions/useScrollPagination";
import {
  streamersAdapter,
  useGetStreamersQuery,
  useSubscribeToStreamerMutation,
} from "../../features/api";
import { getNameId } from "../../functions/getValueFromJwt";
import { NotAvailable } from "../NotAvailable.tsx/NotAvailable";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import { UserView } from "../UserView/UserView";
import { handleError } from "../../functions/handleError";
import { useNavigate } from "react-router-dom";

const StreamersView = () => {
  const streamersRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  useStickyScroll(streamersRef);
  const { page, pageSize, handleScroll } = useScrollPagination();
  const userId = getNameId();
  const { streamers, isLoading, error } = useGetStreamersQuery(
    { userId, page, pageSize },
    {
      selectFromResult: ({ data, ...other }) => ({
        streamers: streamersAdapter
          .getSelectors()
          .selectAll(data ?? streamersAdapter.getInitialState()),
        ...other,
      }),
    }
  );
  const [
    subscribeToStreamer,
    {
      isLoading: subscribingToStreamer,
      error: subscribeError,
      reset: resetSubscribeError,
    },
  ] = useSubscribeToStreamerMutation();
  const subscribeErrorText = handleError(subscribeError);
  const { errorText, setErrorText } = useQueryError(error);
  return (
    <div className="section streamers">
      <p className="header-text">Стримеры</p>
      {
        <Details
          error={errorText || subscribeErrorText}
          isLoading={
            (streamers.length === 0 && isLoading) || subscribingToStreamer
          }
          onClose={() => {
            setErrorText(undefined);
            resetSubscribeError();
          }}
        ></Details>
      }
      <div
        className="streamers-wrapper"
        ref={streamersRef}
        onScroll={isLoading ? () => {} : handleScroll}
        style={{ height: "auto" }}
      >
        {
          <NotAvailable
            available={streamers.length !== 0}
            text="Список стримеров пуст"
          ></NotAvailable>
        }
        {streamers.map((s) => (
          <UserView
            onClick={() => navigate(`/streamer/${s.tgId}`)}
            name={s.name}
            isStreamer
            id={s.tgId}
            onButtonClick={
              s.isSubscribed
                ? () => navigate(`/streamer/${s.tgId}`)
                : () => subscribeToStreamer({ userId, streamerId: s.tgId })
            }
            isSubscribed={s.isSubscribed || s.tgId == getNameId()}
            detailsText={`${s.amountOfSubscribers} подписчиков`}
          ></UserView>
        ))}
      </div>
    </div>
  );
};

export const Streamers = () => {
  return (
    <WithMenu>
      <StreamersView></StreamersView>
    </WithMenu>
  );
};
