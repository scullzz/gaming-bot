import { GetUserPayMethod } from "./getUserDto";
import { SubscriberStat } from "./subscriberStat";

export interface GetSubscriberProfile {
  id: number;
  tgId: string;
  email: string | null;
  firstName: string;
  lastName: string | null;
  subscribeTime: string;
  note: string | null;
  userPayMethods: GetUserPayMethod[];
  subscriberStat: SubscriberStat;
}
