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
    const onClick = () => navigate(-1);
    tg.BackButton.onClick(onClick).show();
  }, []);
  useEffect(() => {
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
  }, []);
  return (
    <div className="auth-checker">
      <Spinner></Spinner>
    </div>
  );
};
