import { Social } from "./social";

export interface GetStreamerDto {
  id: number;
  amountOfSubscribers: number;
  name: string;
  tgId: string;
  isLive: boolean;
  isSubscribed: boolean;
  socials: Social[];
}
