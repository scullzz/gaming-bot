import { useLayoutEffect, useState } from "react";
import { getValueFromJWT } from "./getValueFromJwt";

export const useCheckStreamerYourself = (id: string) => {
  const [isStreamerYourself, setIsStreamer] = useState(false);
  useLayoutEffect(() => {
    const nameId = getValueFromJWT("NameId");
    if (nameId === id) setIsStreamer(true);
  }, []);
  return isStreamerYourself;
};
