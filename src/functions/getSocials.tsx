import { SocialItemProps } from "../components/SocialItem/SocialItem";
import { Social } from "../types/social";
import exit from "/exit.svg";
import burger from "/burger.svg";
import { tg } from "../App";
const removeSocialsDuplicates = (items: Social[]): Social[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.name)) {
      return false;
    } else {
      seen.add(item.name);
      return true;
    }
  });
};
export const getSocials = (
  socials: Social[],
  onExtend: () => void,
  unsunscribe?: () => void
): SocialItemProps[] => {
  socials = removeSocialsDuplicates(socials);
  const preview = socials.slice(0, 2);
  const end = socials.slice(2);
  let result: SocialItemProps[] = [
    ...preview.map((t) => ({
      text: t.name,
      url: `/${t.name.toLowerCase()}.svg`,
      onClick: () => tg.openLink(`${t.link}`),
    })),
  ];

  if (socials.length === 3) {
    result.push({
      text: socials[2].name,
      url: `/${socials[2].name.toLowerCase()}.svg`,
      onClick: () => tg.openLink(socials[2].link),
    });
  }

  if (unsunscribe) {
    result.push({
      text: "Отписаться",
      url: exit,
      onClick: unsunscribe,
    });
  }

  if (socials.length > 3) {
    result.push({
      text: "Ещё",
      url: burger,
      onClick: onExtend,
    });
  }

  /* if (socials.length > 2) {
    result = [
      ...result,
      ...end.map((t) => ({
        text: t.name,
        url: `/${t.name.toLowerCase()}.svg`,
        onClick: () => tg.openLink(t.link),
      })),
    ];
  } */

  return result;
};
export const getFullSocials = (socials: Social[]) => {
  let result: SocialItemProps[] = [
    ...socials.map((t) => ({
      text: t.name,
      url: `/${t.name.toLowerCase()}.svg`,
      onClick: () => tg.openLink(`${t.link}`),
    })),
  ];
  return result;
};
