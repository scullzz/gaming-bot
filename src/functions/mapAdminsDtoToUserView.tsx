import { GetAdminDto } from "../types/getAdminDto";
import { IUserViewProps } from "../components/UserView/UserView";
import { getFullName } from "./getNameFromTgName";

export const mapAdminsDtoToUserView = (t: GetAdminDto): IUserViewProps => {
  return {
    name: getFullName(t.firstName, t.lastName),
    id: t.tgId,
    detailsText: "Админ",
  };
};
