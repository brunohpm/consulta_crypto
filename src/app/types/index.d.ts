export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation?: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply?: number;
  max_supply?: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi?: {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
}

export interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface SearchResponse {
  coins: SearchResult[];
}

export interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
}
