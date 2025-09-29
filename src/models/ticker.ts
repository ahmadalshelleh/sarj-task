export interface TickerData {
  cik: number;
  name: string;
  ticker: string;
  exchange: string;
}

export interface TickerResponse {
  ticker: TickerData;
  accessCount: number;
}

export interface TickerAccessCount {
  _id?: string;
  ticker: string;
  count: number;
  lastAccessed: Date;
}