import { useEffect } from "react";
import { tg } from "../App";
import { useNavigate } from "react-router-dom";

const useApplyTelegramTheme = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const root = document.documentElement;
    const onClick = () => navigate(-1);
    tg.BackButton.onClick(onClick).show();
    tg.expand();
    tg.disableVerticalSwipes();
    tg.setHeaderColor("#fff");
    tg.setBackgroundColor("#fff");
    root.style.setProperty("--tg-theme-accent-text-color", "#007aff");
    root.style.setProperty("--tg-theme-button-color", "#007aff");
    root.style.setProperty("--tg-theme-link-color", "#007aff");
  }, []);
};

export default useApplyTelegramTheme;
