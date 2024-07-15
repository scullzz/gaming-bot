import { GetSubscriberDto } from "../types/getSubscriberDto";
import { IUserViewProps } from "../components/UserView/UserView";
import { getFullName } from "./getNameFromTgName";

export const mapSubscriberToUserView = (
  sub: GetSubscriberDto
): IUserViewProps => {
  return {
    name: getFullName(sub.firstName, sub.lastName),
    id: sub.tgId,
    detailsText: sub.subscribeTime,
    withLine: false,
  };
};
