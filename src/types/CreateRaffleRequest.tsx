export interface CreateRaffleRequest {
  amountOfWinners: number;
  showWinners: boolean;
  raffleConditions: string[];
  description: string;
  endTime: string;
  shouldNotifyUsers: boolean;
}
