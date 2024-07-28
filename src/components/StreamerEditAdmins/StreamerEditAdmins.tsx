import { useState } from "react";
import {
  useAddAdminsMutation,
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "../../features/api";
import { handleError } from "../../functions/handleError";
import { useQueryError } from "../../functions/useQueryError";
import { AddButton } from "../AddButton/AddButton";
import { Details } from "../Details/Details";
import { IStreamerDetailsViewer } from "../StreamerPage/StreamerPage";
import { UserView } from "../UserView/UserView";
import "./StreamerEditAdmin.scss";
import { getNameId } from "../../functions/getValueFromJwt";
import { AddAdminModal } from "../AddAdminModal/AddAdminModal";
import { tg } from "../../App";

export const StreamerEditAdmins = ({ id }: IStreamerDetailsViewer) => {
  const { data: admins, isLoading, error, refetch } = useGetAdminsQuery(id);
  const [
    addAdmin,
    { isLoading: addingAdmin, error: addAdminError, reset: resetAdminError },
  ] = useAddAdminsMutation();

  const adminErrorText = handleError(addAdminError);
  const [deleteAdmin, { error: deleteAdminError, reset: resetDAdminError }] =
    useDeleteAdminMutation();
  const deleteAdminErrorText = handleError(deleteAdminError);
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
  const onAdminClick = (tgId: string) => {
    setAdmniId(tgId);
    tg.showPopup(
      {
        title: "Подтверждение",
        message: `Вы уверены в удалении ${
          admins.filter((a) => a.tgId == tgId)[0].firstName
        } из админов?`,
        buttons: [
          { id: "confirm", type: "ok", text: "Ок" },
          { id: "cancel", type: "cancel", text: "Отмена" },
        ],
      },
      (buttonId) => {
        if (buttonId === "confirm") {
          deleteAdmin({ streamerId: id, adminId: tgId })
            .unwrap()
            .then(() => {
              refetch();
            });
        } else if (buttonId === "cancel") {
          console.log("Отмена нажата");
        }
      }
    );
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
          isLoading={!admins && isLoading}
          error={errorText || adminErrorText || deleteAdminErrorText}
          onClose={() => {
            setErrorText(undefined);
            resetAdminError();
            resetDAdminError();
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
          <>
            <AddButton
              text="Добавить администратора"
              onClick={() => setShowModal(true)}
            ></AddButton>
            <div
              className="line"
              style={{ marginLeft: "20px", width: "calc(100% - 20px)" }}
            ></div>
          </>
        )}
        {admins?.map((t, i) => (
          <UserView
            name={t.firstName}
            detailsText="Админ"
            id={i}
            onClick={() => onAdminClick(t.tgId)}
            img={t.imageUrl}
            style={{
              marginTop: "15px",
              marginLeft: "14px",
              width: "calc(100% - 14px)",
            }}
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
