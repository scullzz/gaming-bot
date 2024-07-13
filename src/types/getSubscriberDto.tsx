export interface GetSubscriberDto {
  id: number;
  tgId: string;
  firstName: string;
  lastName: string | null;
  subscribeTime: string;
}
