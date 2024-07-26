import { useState } from "react";
import { useAddAdminsMutation, useGetAdminsQuery } from "../../features/api";
import { handleError } from "../../functions/handleError";
import { useQueryError } from "../../functions/useQueryError";
import { AddButton } from "../AddButton/AddButton";
import { Details } from "../Details/Details";
import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { UserView } from "../UserView/UserView";
import "./StreamerEditAdmin.scss";
import { getNameId } from "../../functions/getValueFromJwt";
import { AddAdminModal } from "../AddAdminModal/AddAdminModal";

export const StreamerEditAdmins = ({ id }: IStreamerDetailsViewer) => {
  const { data: admins, isLoading, error, refetch } = useGetAdminsQuery(id);
  const [
    addAdmin,
    { isLoading: addingAdmin, error: addAdminError, reset: resetAdminError },
  ] = useAddAdminsMutation();
  const adminErrorText = handleError(addAdminError);
  const { errorText, setErrorText } = useQueryError(error);
  const [showModal, setShowModal] = useState(false);
  const [adminId, setAdmniId] = useState("");
  const onAdd = () => {
    addAdmin({ adminId, streamerId: id })
      .unwrap()
      .then(() => {
        refetch();
        setShowModal(false);
      });
  };
  return (
    <div className="streamer-edit__admins">
      {showModal && (
        <AddAdminModal
          onSubmit={onAdd}
          value={adminId}
          setValue={setAdmniId}
          onClose={() => setShowModal(false)}
        ></AddAdminModal>
      )}
      {
        <Details
          isLoading={(!admins && isLoading) || addingAdmin}
          error={errorText || adminErrorText}
          onClose={() => {
            setErrorText(undefined);
            resetAdminError();
          }}
        ></Details>
      }
      <span
        className="details-text streamer-edit__admins-header details-text_add"
        style={{ marginInline: "20px" }}
      >
        Администраторы канала
      </span>
      <div className="streamer-edit__admins-body">
        {getNameId() == id && (
          <AddButton
            text="Добавить администратора"
            onClick={() => setShowModal(true)}
          ></AddButton>
        )}

        <div
          className="line"
          style={{ marginLeft: "20px", width: "calc(100% - 20px)" }}
        ></div>
        {admins?.map((t, i) => (
          <UserView
            name={t.firstName}
            detailsText="Админ"
            id={i}
            img={t.imageUrl}
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
