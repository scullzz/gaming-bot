import { CreateRaffleWinnerCount } from "../CreateRaffleWinnerCount/CreateRaffleWinnerCount";

import { CreateRaffleConditions } from "../CreateRaffleConditions/CreateRaffleConditions";
import "./CreateRaffle.scss";

import "react-datepicker/dist/react-datepicker.css";
import { CreateRaffleEndPicker } from "../CreateRaffleEndPicker/CreateRaffleEndPicker";
import { Checker } from "../Checker/Checker";
import { SectionHeader } from "../SectionHeader/SectionHeader";
export const CreateRaffle = () => {
  return (
    <div className="create-raffle section">
      <SectionHeader left="Закрыть"></SectionHeader>
      <div className="mt" style={{ minHeight: "31px" }}></div>
      <span className="create-raffle__header">Создать розыгрыш</span>

      <CreateRaffleWinnerCount></CreateRaffleWinnerCount>
      <div className="create-raffle__details details-text details-text_add">
        Выберите, сколько победителей должно быть определено в розыгрыше.
      </div>
      <Checker></Checker>
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
      <CreateRaffleConditions></CreateRaffleConditions>
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
        name=""
        id=""
        className="create-raffle__textarea"
        placeholder="Описание"
      ></textarea>
      <div
        className="create-raffle__header-label"
        style={{ marginTop: "30px" }}
      >
        Дата окончания розыгрыша
      </div>
      <CreateRaffleEndPicker></CreateRaffleEndPicker>
      <div className="create-raffle__details details-text details-text_add">
        Выберите дату и время, когда будут определены случайным образом
        победители розыгрыша.
      </div>
      <Checker></Checker>
      <div className="create-raffle__details details-text details-text_add">
        Включите, если хотите чтобы все ваши подписчики получили уведомление о
        начале розыгрыша.
      </div>
      <div className="create-raffle__buttons">
        <button className="preview-btn">Предпросмотр</button>
        <button className="start-btn">Начать розыгрыш</button>
      </div>
    </div>
  );
};
