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
        scrollableEl.current.style.overscrollBehavior = "none";
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
        elems
          .map((s) => s as HTMLDivElement)
          .forEach(
            (s) =>
              (s.style.cssText =
                "-webkit-overflow-scrolling: touch;transform: translateZ(0);overscroll-behavior: none;")
          );
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
    const timerId = setInterval(() => {
      const overflow = 100;
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
      const root = document.querySelector("#root") as HTMLDivElement;
      root.style.overflow = "hidden";
      document.body.style.marginTop = `${overflow}px`;
      document.body.style.height = window.innerHeight + overflow + "px";
      document.body.style.paddingBottom = `${overflow}px`;
      window.scrollTo(0, overflow);
    }, 50);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  useEffect(() => {
    const preventScroll = (e) => {
      if (
        e.target === document.body ||
        e.target === document.documentElement ||
        e.target.id === "root"
      ) {
        e.preventDefault();
      }
    };

    document.body.addEventListener("scroll", preventScroll, { passive: false });
    document.documentElement.addEventListener("scroll", preventScroll, {
      passive: false,
    });
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.addEventListener("scroll", preventScroll, { passive: false });
    }

    return () => {
      document.body.removeEventListener("scroll", preventScroll);
      document.documentElement.removeEventListener("scroll", preventScroll);
      if (rootElement) {
        rootElement.removeEventListener("scroll", preventScroll);
      }
    };
  }, []);
};
