import { useRef } from "react";
import { useStickyScroll } from "./useStickyScroll";

export const useStickyRef = () => {
  const stickyRef = useRef<HTMLDivElement | null>(null);
  useStickyScroll(stickyRef);
  return stickyRef;
};
