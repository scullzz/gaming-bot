import { HTMLAttributes, useEffect, useRef } from "react";

interface ITextBoxProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextBox = ({ ...rest }: ITextBoxProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    const minHeight = 80;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.minHeight = `${minHeight}px`;
      if (textarea.scrollHeight > minHeight)
        textarea.style.minHeight = `${textarea.scrollHeight}px`;
    }
  }, [rest.value]);
  return <textarea {...rest} ref={textareaRef} rows={1}></textarea>;
};
