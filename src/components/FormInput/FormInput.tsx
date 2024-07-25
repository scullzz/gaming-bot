import { InputHTMLAttributes } from "react";
import question from "/question.svg";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  withLine?: boolean;
}

export const FormInput = ({ withLine, ...rest }: IFormInputProps) => {
  return (
    <div className="form__cell">
      <div className="info">
        <input type="text" {...rest} />
        <img src={question} alt="" className="icon" />
      </div>
      {withLine && <div className="line"></div>}
    </div>
  );
};
