import { useLayoutEffect, useState } from "react";
import { getNameId } from "./getValueFromJwt";
import { GetAdminDto } from "../types/getAdminDto";

export const useCheckStreamerYourself = (
  id: string,
  admins: GetAdminDto[] | undefined
) => {
  const [isStreamerYourself, setIsStreamer] = useState(false);
  useLayoutEffect(() => {
    const nameId = getNameId();
    if (nameId === id || (admins && admins.map((a) => a.tgId).includes(nameId)))
      setIsStreamer(true);
  }, [admins, id]);
  return isStreamerYourself;
};
