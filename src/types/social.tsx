export interface Social {
  name: string;
  link: string;
  parameter: DefaultLiveParameter;
}
export interface DefaultLiveParameter {
  isLive: boolean;
  link: string | null;
  identifier: string | null;
}
