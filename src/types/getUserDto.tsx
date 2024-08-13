export interface GetUserPayMethod {
  platform: string;
  data: string | null;
}

export interface GetUserProfile {
  id: number;
  tgId: string;
  email: string | null;
  firstName: string;
  lastName: string | null;
  imageUrl: string | null;
  userPayMethods: GetUserPayMethod[];
}
