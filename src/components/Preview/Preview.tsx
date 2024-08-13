import "./Preview.scss";
interface IPreviewProps {
  header: string;
  children: React.ReactNode;
}
export const Preview = ({ header, children }: IPreviewProps) => {
  return (
    <div className="section raffle-preview">
      <div className="mt" style={{ minHeight: "31px" }}></div>
      <div className="raffle-preview__header">{header}</div>
      {children}
    </div>
  );
};
