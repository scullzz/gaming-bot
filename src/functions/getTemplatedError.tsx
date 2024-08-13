import { ProblemDetails } from "../types/ProblemDetails";

export const getTemplatedError = (error: ProblemDetails) => {
  let message = "";
  if (error.title != undefined) message = message.concat(`${error.title}\n`);
  if (error.detail != undefined) message = message.concat(`${error.detail}\n`);
  if (error.errors != undefined) {
    for (let i = 0; i < error.errors.length; i++) {
      message = `${message.concat(keyValueToString(error.errors[i]))}\n`;
    }
  }
  return message;
};
export function keyValueToString(obj: { [key: string]: any }): string {
  let result = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result += `${key}:${obj[key]}`;
    }
  }
  return result;
}
