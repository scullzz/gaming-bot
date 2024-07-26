import React, { useEffect } from "react";

export const useStickyScroll = (
  scrollableEl: React.MutableRefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    let ts: number | undefined;
    const onTouchStart = (e: TouchEvent) => {
      ts = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (scrollableEl.current) {
        const scroll = scrollableEl.current.scrollTop;
        const te = e.changedTouches[0].clientY;
        if (scroll <= 0 && ts! < te) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };
    document.documentElement.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    document.documentElement.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
    return () => {
      document.documentElement.removeEventListener("touchstart", onTouchStart);
      document.documentElement.removeEventListener("touchmove", onTouchMove);
    };
  }, [scrollableEl]);
};

export const useClassnamedStickyScroll = (...classes: string[]) => {
  useEffect(() => {
    let ts: number | undefined;
    const onTouchStart = (e: TouchEvent) => {
      ts = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const elems = classes.map((s) => document.querySelector(`.${s}`));
      if (!elems.includes(null)) {
        const allScrolls = elems
          .map((s) => s as HTMLDivElement)
          .map((s) => s.scrollTop);
        const isScrooled = allScrolls.every((s) => s <= 0);
        const te = e.changedTouches[0].clientY;
        const targetNotInCollection = !elems.some(
          (elem) => elem === e.target || elem?.contains(e.target as Node)
        );
        if (isScrooled && ts! < te && targetNotInCollection) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };
    document.documentElement.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    document.documentElement.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
    return () => {
      document.documentElement.removeEventListener("touchstart", onTouchStart);
      document.documentElement.removeEventListener("touchmove", onTouchMove);
    };
  }, []);
};

export const useSetup = () => {
  useEffect(() => {
    const overflow = 100;
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflowY = "hidden";
    const root = document.querySelector("#id") as HTMLDivElement;
    root.style.overflowY = "hidden";
    document.body.style.marginTop = `${overflow}px`;
    document.body.style.height = window.innerHeight + overflow + "px";
    document.body.style.paddingBottom = `${overflow}px`;
    window.scrollTo(0, overflow);
  }, []);
};
