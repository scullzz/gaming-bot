import { useEffect } from "react";
import { useCheckAuthQuery, useGetAuthMutation } from "../../features/api";
import { Spinner } from "../Spinner/Spinner";
import "./AuthChecker.scss";
import { getTgAuthData } from "../../types/getTgAuthDate";
import { useNavigate } from "react-router-dom";
export const AuthChecker = () => {
  const { isError, isSuccess } = useCheckAuthQuery();
  const navigate = useNavigate();
  const [getAuth] = useGetAuthMutation();
  useEffect(() => {
    if (isError) {
      const tgData = getTgAuthData();
      getAuth(tgData);
    }
    if (isSuccess) navigate("/streamers");
  }, [isError]);
  return (
    <div className="auth-checker">
      <Spinner></Spinner>
    </div>
  );
};
