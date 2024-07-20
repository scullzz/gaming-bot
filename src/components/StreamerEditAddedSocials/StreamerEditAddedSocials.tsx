import { useGetStreamerSocialsQuery } from "../../features/api";
import { useQueryError } from "../../functions/useQueryError";
import { AddedSocialView } from "../AddedSocialView/AddedSocialView";
import { Details } from "../Details/Details";
import "./StreamerEditAddedSocials.scss";
interface IStreamerEditAddedSocialsProps {
  id: string;
}
export const StreamerEditAddedSocials = ({
  id,
}: IStreamerEditAddedSocialsProps) => {
  const { data: socials, isLoading, error } = useGetStreamerSocialsQuery(id);
  const { errorText, setErrorText } = useQueryError(error);
  return (
    <div className="streamer-edit__added-socials">
      <Details
        isLoading={isLoading && !socials}
        error={errorText}
        onClose={() => setErrorText(undefined)}
      ></Details>
      <span
        className="details-text streamer-edit__admins-header details-text_add"
        style={{ marginInline: "20px" }}
      >
        Добавленные cсылки на соцсети
      </span>
      <div className="streamer-edit__added-socials-body">
        {socials?.map((t) => (
          <AddedSocialView {...t}></AddedSocialView>
        ))}
      </div>
    </div>
  );
};
