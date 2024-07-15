import { GetRaffleConditionDto } from "../../types/getRaffleConditionDto";
import { ModalWindow } from "../ModalWindow/ModalWinodw";
import "./ParticipiantErrorModal.scss";
import done from "/corrrect-green.png";
import notDone from "/cross-red.png";
interface ParticipiantCondition extends GetRaffleConditionDto {}
interface IParticipiantErrorModalProps {
  onBlank: () => void;
  onClose: () => void;
  conditions: ParticipiantCondition[];
}

export const ParticipiantErrorModal = ({
  onBlank,
  onClose,
  conditions,
}: IParticipiantErrorModalProps) => {
  return (
    <ModalWindow>
      <div className="participiant-error">
        <div className="participiant-error__header">
          Для участия в розыгрыше вам необходимо в профиле бота:
        </div>
        <div className="participiant-condititons">
          {conditions.map((t) => (
            <div className="participiant-condition">
              <img src={t.isDone ? done : notDone} alt="" className="icon" />
              <span className="participiant-condition__text">
                {t.description}
              </span>
            </div>
          ))}
        </div>
        <div className="participiant__buttons">
          <button className="participiant__close-button" onClick={onClose}>
            Закрыть
          </button>
          <button className="participiant__apply-button" onClick={onBlank}>
            Заполнить
          </button>
        </div>
      </div>
    </ModalWindow>
  );
};
