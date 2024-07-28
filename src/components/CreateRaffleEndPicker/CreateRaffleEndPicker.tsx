import { useRef } from "react";
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
  const dateRef = useRef<HTMLInputElement | null>(null);
  const timeRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="create-raffle__end">
      <span>Завершится</span>
      <div className="create-raffle__time">
        <input
          ref={dateRef}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="дд.мм.гг"
        />
        <input
          ref={timeRef}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
    </div>
  );
};
