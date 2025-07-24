export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
}
export interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  market_cap_rank: number;
}
export interface SearchResponse {
  coins: SearchResult[];
}

export interface MarketChartData {
  prices: [number, number][];
}

export interface ChartDataPointPrice {
  price: number;
  formattedDate: string;
}
