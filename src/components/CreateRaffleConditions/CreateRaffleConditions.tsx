import { useEffect, useState } from "react";
import "./CreateRaffleConditions.scss";
import checker from "/correct.png";
import { Details } from "../Details/Details";
import { useGetAvailableConditionsQuery } from "../../features/api";
import { useQueryError } from "../../functions/useQueryError";

interface ICreateRaffleConditionsProps {
  value: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
}

export const CreateRaffleConditions = ({
  value,
  onAdd,
  onRemove,
}: ICreateRaffleConditionsProps) => {
  const {
    data: availableRaffleConditions,
    isLoading: conditionsLoading,
    error: conditionsError,
  } = useGetAvailableConditionsQuery();
  const { errorText: conditionsEt, setErrorText: setCeT } =
    useQueryError(conditionsError);
  useEffect(() => {
    if (availableRaffleConditions && availableRaffleConditions.length > 0)
      onAdd(availableRaffleConditions[0]);
  }, [availableRaffleConditions]);
  return (
    <>
      <Details
        isLoading={!availableRaffleConditions && conditionsLoading}
        error={conditionsEt}
        onClose={() => {
          setCeT(undefined);
        }}
      ></Details>
      <ul className="create-raffle__conditions">
        {availableRaffleConditions?.map((t, i) => (
          <SingleRaffleCondition
            key={i}
            on={value.includes(t)}
            onClick={value.includes(t) ? () => onRemove(t) : () => onAdd(t)}
          ></SingleRaffleCondition>
        ))}
      </ul>
    </>
  );
};

interface ISingleRaffleConditionProps {
  on: boolean;
  onClick: () => void;
}

const SingleRaffleCondition = ({
  on,
  onClick,
}: ISingleRaffleConditionProps) => {
  return (
    <li onClick={onClick}>
      <div className="main">
        <div className={`checker ${on ? "checker_checked" : ""}`}>
          {on && <img src={checker} alt="" className="icon" />}
        </div>
        <span className="text">Email for talk</span>
      </div>
      <div className="line"></div>
    </li>
  );
};
