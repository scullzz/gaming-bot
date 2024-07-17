import { useState } from "react";
import Switch from "react-switch";

export const Checker = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };
  return (
    <div className="create-raffle__winner-generator-slider">
      <span>Показывать победителей:</span>
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
  );
};
