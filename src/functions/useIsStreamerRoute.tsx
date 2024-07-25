import { useLocation } from "react-router-dom";

export const useIsStreamersRoute = () => {
  const location = useLocation();
  return location.pathname === "/streamers";
};
