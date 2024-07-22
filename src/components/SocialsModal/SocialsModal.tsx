import "./SocialsModal.scss";
import { DefaultModalProps, ModalWindow } from "../ModalWindow/ModalWinodw";
import { Social } from "../../types/social";
import { getFullSocials } from "../../functions/getSocials";
import { SocialItem } from "../SocialItem/SocialItem";
interface ISocialsModalProps extends Omit<DefaultModalProps, "children"> {
  socials: Social[] | undefined;
}
export const SocialsModal = ({ socials, ...rest }: ISocialsModalProps) => {
  const items = getFullSocials(socials || []);
  return (
    <ModalWindow {...rest}>
      <div className="socials-modal">
        {items.map((t, i) => (
          <SocialItem {...t} key={i}></SocialItem>
        ))}
      </div>
    </ModalWindow>
  );
};
