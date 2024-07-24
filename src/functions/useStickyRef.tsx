import { useRef } from "react";
import { useDoubleStickyScroll, useStickyScroll } from "./useStickyScroll";

export const useStickyRef = () => {
  const stickyRef = useRef<HTMLDivElement | null>(null);
  useStickyScroll(stickyRef);
  return stickyRef;
};

export const useDoubleStickyRef = () => {
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const second = useRef<HTMLDivElement | null>(null);
  useDoubleStickyScroll(stickyRef, second);

  return [stickyRef, second] as const;
};
