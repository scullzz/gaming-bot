import DatePicker from "react-datepicker";

interface ICreateRaffleEndPicker {
  date: Date;
  setDate: (v: Date) => void;
  time: string;
  setTime: (time: string) => void;
}

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
