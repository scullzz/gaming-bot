import "./SectionHeader.scss";
interface IHeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export const SectionHeader = ({ center, left, right }: IHeaderProps) => {
  return (
    <div className="section-header">
      {left}
      {center}
      {right}
    </div>
  );
};
