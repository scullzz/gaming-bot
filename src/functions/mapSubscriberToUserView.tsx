import { GetSubscriberDto } from "../types/getSubscriberDto";
import { IUserViewProps } from "../components/UserView/UserView";
import { getFullName } from "./getNameFromTgName";
import { formatRaffleDate } from "./formatRaffleDate";

export const mapSubscriberToUserView = (
  sub: GetSubscriberDto
): IUserViewProps => {
  return {
    name: getFullName(sub.firstName, sub.lastName),
    id: sub.tgId,
    detailsText: `Подписан с ${formatRaffleDate(sub.subscribeTime)}`,
    withLine: false,
  };
};
