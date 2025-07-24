import { Coin, SearchResponse } from "@/app/types/crypto";
import { MarketChartData } from "@/app/types/index";

const API_BASE_URL = process.env.NEXT_PUBLIC_COINGECKO_API_URL;
// Função para buscar as top 20 criptomoedas
export async function getTopCoins(): Promise<Coin[]> {
  const response = await fetch(
    `${API_BASE_URL}/coins/markets?
vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
  );
  if (!response.ok) {
    throw new Error("Falha ao buscar dados das criptomoedas");
  }
  return response.json();
}
// Função para buscar criptomoedas por nome ou símbolo
export async function searchCoins(query: string): Promise<SearchResponse> {
  if (!query.trim()) {
    return { coins: [] };
  }
  const response = await fetch(
    `${API_BASE_URL}/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Falha ao buscar criptomoedas");
  }
  return response.json();
}

export async function getCoinChart(id: string): Promise<MarketChartData> {
  const res = await fetch(
    `${API_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar gráfico");
  }

  const json = await res.json();

  return {
    prices: json.prices || [],
    market_caps: json.market_caps || [],
    total_volumes: json.total_volumes || [],
  };
}

export async function getCoinDetails(id: string) {
  const res = await fetch(`${API_BASE_URL}/coins/${id}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar detalhes da moeda");
  }

  return res.json();
}

// Função utilitária para formatar valores monetários
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
}
// Função utilitária para formatar números grandes (market cap, volume)
export function formatLargeNumber(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  } else {
    return formatCurrency(value);
  }
}

// Função utilitária para formatar percentuais
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}
