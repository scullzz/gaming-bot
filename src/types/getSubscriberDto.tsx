export interface GetSubscriberDto {
  id: number;
  tgId: string;
  firstName: string;
  lastName: string | null;
  subscribeTime: string;
  imageUrl: string | null;
  username: string | null;
}
