import img from "/img.png";
import "./CreatePostFilePicker.scss";
import { useRef, useState } from "react";
export const CreatePostFilePicker = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
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
