import { AddedSocialView } from "../AddedSocialView/AddedSocialView";
import "./StreamerEditAddedSocials.scss";
export const StreamerEditAddedSocials = () => {
  return (
    <div className="streamer-edit__added-socials">
      <span
        className="details-text streamer-edit__admins-header details-text_add"
        style={{ marginInline: "20px" }}
      >
        Добавленные cсылки на соцсети
      </span>
      <div className="streamer-edit__added-socials-body">
        {[1].map((t) => (
          <AddedSocialView></AddedSocialView>
        ))}
      </div>
    </div>
  );
};
