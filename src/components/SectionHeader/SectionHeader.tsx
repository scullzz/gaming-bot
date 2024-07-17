import "./SectionHeader.scss";
interface IHeaderProps {
  left?: string;
  center?: string;
  right?: string;
}

export const SectionHeader = ({ center, left, right }: IHeaderProps) => {
  return (
    <div className="section-header">
      <span className="left">{left}</span>
      <span className="center">{center}</span>
      <span className="right">{right}</span>
    </div>
  );
};
