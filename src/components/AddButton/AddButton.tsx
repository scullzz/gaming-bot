import "./AddButton.scss";
interface AddButtonProps {
  text: string;
}
export const AddButton = ({ text }: AddButtonProps) => {
  return (
    <button className="add-button">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="10" stroke="#007AFF" stroke-width="2" />
        <rect x="10" y="5" width="2" height="12" rx="1" fill="#007AFF" />
        <rect
          x="17"
          y="10"
          width="2"
          height="12"
          rx="1"
          transform="rotate(90 17 10)"
          fill="#007AFF"
        />
      </svg>
      <span className="add-button__text">{text}</span>
    </button>
  );
};
