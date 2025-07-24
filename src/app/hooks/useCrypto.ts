import { useQuery } from "@tanstack/react-query";
import {
  getTopCoins,
  searchCoins,
  getCoinMarketDataFromSearch,
} from "@/app/lib/api";

// Hook para buscar as top 20 criptomoedas
export function useTopCoins() {
  return useQuery({
    queryKey: ["topCoins"],
    queryFn: getTopCoins,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Não tentar novamente se for erro 4xx (cliente)
      if (error instanceof Error && error.message.includes("4")) {
        return false;
      }
      // Tentar até 3 vezes para outros erros
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
// Hook para buscar criptomoedas por query
export function useSearchCoins(query: string) {
  return useQuery({
    queryKey: ["searchCoins", query],
    queryFn: () => searchCoins(query),
    enabled: query.length > 0, // Só executa se houver query
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("4")) {
        return false;
      }
      return failureCount < 2; // Menos tentativas para busca
    },
    retryDelay: 1000,
  });
}

export function useMarketSearchCoins(query: string) {
  return useQuery({
    queryKey: ["marketSearchCoins", query],
    queryFn: () => getCoinMarketDataFromSearch(query),
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
