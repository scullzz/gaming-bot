import { useEffect } from "react";
import { useCheckAuthQuery, useGetAuthMutation } from "../../features/api";
import { Spinner } from "../Spinner/Spinner";
import "./AuthChecker.scss";
import { getTgAuthData } from "../../types/getTgAuthDate";
import { useNavigate } from "react-router-dom";
import { tg } from "../../App";
export const AuthChecker = () => {
  const { isSuccess } = useCheckAuthQuery();
  const navigate = useNavigate();
  const [getAuth] = useGetAuthMutation();
  useEffect(() => {
    const onClick = () => navigate("/streamers");
    tg.BackButton.onClick(onClick).show();
    tg.expand();
  }, []);
  /*  useEffect(() => {
    if (isSuccess) navigate("/streamers");
    const tgData = getTgAuthData();
    let timer = setInterval(() => {
      getAuth(tgData)
        .unwrap()
        .then(() => navigate("/streamers"));
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []); */
  return (
    <div className="auth-checker" style={{ overflowX: "scroll" }}>
      <span>{tg.initData}</span>
      <Spinner></Spinner>
    </div>
  );
};
