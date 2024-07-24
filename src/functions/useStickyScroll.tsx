import React, { useEffect } from "react";

export const useStickyScroll = (
  scrollableEl: React.MutableRefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const overflow = 100;
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflowY = "hidden";
    document.body.style.marginTop = `${overflow}px`;
    document.body.style.height = window.innerHeight + overflow + "px";
    document.body.style.paddingBottom = `${overflow}px`;
    window.scrollTo(0, overflow);
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
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
      document.body.style.marginTop = `${0}px`;
      document.body.style.height = window.innerHeight + 0 + "px";
      document.body.style.paddingBottom = `${0}px`;
      document.documentElement.removeEventListener("touchstart", onTouchStart);
      document.documentElement.removeEventListener("touchmove", onTouchMove);
    };
  }, [scrollableEl]);
};

export const useDoubleStickyScroll = (
  scrollableEl: React.MutableRefObject<HTMLDivElement | null>,
  scrollableSecond: React.MutableRefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const overflow = 100;
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflowY = "hidden";
    document.body.style.marginTop = `${overflow}px`;
    document.body.style.height = window.innerHeight + overflow + "px";
    document.body.style.paddingBottom = `${overflow}px`;
    window.scrollTo(0, overflow);
    let ts: number | undefined;
    const onTouchStart = (e: TouchEvent) => {
      ts = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (scrollableEl.current && scrollableSecond.current) {
        const scroll = scrollableEl.current.scrollTop;
        const scroll2 = scrollableSecond.current.scrollTop;
        const te = e.changedTouches[0].clientY;
        if (scroll <= 0 && ts! < te && scroll2 <= 0) {
          e.preventDefault();
        }
      } else {
        alert("??");
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
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
      document.body.style.marginTop = `${0}px`;
      document.body.style.height = window.innerHeight + 0 + "px";
      document.body.style.paddingBottom = `${0}px`;
      document.documentElement.removeEventListener("touchstart", onTouchStart);
      document.documentElement.removeEventListener("touchmove", onTouchMove);
    };
  }, [scrollableEl]);
};
