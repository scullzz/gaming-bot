import copy from "/copy.png";
import "./SubscriberProfileInfo.scss";

export const SubscriberProfileInfo = ({
  obj,
}: {
  obj: { [key: string]: [boolean, string] };
}) => {
  const objKeys = Object.keys(obj).filter((l) => obj[l] != null);
  return (
    <ul className="subscriber-profile__info">
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
      navigator.clipboard.writeText(value);
    }
  };
  return (
    <li>
      <div className="info">
        <div className="main">
          <span>{label}</span>
          <span className={`${selected ? "selected" : ""}`}>{value}</span>
        </div>
        <button onClick={onClick}>
          <img src={copy} className="icon" />
          Copy
        </button>
      </div>
      {withLine && <div className="line"></div>}
    </li>
  );
};
