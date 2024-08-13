import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "../../features/api";
import { FormInput } from "../FormInput/FormInput";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";

import "./UserProfile.scss";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import { handleError } from "../../functions/handleError";
import { useEffect, useState } from "react";
import { GetUserPayMethod } from "../../types/getUserDto";
const TetherTRC20 = "Tether TRC20";
const TetherERC20 = "Tether ERC20";
const Piastrix = "Piastrix";
export const UserProfile = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    refetch,
  } = useGetUserQuery(id || "");
  useEffect(() => {
    setTrc(
      user?.userPayMethods.filter((t) => t.platform == TetherTRC20)[0].data
    );
    setErc(
      user?.userPayMethods.filter((t) => t.platform == TetherERC20)[0].data
    );
    setPstrx(
      user?.userPayMethods.filter((t) => t.platform == Piastrix)[0].data
    );
    setEmail(user?.email);
  }, [user]);
  const [trc, setTrc] = useState<string | null | undefined>(undefined);
  const [erc, setErc] = useState<string | null | undefined>(undefined);
  const [pstrx, setPstrx] = useState<string | null | undefined>(undefined);
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const { errorText: userErrorText, setErrorText: setUserErrorText } =
    useQueryError(userError);
  const [
    updateUser,
    { isLoading: userUpdating, error: updatingError, reset: reserUpdateError },
  ] = useUpdateUserMutation();
  const updatingErrorText = handleError(updatingError);
  const onApply = () => {
    if (user) {
      const payMethods: GetUserPayMethod[] = [
        { platform: TetherERC20, data: erc || null },
        { platform: TetherTRC20, data: trc || null },
        { platform: Piastrix, data: pstrx || null },
      ];
      updateUser({ ...user, email: email || null, userPayMethods: payMethods })
        .unwrap()
        .then(() => refetch());
    }
  };

  return (
    <div className="user-profile section">
      <Details
        isLoading={(!user && userLoading) || userUpdating}
        error={userErrorText || updatingErrorText}
        onClose={() => {
          setUserErrorText(undefined);
          reserUpdateError();
        }}
      ></Details>
      <SectionHeader
        center={<span>Профиль</span>}
        right={<span onClick={onApply}>Готово</span>}
      ></SectionHeader>
      <div className="mt" style={{ marginTop: "25px" }}></div>
      <StreamerPreview
        headerStyles={{ marginTop: "15px", lineHeight: "23px" }}
        url={user?.imageUrl}
        name={user?.firstName ?? "Пользователь"}
        isLive={false}
      ></StreamerPreview>
      <div className="user-profile__header-label" style={{ marginTop: "24px" }}>
        Платежная информация
      </div>
      <form action="" className="user-profile__form">
        <FormInput
          placeholder="Tether TRC20"
          withLine
          value={trc || undefined}
          onChange={(e) => setTrc(e.currentTarget.value)}
        ></FormInput>
        <FormInput
          placeholder="Tether ERC20"
          withLine
          value={erc || undefined}
          onChange={(e) => setErc(e.currentTarget.value)}
        ></FormInput>
        <FormInput
          placeholder="Piastrix"
          value={pstrx || undefined}
          onChange={(e) => setPstrx(e.currentTarget.value)}
        ></FormInput>
      </form>
      <span
        className="details-text details-text_add user-profile__details"
        style={{ marginTop: "8px" }}
      >
        На эти реквизиты будет отправлен приз, если вы выиграете в
        соответствующем розыгрыше. Эта информация будет доступна стримеру, на
        которого вы подписаны.
      </span>
      <div className="user-profile__header-label" style={{ marginTop: "24px" }}>
        Контактные данные
      </div>
      <form action="" className="user-profile__form">
        <FormInput
          placeholder="Email"
          value={email || undefined}
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></FormInput>
      </form>
    </div>
  );
};
