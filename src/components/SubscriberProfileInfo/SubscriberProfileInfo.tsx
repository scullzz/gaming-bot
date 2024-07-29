import copy from "/copy.svg";
import "./SubscriberProfileInfo.scss";
import { truncateValue } from "../../functions/truncateValue";
import { NotAvailable } from "../NotAvailable.tsx/NotAvailable";
import toast from "react-hot-toast";

export const SubscriberProfileInfo = ({
  obj,
  text,
}: {
  obj: { [key: string]: [boolean, string] };
  text?: string;
}) => {
  const objKeys = Object.keys(obj).filter((l) => obj[l] != null);
  return (
    <ul className="subscriber-profile__info">
      <NotAvailable
        available={objKeys.length !== 0}
        text={text || "Нет информации"}
      ></NotAvailable>
      {objKeys.map((l, i) => (
        <SingleProfileInfoEntry
          label={l}
          value={obj[l][1]}
          withLine={i !== objKeys.length - 1}
          selected={obj[l][0]}
        ></SingleProfileInfoEntry>
      ))}
    </ul>
  );
};

interface SingleProfileInfoEntryProps {
  label: string;
  value: string;
  withLine?: boolean;
  selected?: boolean;
}
const SingleProfileInfoEntry = ({
  label,
  value,
  withLine,
  selected,
}: SingleProfileInfoEntryProps) => {
  const onClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(value)
        .then((t) => toast.success("Скопировано"));
    }
  };
  const isNone = value.includes("none");
  const formattedValue = value.replace("none", "");
  return (
    <li>
      <div className="info">
        <div className="main">
          <span>{label}</span>
          <span className={`${selected ? "selected" : ""}`}>
            {truncateValue(formattedValue)}
          </span>
        </div>
        {isNone ? null : (
          <button onClick={onClick}>
            <img src={copy} className="icon" />
            Copy
          </button>
        )}
      </div>
      {withLine && <div className="line"></div>}
    </li>
  );
};
