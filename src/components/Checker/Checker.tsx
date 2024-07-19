import Switch from "react-switch";
import { IParameterPickerElementProps } from "../CreateRaffle/CreateRaffle";

interface ICheckerProps extends IParameterPickerElementProps {
  text: string;
}

export const Checker = ({ value, onChange, text }: ICheckerProps) => {
  return (
    <div className="create-raffle__winner-generator-slider">
      <span>{text}:</span>
      <Switch
        onChange={onChange}
        checked={value}
        onColor="#35C759"
        offColor="#B0B0B0"
        onHandleColor="#fff"
        offHandleColor="#fff"
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
  );
};
