export function combineDateTimeToUTC(date: Date, timeString: string): string {
  // Разделяем время на часы и минуты
  const [hours, minutes] = timeString
    .split(":")
    .map((part) => parseInt(part, 10));

  // Устанавливаем время для объекта Date
  date.setHours(hours);
  date.setMinutes(minutes);

  // Получаем время в миллисекундах с учетом смещения для московского времени (UTC+3)
  const mskTime = date.getTime();
  const utcTime = mskTime;

  // Создаем новый объект Date с временем в UTC
  const utcDate = new Date(utcTime);

  // Форматируем строку даты и времени в формате ISO
  const isoString = utcDate.toISOString();

  // Преобразуем ISO строку в нужный формат
  return isoString;
}
