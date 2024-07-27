import React, { useEffect, useState } from "react";
import { Menu } from "../Menu/Menu";
import "./withMenu.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { tg } from "../../App";
export const WithMenu = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const elem = document.querySelector(".footer") as HTMLDivElement;
    if (elem != null) setHeight(elem.offsetHeight);
  }, [location]);
  const navigate = useNavigate();
  useEffect(() => {
    const onClick = () => navigate(-1);
    tg.BackButton.onClick(onClick).show();
    tg.expand();
  }, []);
  useEffect(() => {
    const streamersEl = document.querySelector(
      ".layout-wrapper"
    ) as HTMLDivElement;
    const layoutEl = document.querySelector(".layout") as HTMLDivElement;
    const onScroll = (e) => e.preventDefault();
    streamersEl.addEventListener("touchmove", onScroll, { passive: false });
    layoutEl.addEventListener("touchmove", onScroll, { passive: false });
    return () => {
      streamersEl.removeEventListener("touchmove", onScroll);
      layoutEl.removeEventListener("touchmove", onScroll);
    };
  }, []);
  return (
    <div className="layout">
      <div
        className="layout-wrapper"
        style={{ minHeight: `calc(100% - ${height}px)` }}
      >
        {children}
        <div className="something"></div>
      </div>
      <Menu></Menu>
    </div>
  );
};
