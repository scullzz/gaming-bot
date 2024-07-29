import { useEffect } from "react";
import { tg } from "../App";
import { useNavigate } from "react-router-dom";

const useApplyTelegramTheme = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const onClick = () => navigate(-1);
    tg.BackButton.onClick(onClick).show();
    tg.expand();
    tg.disableVerticalSwipes();
    tg.enableClosingConfirmation();
    tg.setHeaderColor("#fff");
    tg.setBackgroundColor("#fff");
    const id = setInterval(() => {
      if (tg.isVerticalSwipesEnabled) alert("Ошибка");
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
};

export default useApplyTelegramTheme;
