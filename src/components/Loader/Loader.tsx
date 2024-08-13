import { ModalWindow } from "../ModalWindow/ModalWinodw";
import { Spinner } from "../Spinner/Spinner";

export const Loader = () => {
  return (
    <ModalWindow>
      <Spinner></Spinner>
    </ModalWindow>
  );
};
