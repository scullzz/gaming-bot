export function formatRaffleTimeRemaining(dateString: string): string {
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  if (timeDifference <= 0) {
    return "00ч : 00м : 00с";
  }

  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDifference / 1000) % 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}ч : ${formattedMinutes}м : ${formattedSeconds}с`;
}
