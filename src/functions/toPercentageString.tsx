export const toPercentageString = (value: number): string => {
  if (value < 0 || value > 1) {
    throw new Error("Value must be between 0 and 1");
  }

  // Преобразуем число в процентное значение и округляем до одного знака после запятой
  const percentage = (value * 100).toFixed(1).replace(".", ",");

  // Возвращаем строку в формате "число%"
  return `${percentage}%`;
};
