interface ICreateRaffleEndPicker {
  date: string;
  setDate: (v: string) => void;
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
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="дд.мм.гг"
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
