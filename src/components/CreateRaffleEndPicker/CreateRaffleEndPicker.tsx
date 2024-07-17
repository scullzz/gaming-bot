import { useState } from "react";
import DatePicker from "react-datepicker";

export const CreateRaffleEndPicker = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("12:00");
  return (
    <div className="create-raffle__end">
      <span>Завершится</span>
      <div className="create-raffle__time">
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d as Date)}
          dateFormat="dd.MM.yy"
          placeholderText="дд.мм.гг"
          customInput={<input id="dateInput" />}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
    </div>
  );
};
