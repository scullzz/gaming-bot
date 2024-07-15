import { useParams } from "react-router-dom";
import { StreamerEditAdmins } from "../StreamerEditAdmins/StreamerEditAdmins";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import { StreamerSocialsAdding } from "../StreamerSocialsAdding/StreamerSocialsAdding";
import "./StreamerEditPage.scss";
import { StreamerEditAddedSocials } from "../StreamerEditAddedSocials/StreamerEditAddedSocials";

export const StreamerEditPage = () => {
  const { id } = useParams();
  if (!id) return <div>Not found</div>;
  return (
    <div className="section streamer-edit">
      <StreamerPreview name="Mellstroy" isLive={false}></StreamerPreview>
      <StreamerEditAdmins id={id}></StreamerEditAdmins>
      <StreamerSocialsAdding></StreamerSocialsAdding>
      <StreamerEditAddedSocials></StreamerEditAddedSocials>
    </div>
  );
};
