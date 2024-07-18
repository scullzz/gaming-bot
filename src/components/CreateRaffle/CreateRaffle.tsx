import { CreateRaffleWinnerCount } from "../CreateRaffleWinnerCount/CreateRaffleWinnerCount";

import { CreateRaffleConditions } from "../CreateRaffleConditions/CreateRaffleConditions";
import "./CreateRaffle.scss";

import "react-datepicker/dist/react-datepicker.css";
import { CreateRaffleEndPicker } from "../CreateRaffleEndPicker/CreateRaffleEndPicker";
import { Checker } from "../Checker/Checker";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { useState } from "react";
import { useCreateRaffleMutation } from "../../features/api";
import { handleError } from "../../functions/handleError";
import { combineDateTimeToUTC } from "../../functions/combineDateAndTimeInUTC";
import { getNameId } from "../../functions/getValueFromJwt";
import { useNavigate } from "react-router-dom";
import { Details } from "../Details/Details";
import { GetRaffleDto } from "../../types/getRaffleDto";

export interface IParameterPickerElementProps {
  value: any;
  onChange: (value: any) => void;
}

export const CreateRaffle = () => {
  const [amountOfWinners, setAmountOfWinners] = useState(4);
  const [showWinners, setShowWinners] = useState(false);
  const id = getNameId();
  const [raffleConditions, setRaffleConditions] = useState<string[]>([]);
  const [shouldNotifyUsers, setShouldNotifyUsers] = useState(false);

  const [description, setDescription] = useState<string | null>(null);

  const [time, setTime] = useState("12:00");
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();
  const [
    createRaffle,
    { isLoading: raffleCreating, error: raffleError, reset: resetRaffleError },
  ] = useCreateRaffleMutation();
  const raffleErrorText = handleError(raffleError);
  const onStart = () => {
    createRaffle({
      amountOfWinners,
      showWinners,
      description: description || "",
      endTime: combineDateTimeToUTC(date, time),
      raffleConditions: raffleConditions,
      shouldNotifyUsers,
      id,
    }).then(() => navigate(`/streamer/${id}`));
  };
  const onPreview = () => {
    const obj: GetRaffleDto = {
      amountOfParticipants: 999,
      amountOfWinners: amountOfWinners,
      description: description || "",
      endTime: combineDateTimeToUTC(date, time),
      id: 1,
      isCreator: false,
      isParticipant: false,
      raffleConditions: raffleConditions.map((t) => ({
        isDone: false,
        description: "Уточнение..",
        title: t,
      })),
    };
    navigate("/raffle-preview", {
      state: { prize: obj },
    });
  };
  return (
    <div className="create-raffle section">
      <Details
        isLoading={raffleCreating}
        error={raffleErrorText}
        onClose={() => resetRaffleError()}
      ></Details>
      <SectionHeader left={<span>Закрыть</span>}></SectionHeader>
      <div className="mt" style={{ minHeight: "31px" }}></div>
      <span className="create-raffle__header">Создать розыгрыш</span>

      <CreateRaffleWinnerCount
        value={amountOfWinners}
        onChange={setAmountOfWinners}
      ></CreateRaffleWinnerCount>
      <div className="create-raffle__details details-text details-text_add">
        Выберите, сколько победителей должно быть определено в розыгрыше.
      </div>
      <Checker value={showWinners} onChange={setShowWinners}></Checker>
      <div className="create-raffle__details details-text details-text_add">
        Выберите, будет ли по окончании розыгрыша опубликован список
        победителей.
      </div>
      <div
        className="create-raffle__header-label"
        style={{ marginTop: "14px" }}
      >
        Условия участия
      </div>
      <CreateRaffleConditions
        value={raffleConditions!}
        onAdd={(v) => setRaffleConditions((prev) => [...prev!, v])}
        onRemove={(v) =>
          setRaffleConditions((prev) => prev.filter((s) => s != v))
        }
      ></CreateRaffleConditions>
      <div className="create-raffle__details details-text details-text_add">
        Выберите, какие поля должны быть заполнены у вашего подписчика для
        участия в розыгрыше.
      </div>
      <span
        className="create-raffle__header-label"
        style={{ marginTop: "30px" }}
      >
        Описание розыгрыша
      </span>
      <textarea
        className="create-raffle__textarea"
        placeholder="Описание"
        value={description || undefined}
        onInput={(e) => setDescription(e.currentTarget.value)}
      ></textarea>
      <div
        className="create-raffle__header-label"
        style={{ marginTop: "30px" }}
      >
        Дата окончания розыгрыша
      </div>
      <CreateRaffleEndPicker
        time={time}
        date={date}
        setDate={setDate}
        setTime={setTime}
      ></CreateRaffleEndPicker>
      <div className="create-raffle__details details-text details-text_add">
        Выберите дату и время, когда будут определены случайным образом
        победители розыгрыша.
      </div>
      <Checker
        value={shouldNotifyUsers}
        onChange={setShouldNotifyUsers}
      ></Checker>
      <div className="create-raffle__details details-text details-text_add">
        Включите, если хотите чтобы все ваши подписчики получили уведомление о
        начале розыгрыша.
      </div>
      <div className="create-raffle__buttons">
        <button className="preview-btn" onClick={onPreview}>
          Предпросмотр
        </button>
        <button className="start-btn" onClick={onStart}>
          Начать розыгрыш
        </button>
      </div>
    </div>
  );
};
