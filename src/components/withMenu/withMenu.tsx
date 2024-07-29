import React, { useEffect, useState } from "react";
import { Menu } from "../Menu/Menu";
import "./withMenu.scss";
import { useLocation } from "react-router-dom";
import { useDisableBounces } from "../../functions/useDisableScroll";
import useApplyTelegramTheme from "../../functions/useApplyTelegramTheme";
export const WithMenu = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const elem = document.querySelector(".footer") as HTMLDivElement;
    if (elem != null) setHeight(elem.offsetHeight);
    const root = document.querySelector("#root") as HTMLDivElement;
    root.style.paddingBottom = `${height}px`;
  }, [location]);
  useApplyTelegramTheme();
  return (
    <>
      {children}
      <Menu></Menu>
    </>
  );
};
