export interface GetAdminDto {
  id: number;
  tgId: string;
  firstName: string;
  lastName: string | null;
  imageUrl: string | null;
}
