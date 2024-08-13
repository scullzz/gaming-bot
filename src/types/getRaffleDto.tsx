import { GetRaffleConditionDto } from "./getRaffleConditionDto";

export interface GetRaffleDto {
  id: number;
  amountOfWinners: number;
  raffleConditions: GetRaffleConditionDto[];
  description: string;
  endTime: string;
  amountOfParticipants: number;
  isParticipant: boolean;
  showWinners: boolean;
  isCreator: boolean;
}
