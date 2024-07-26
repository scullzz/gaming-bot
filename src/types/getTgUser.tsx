export interface GetTgUser {
  id: number;
  firstName: string;
  lastName: string | null;
  username: string | null;
  imageUrl: string | null;
  tgId: string;
}
