import { useState } from "react";
import "./CreateRaffleConditions.scss";
import checker from "/correct.png";

const templates = [1, 2, 3];

export const CreateRaffleConditions = () => {
  return (
    <ul className="create-raffle__conditions">
      {templates.map((t) => (
        <SingleRaffleCondition></SingleRaffleCondition>
      ))}
    </ul>
  );
};

const SingleRaffleCondition = () => {
  const [isDone, setDone] = useState(false);
  return (
    <li onClick={() => setDone((prev) => !prev)}>
      <div className="main">
        <div className={`checker ${isDone ? "checker_checked" : ""}`}>
          {isDone && <img src={checker} alt="" className="icon" />}
        </div>
        <span className="text">Email for talk</span>
      </div>
      <div className="line"></div>
    </li>
  );
};
