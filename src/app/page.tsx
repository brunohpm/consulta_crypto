"use client";

import { useState, useCallback } from "react";
import { useTopCoins, useMarketSearchCoins } from "@/app/hooks/useCrypto";
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
import { Coin } from "@/app/types/crypto";

export default function Home() {
  const { data: topCoins, isLoading, error, refetch } = useTopCoins();
  const { handleError } = useErrorHandler();

  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: searchCoins,
    isLoading: searchLoading,
    error: marketSearchError,
  } = useMarketSearchCoins(query);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setIsSearching(true);
  }, []);

  const handleClearSearch = useCallback(() => {
    setQuery("");
    setIsSearching(false);
  }, []);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const displayCoins: Coin[] = isSearching ? searchCoins || [] : topCoins || [];

  if (isLoading && !topCoins) return <LoadingPage />;

  if (error && !topCoins) {
    const errorInfo = handleError(error);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        {errorInfo.type === "network" ? (
          <NetworkError onRetry={handleRetry} />
        ) : (
          <ApiError onRetry={handleRetry} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Consulta de Cryptomoedas
            </h1>
            <div className="flex items-center space-x-4">
              <SearchBar
                onSearch={(q) => handleSearch(q)}
                onClearSearch={handleClearSearch}
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isSearching ? "Resultados da Busca" : "Top 20 Criptomoedas"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isSearching
              ? `${searchCoins?.length ?? 0} resultado(s) encontrado(s)`
              : "As criptomoedas com maior capitalização de mercado"}
          </p>
        </div>

        {/* Erro na busca */}
        {marketSearchError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-300">
              Erro na busca: {handleError(marketSearchError).message}
            </p>
          </div>
        )}

        {/* Resultados */}
        {searchLoading && isSearching ? (
          <LoadingGrid count={4} />
        ) : displayCoins.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>
        ) : isSearching ? (
          <SearchNoResults />
        ) : (
          <EmptyState />
        )}

        {/* Indicador de atualização */}
        {isLoading && topCoins && (
          <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Atualizando...
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
