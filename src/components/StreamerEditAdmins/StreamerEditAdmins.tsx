import { AddButton } from "../AddButton/AddButton";
import { UserView } from "../UserView/UserView";
import "./StreamerEditAdmin.scss";
const template = {
  name: "Peter Parker",
  details: "Владелец",
  withLine: false,
};
export const StreamerEditAdmins = () => {
  return (
    <div className="streamer-edit__admins">
      <span className="details-text streamer-edit__admins-header details-text_add">
        Администраторы канала
      </span>
      <div className="streamer-edit__admins-body">
        <AddButton text="Добавить администратора"></AddButton>
        <div
          className="line"
          style={{ marginLeft: "20px", width: "calc(100% - 20px)" }}
        ></div>
        {[1, 2, 3].map((t) => (
          <UserView
            {...template}
            style={{ marginTop: "15px", marginInline: "14px" }}
          ></UserView>
        ))}
      </div>
      <div
        className="details-text details-text_add"
        style={{ marginTop: "8px" }}
      >
        Вы можете добавлять администраторов, чтобы они помогли Вам управлять
        каналом.
      </div>
    </div>
  );
};
