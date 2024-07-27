import { useEffect } from "react";

export const useDisableScroll = (classname: string) => {
  useEffect(() => {
    const streamersEl = document.querySelector(
      `.${classname}`
    ) as HTMLDivElement;
    const onScroll = (e) => {
      console.log(e.target);
      if (e.target == streamersEl) e.preventDefault();
    };
    streamersEl.addEventListener("touchmove", onScroll, { passive: false });
    return () => {
      streamersEl.removeEventListener("touchmove", onScroll);
    };
  }, []);
};
