import { useEffect, useState } from "react";
import { handleError } from "./handleError";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const useQueryError = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  const [errorText, setErrorText] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (error) setErrorText(handleError(error));
  }, [error]);
  return { errorText, setErrorText };
};
