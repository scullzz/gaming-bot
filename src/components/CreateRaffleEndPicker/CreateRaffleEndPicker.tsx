import { setDefaultLocale } from "react-datepicker";
import "./CreateRaffleEndPicker.scss";
interface ICreateRaffleEndPicker {
  date: string;
  setDate: (v: string) => void;
  time: string;
  setTime: (time: string) => void;
}
export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  return `${day}.${month}.${year}`;
};

export const CreateRaffleEndPicker = ({
  time,
  date,
  setDate,
  setTime,
}: ICreateRaffleEndPicker) => {
  return (
    <div className="create-raffle__end">
      <span>Завершится</span>
      <div className="create-raffle__time">
        <div className="input-wrapper">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="fake-input">
            {formatDate(new Date(date)) || "dd.MM.yy"}
          </div>
        </div>
        <div className="input-wrapper">
          <input
            type="time"
            placeholder="HH:mm"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <div className="fake-input">{time || "HH:mm"}</div>
        </div>
      </div>
    </div>
  );
};
