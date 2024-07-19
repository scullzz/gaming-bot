import img from "/img.png";
import "./CreatePostFilePicker.scss";
import { useRef } from "react";
import { IParameterPickerElementProps } from "../CreateRaffle/CreateRaffle";

export const CreatePostFilePicker = ({
  onChange,
}: IParameterPickerElementProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onChange(event.target.files[0]);
    }
  };
  return (
    <div className="create-post-file-picker">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button className="picker" onClick={handleButtonClick}>
        <img src={img} alt="" className="icon" />
        Прикрепить медиафайл
      </button>
    </div>
  );
};
