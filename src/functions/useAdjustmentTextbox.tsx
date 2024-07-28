import { useEffect, useRef } from "react";

export const useAdjustmentTextbox = (text: string) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Сбрасываем высоту, чтобы получить правильную прокрутку
      textarea.style.height = "auto";
      // Устанавливаем высоту в соответствии с высотой содержимого
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);
  return textareaRef;
};
