import "./Spinner.scss";
interface ILoaderProps {
  size?: number;
}

export const Spinner = ({ size }: ILoaderProps) => {
  return (
    <div
      className="lds-roller"
      style={{ width: `${size || 50}px`, height: `${size || 50}px` }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
