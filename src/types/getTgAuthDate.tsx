import { tg } from "../App";
import { AuthRequest } from "./authRequest";

export const getTgAuthData = (): AuthRequest => {
  let data = tg.initData;

  return { hash: data };
};
