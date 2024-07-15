import { useGetAdminsQuery } from "../../features/api";
import { useQueryError } from "../../functions/useQueryError";
import { AddButton } from "../AddButton/AddButton";
import { Details } from "../Details/Details";
import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { UserView } from "../UserView/UserView";
import "./StreamerEditAdmin.scss";

const template = {
  name: "Peter parker",
  detailsText: "Админ",
};

export const StreamerEditAdmins = ({ id }: IStreamerDetailsViewer) => {
  const { data: admins, isLoading, error } = useGetAdminsQuery(id);
  const { errorText, setErrorText } = useQueryError(error);
  return (
    <div className="streamer-edit__admins">
      {
        <Details
          isLoading={!admins && isLoading}
          error={errorText}
          onClose={() => setErrorText(undefined)}
        ></Details>
      }
      <span
        className="details-text streamer-edit__admins-header details-text_add"
        style={{ marginInline: "20px" }}
      >
        Администраторы канала
      </span>
      <div className="streamer-edit__admins-body">
        <AddButton text="Добавить администратора"></AddButton>
        <div
          className="line"
          style={{ marginLeft: "20px", width: "calc(100% - 20px)" }}
        ></div>
        {[1, 2, 3, 4, 6].map((t, i) => (
          <UserView
            {...template}
            id={i}
            style={{ marginTop: "15px", marginInline: "14px" }}
          ></UserView>
        ))}
      </div>
      <div
        className="details-text details-text_add"
        style={{ marginTop: "8px", marginInline: "20px" }}
      >
        Вы можете добавлять администраторов, чтобы они помогли Вам управлять
        каналом.
      </div>
    </div>
  );
};
