import React, { useEffect, useState } from "react";

export const useCheckImageCorrect = (url?: string | null) => {
  const [correct, setCorrect] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setCorrect(true);
    };
    image.onerror = () => {
      setCorrect(false);
    };
  }, []);
  return correct;
};
