import { useState } from "react";
import { rafflesAdapter, useGetRafflesQuery } from "../../features/api";
import { useScrollPagination } from "../../functions/useScrollPagination";
import { Prize } from "../Prize/Prize";
import "./StreamerPrizes.scss";
import { useQueryError } from "../../functions/useQueryError";
import { NotAvailable } from "../NotAvailable.tsx/NotAvailable";
import { Details } from "../Details/Details";
import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { getNameId } from "../../functions/getValueFromJwt";
interface StreamerPrizesProps extends IStreamerDetailsViewer {}
export const StreamerPrizes = ({ id }: StreamerPrizesProps) => {
  const { page, pageSize, handleScroll } = useScrollPagination();
  const userId = getNameId();
  const [type, setType] = useState("active");
  const { raffles, isLoading, error } = useGetRafflesQuery(
    { page, pageSize, type, id, userId },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 5000,
      selectFromResult: ({ data, ...other }) => ({
        raffles: rafflesAdapter
          .getSelectors()
          .selectAll(data ?? rafflesAdapter.getInitialState()),
        ...other,
      }),
    }
  );
  const { errorText, setErrorText } = useQueryError(error);
  const onTypeSwtich = () => {
    setType((prev) => (prev === "active" ? "notactive" : "active"));
  };

  return (
    <div className="streamer__prizes">
      {
        <Details
          isLoading={raffles.length === 0 && isLoading}
          error={errorText}
          onClose={() => setErrorText(undefined)}
        ></Details>
      }
      <div className="streamer__prizes-top">
        <span
          className="streamer__prizes-top-header-active"
          onClick={onTypeSwtich}
        >
          {type === "active" ? "Активные розыгрыши" : "Завершенные"}
        </span>
        <span className="streamer__prizes-top-header" onClick={onTypeSwtich}>
          {type === "active" ? "Завершенные" : "Активные розыгрыши"}
        </span>
      </div>
      <div
        className="streamer__prizes-body"
        onScroll={
          isLoading || raffles.length % pageSize !== 0 ? () => {} : handleScroll
        }
      >
        {
          <div style={{ marginLeft: "15px" }}>
            <NotAvailable
              available={raffles.length !== 0}
              text="Нет доступных розыгрышей"
            ></NotAvailable>
          </div>
        }
        {raffles.map((t) => {
          return <Prize {...t} streamerId={id}></Prize>;
        })}
      </div>
    </div>
  );
};
