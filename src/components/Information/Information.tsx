import { Spinner } from "../Spinner/Spinner";
import "./Information.scss";
interface IInformationProps {
  isLoading?: boolean;
  error?: string;
}

export const Information = ({ isLoading, error }: IInformationProps) => {
  return (
    <div className="info">
      {isLoading && <Spinner></Spinner>}
      {error && <span className="label-text label-text-error">{error}</span>}
    </div>
  );
};
