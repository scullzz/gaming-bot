import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { getTemplatedError } from "./getTemplatedError";
import { ProblemDetails } from "../types/ProblemDetails";
export function isProblemDetails(error: any): error is ProblemDetails {
  return error?.detail !== undefined;
}
export const handleError = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  const defaultMessage = "Произошла ошибка при выполнении операции";
  if (error === undefined) return undefined;
  if ("originalStatus" in error) return undefined;
  console.log(error);
  if (!("data" in error)) return defaultMessage;
  if (isProblemDetails(error.data)) {
    return getTemplatedError(error.data);
  }
  return defaultMessage;
};
