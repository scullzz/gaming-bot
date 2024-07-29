import React from "react";
import { Menu } from "../Menu/Menu";
import "./withMenu.scss";

import useApplyTelegramTheme from "../../functions/useApplyTelegramTheme";
export const WithMenu = ({ children }: { children: React.ReactNode }) => {
  useApplyTelegramTheme();
  return (
    <>
      {children}
      <Menu></Menu>
    </>
  );
};
