"use client";
import { useState, useCallback } from "react";
import { useTopCoins } from "@/app/hooks/useCrypto";
import { useErrorHandler } from "@/app/hooks/useErrorHandler";
import { CoinCard } from "@/app/components/CoinCard";
import { SearchBar } from "@/app/components/SearchBar";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { LoadingGrid, LoadingPage } from "@/app/components/LoadingStates";
import {
  NetworkError,
  ApiError,
  SearchNoResults,
  EmptyState,
} from "@/app/components/ErrorStates";
import { Coin, SearchResult } from "@/app/types/crypto";
export default function Home() {
  const { data: topCoins, isLoading, error, refetch } = useTopCoins();
  const { handleError } = useErrorHandler();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const handleSearchResults = useCallback((results: SearchResult[]) => {
    setSearchResults(results);
    setIsSearching(true);
    setSearchError(null);
  }, []);
  const handleClearSearch = useCallback(() => {
    setSearchResults([]);
    setIsSearching(false);
    setSearchError(null);
  }, []);
  const handleSearchError = useCallback(
    (error: unknown) => {
      const errorInfo = handleError(error);
      setSearchError(errorInfo.message);
    },
    [handleError]
  );
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);
  // Converter SearchResult para Coin (dados limitados)
  const searchCoinsAsCoins: Coin[] = searchResults.map((result) => ({
    id: result.id,
    symbol: result.symbol,
    name: result.name,
    image: result.thumb,
    current_price: 0,
    market_cap: 0,
    market_cap_rank: result.market_cap_rank || 0,
    price_change_percentage_24h: 0,
    total_volume: 0,
  }));
  const displayCoins = isSearching ? searchCoinsAsCoins : topCoins || [];
  // Loading inicial
  if (isLoading && !topCoins) {
    return <LoadingPage />;
  }
  // Erro na busca principal
  if (error && !topCoins) {
    const errorInfo = handleError(error);
    if (errorInfo.type === "network") {
      return (
        <div
          className="min-h-screen bg-gray-50 dark:bg-gray-900 flex itemscenter
justify-center"
        >
          <NetworkError onRetry={handleRetry} />
        </div>
      );
    }
    return (
      <div
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex itemscenter
justify-center"
      >
        <ApiError onRetry={handleRetry} />
      </div>
    );
  }
  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors
duration-200"
    >
      {/* Header */}
      <header
        className="bg-white dark:bg-gray-800 shadow-sm border-b bordergray-
200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Consulta de Cryptomoedas
            </h1>
            <div className="flex items-center space-x-4">
              <SearchBar
                onSearchResults={handleSearchResults}
                onClearSearch={handleClearSearch}
                onError={handleSearchError}
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título da seção */}
        <div className="mb-8">
          <h2
            className="text-3xl font-bold text-gray-900 dark:text-white mb-
2"
          >
            {isSearching ? "Resultados da Busca" : "Top 20 Criptomoedas"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isSearching
              ? `${searchResults.length} resultado(s) encontrado(s)`
              : "As criptomoedas com maior capitalização de mercado"}
          </p>
        </div>
        {/* Conteúdo */}
        {searchError ? (
          <div
            className="bg-red-50 dark:bg-red-900/20 border border-red-200
dark:border-red-800 rounded-lg p-4 mb-6"
          >
            <p className="text-red-700 dark:text-red-300">
              Erro na busca: {searchError}
            </p>
          </div>
        ) : null}
        {isLoading && isSearching ? (
          <LoadingGrid count={4} />
        ) : displayCoins.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
xl:grid-cols-4 gap-6"
          >
            {displayCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>
        ) : isSearching ? (
          <SearchNoResults />
        ) : (
          <EmptyState />
        )}
        {/* Indicador de loading para refresh */}
        {isLoading && topCoins && (
          <div
            className="fixed bottom-4 right-4 bg-white dark:bg-gray-800
rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-2">
              <div
                className="animate-spin rounded-full h-4 w-4 border-2
border-gray-300 border-t-blue-500"
              ></div>
              <span
                className="text-sm text-gray-600 dark:text-gray-
400"
              >
                Atualizando...
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
