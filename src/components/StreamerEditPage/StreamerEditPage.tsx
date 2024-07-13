import { StreamerEditAdmins } from "../StreamerEditAdmins/StreamerEditAdmins";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import { StreamerSocialsAdding } from "../StreamerSocialsAdding/StreamerSocialsAdding";
import "./StreamerEditPage.scss";

export const StreamerEditPage = () => {
  return (
    <div className="section streamer-edit">
      <StreamerPreview name="Mellstroy"></StreamerPreview>
      <StreamerEditAdmins></StreamerEditAdmins>
      <StreamerSocialsAdding></StreamerSocialsAdding>
    </div>
  );
};
