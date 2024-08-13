import "./Spinner.scss";
interface ILoaderProps {
  size?: number;
  style?: React.CSSProperties;
}

export const Spinner = ({ size, style }: ILoaderProps) => {
  return (
    <div
      className="lds-roller"
      style={{ ...style, width: `${size || 50}px`, height: `${size || 50}px` }}
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
