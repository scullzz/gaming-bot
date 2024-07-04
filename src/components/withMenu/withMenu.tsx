import React from "react";
import { Menu } from "../Menu/Menu";
import "./withMenu.scss";
export const WithMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <div className="layout-wrapper">{children}</div>
      <Menu></Menu>
    </div>
  );
};
