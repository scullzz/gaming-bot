import { useState } from "react";
import { CreateRaffleWinnerCount } from "../CreateRaffleWinnerCount/CreateRaffleWinnerCount";
import Switch from "react-switch";
import { CreateRaffleConditions } from "../CreateRaffleConditions/CreateRaffleConditions";
export const CreateRaffle = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };
  return (
    <div className="create-raffle section">
      <span className="create-raffle__header">Создать розыгрыш</span>

      <CreateRaffleWinnerCount></CreateRaffleWinnerCount>
      <div className="raffle-result__winner-generator-slider">
        <span>Исключить повторения:</span>
        <Switch
          onChange={handleChange}
          checked={checked}
          onColor="#35C759"
          offColor="#B0B0B0"
          onHandleColor="var(--main-color)"
          offHandleColor="var(--main-color)"
          handleDiameter={15}
          uncheckedIcon={false}
          checkedIcon={false}
          height={28}
          width={56}
          className="react-switch"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          borderRadius={20}
        />
      </div>
      <div className="create-raffle__details details-text details-text_add">
        Выберите, будет ли по окончании розыгрыша опубликован список
        победителей.
      </div>
      <div className="create-raffle__header-label">Условия участия</div>
      <CreateRaffleConditions></CreateRaffleConditions>
      <div className="create-raffle__details details-text details-text_add">
        Выберите, какие поля должны быть заполнены у вашего подписчика для
        участия в розыгрыше.
      </div>
      <span className="create-raffle__header-label">Описание розыгрыша</span>
      <textarea name="" id="" className="create-raffle__textarea"></textarea>
      <div className="create-raffle__header-label">
        Дата окончания розыгрыша
      </div>
      <div className="create-raffle__end">
        <span>Исключить повторения:</span>
        <input type="text" className="date" />
        <input type="text" className="time" />
      </div>
      <div className="create-raffle__details details-text details-text_add">
        Включите, если хотите чтобы все ваши подписчики получили уведомление о
        начале розыгрыша.
      </div>
      <div className="raffle-result__winner-generator-slider">
        <span>Оповестить всех подписчиков</span>
        <Switch
          onChange={handleChange}
          checked={checked}
          onColor="#35C759"
          offColor="#B0B0B0"
          onHandleColor="var(--main-color)"
          offHandleColor="var(--main-color)"
          handleDiameter={15}
          uncheckedIcon={false}
          checkedIcon={false}
          height={28}
          width={56}
          className="react-switch"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          borderRadius={20}
        />
      </div>
      <div className="create-raffle__details details-text details-text_add">
        Включите, если хотите чтобы все ваши подписчики получили уведомление о
        начале розыгрыша.
      </div>
      <div className="create-raffle__buttons">
        <button className="create-raffle__preview-btn">Предпросмотр</button>
        <button className="create-raffle__start-btn">Начать розыгрыш</button>
      </div>
    </div>
  );
};
