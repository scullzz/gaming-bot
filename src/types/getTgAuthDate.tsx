import { tg } from "../App";
import { TelegramAuthDateDto } from "./TelegramAuthDateDto";

export const getTgAuthData = () => {
  let data = tg.initData;

  let parts = data.split("&");

  let result: any = {};

  parts.forEach(function (part) {
    var keyValue = part.split("=");
    var key = keyValue[0];
    var value = decodeURIComponent(keyValue[1]);

    if (key === "user") {
      result[key] = JSON.stringify(JSON.parse(value));
    } else {
      result[key] = value;
    }
  });
  return result as TelegramAuthDateDto;
};
