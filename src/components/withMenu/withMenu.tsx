import React, { useEffect, useState } from "react";
import { Menu } from "../Menu/Menu";
import "./withMenu.scss";
import { useLocation } from "react-router-dom";
export const WithMenu = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const elem = document.querySelector(".footer") as HTMLDivElement;
    if (elem != null) setHeight(elem.offsetHeight);
  }, [location]);
  return (
    <div className="layout">
      <div
        className="layout-wrapper"
        style={{ height: `calc(100% - ${height}px)` }}
      >
        {children}
      </div>
      <Menu></Menu>
    </div>
  );
};
