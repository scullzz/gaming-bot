import "./DocumentPreview.scss";
import doc from "/doc.svg";
interface IDocumentPreviewProps {
  filename: string;
}
export const DocumentPreview = ({ filename }: IDocumentPreviewProps) => {
  return (
    <div className="document-preview">
      <img src={doc} alt="" className="icon" />
      <span className="details-text">{filename}</span>
    </div>
  );
};
