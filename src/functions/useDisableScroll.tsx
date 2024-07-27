import { useEffect } from "react";

export const useDisableScroll = (classname: string) => {
  useEffect(() => {
    const streamersEl = document.querySelector(
      `.${classname}`
    ) as HTMLDivElement;
    const canScroll = (el: HTMLElement): boolean => {
      return el.scrollHeight > el.clientHeight;
    };
    const onScroll = (e: TouchEvent) => {
      if (e.target === streamersEl) {
        e.preventDefault();
      } else {
        let target = e.target as HTMLElement;
        while (target && target !== streamersEl) {
          if (canScroll(target)) {
            return;
          }
          target = target.parentNode as HTMLElement;
        }
        e.preventDefault();
      }
    };
    streamersEl.addEventListener("touchmove", onScroll, { passive: false });
    return () => {
      streamersEl.removeEventListener("touchmove", onScroll);
    };
  }, []);
};
