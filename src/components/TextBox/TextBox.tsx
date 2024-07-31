import { HTMLAttributes, useEffect, useRef } from "react";

interface ITextBoxProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextBox = ({ ...rest }: ITextBoxProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.onfocus = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
      };
    }
  }, []);
  useEffect(() => {
    const textarea = textareaRef.current;
    const minHeight = 80;
    if (rest.value != null && rest.value !== undefined && rest.value != "") {
      textarea.style.color = "var(--text-color)";
    } else {
      textarea.style.color = "#c8c8cd";
    }
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.minHeight = `${minHeight}px`;
      if (textarea.scrollHeight > minHeight)
        textarea.style.minHeight = `${textarea.scrollHeight}px`;
    }
  }, [rest.value]);
  return <textarea {...rest} ref={textareaRef} rows={1}></textarea>;
};
