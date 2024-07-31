import { InputHTMLAttributes, useEffect, useRef } from "react";
import question from "/question.svg";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  withLine?: boolean;
}

export const FormInput = ({ withLine, ...rest }: IFormInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onfocus = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
      };
    }
  }, []);
  useEffect(() => {
    if (inputRef.current) {
      if (rest.value != null && rest.value !== undefined && rest.value != "") {
        inputRef.current.style.color = "var(--text-color)";
      } else {
        inputRef.current.style.color = "#c8c8cd";
      }
    }
  }, [rest.value]);
  return (
    <div className="form__cell">
      <div className="info">
        <input type="text" {...rest} ref={inputRef} />
        <img src={question} alt="" className="icon" />
      </div>
      {withLine && <div className="line"></div>}
    </div>
  );
};
