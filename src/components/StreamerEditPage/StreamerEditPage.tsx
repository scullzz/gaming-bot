import { useParams } from "react-router-dom";
import { StreamerEditAdmins } from "../StreamerEditAdmins/StreamerEditAdmins";
import { StreamerPreview } from "../StreamerPreview/StreamerPreview";
import { StreamerSocialsAdding } from "../StreamerSocialsAdding/StreamerSocialsAdding";
import "./StreamerEditPage.scss";
import { StreamerEditAddedSocials } from "../StreamerEditAddedSocials/StreamerEditAddedSocials";
import { ParticipiantErrorModal } from "../ParticipiantModalError/ParticipiantErrorModal";
import { SectionHeader } from "../SectionHeader/SectionHeader";

export const StreamerEditPage = () => {
  const { id } = useParams();
  if (!id) return <div>Not found</div>;
  return (
    <div className="section streamer-edit">
      {/* <ParticipiantErrorModal
        conditions={[
          { isDone: true, description: "Сделать 100 отжиманий" },
          { isDone: false, description: "Уйти" },
        ]}
        onClose={() => {}}
        onBlank={() => {}}
      ></ParticipiantErrorModal> */}
      <SectionHeader
        center="Профиль"
        right="Готово"
        left="Отмена"
      ></SectionHeader>
      <div className="mt" style={{ minHeight: "31px" }}></div>
      <StreamerPreview name="Mellstroy" isLive={false}></StreamerPreview>
      <StreamerEditAdmins id={id}></StreamerEditAdmins>
      <StreamerSocialsAdding></StreamerSocialsAdding>
      <StreamerEditAddedSocials></StreamerEditAddedSocials>
    </div>
  );
};
