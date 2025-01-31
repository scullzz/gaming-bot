import React, { useEffect, useState } from "react";
import { Menu } from "../Menu/Menu";
import "./withMenu.scss";
import { useLocation } from "react-router-dom";
import useApplyTelegramTheme from "../../functions/useApplyTelegramTheme";

export const WithMenu = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  useEffect(() => {
    const elem = document.querySelector(".footer") as HTMLDivElement;
    if (elem != null) {
      const section = document.querySelector(".section") as HTMLDivElement;
      if (section != null) {
        section.style.minHeight = `calc(100vh - ${elem.offsetHeight}px)`;
        const padding = location.pathname == "/streamers" ? 0 : 15;
        section.style.paddingBottom = `${elem.offsetHeight + padding}px`;
      }
    }
  }, [location]);
  useApplyTelegramTheme();

  return (
    <>
      {children}
      <Menu></Menu>
    </>
  );
};
