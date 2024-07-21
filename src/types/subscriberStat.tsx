export interface SingleStat {
  amount: number;
  percentage: number | null;
}

export interface SubscriberStat {
  participatedInStreamer: SingleStat;
  wonStreamer: SingleStat;
  spottedInStreamerAbusing: SingleStat;
  participated: SingleStat;
  won: SingleStat;
  spottedInAbusing: SingleStat;
}
