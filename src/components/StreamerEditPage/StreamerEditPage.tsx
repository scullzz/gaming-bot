import { useNavigate, useParams } from "react-router-dom";
import { StreamerEditAdmins } from "../StreamerEditAdmins/StreamerEditAdmins";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import { StreamerSocialsAdding } from "../StreamerSocialsAdding/StreamerSocialsAdding";
import "./StreamerEditPage.scss";
import { StreamerEditAddedSocials } from "../StreamerEditAddedSocials/StreamerEditAddedSocials";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { useGetStreamerQuery } from "../../features/api";
import { getNameId } from "../../functions/getValueFromJwt";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";

export const StreamerEditPage = () => {
  const { id } = useParams();
  const userId = getNameId();
  const navigate = useNavigate();
  const {
    data: streamer,
    isLoading,
    error,
  } = useGetStreamerQuery({ tgId: id || "", userId });
  const { errorText, setErrorText } = useQueryError(error);
  const goToCover = () => navigate(`/streamer/${id}`);
  if (!id) return <div>Not found</div>;
  return (
    <div className="section streamer-edit">
      <Details
        isLoading={isLoading && !streamer}
        error={errorText}
        onClose={() => setErrorText(undefined)}
      ></Details>
      <SectionHeader
        center={<span>Профиль</span>}
        right={<span onClick={goToCover}>Готово</span>}
        left={<span onClick={goToCover}>Отмена</span>}
      ></SectionHeader>
      <div className="mt" style={{ minHeight: "31px" }}></div>
      <StreamerPreview
        name={streamer?.name || "Стример"}
        isLive={false}
      ></StreamerPreview>
      <StreamerEditAdmins id={id}></StreamerEditAdmins>
      <StreamerSocialsAdding id={id}></StreamerSocialsAdding>
      <StreamerEditAddedSocials id={id}></StreamerEditAddedSocials>
    </div>
  );
};
