"use client";
import { useState, useEffect } from "react";
import { Search, X, AlertCircle } from "lucide-react";
import { useDebounce } from "@/app/hooks/useDebouce";
import { useSearchCoins } from "@/app/hooks/useCrypto";
import { SearchResult } from "../types/crypto";
interface SearchBarProps {
  onSearchResults: (results: SearchResult[]) => void;
  onClearSearch: () => void;
  onError?: (error: unknown) => void;
}
export function SearchBar({
  onSearchResults,
  onClearSearch,
  onError,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { data: searchData, isLoading, error } = useSearchCoins(debouncedQuery);
  // Atualizar resultados quando os dados da busca mudarem
  useEffect(() => {
    if (searchData?.coins) {
      onSearchResults(searchData.coins);
    }
  }, [searchData, onSearchResults]);
  // Tratar erros
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);
  const handleClear = () => {
    setQuery("");
    onClearSearch();
  };
  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2
text-gray-400 w-5 h-5"
        />
        <input
          type="text"
          placeholder="Buscar criptomoedas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2
focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 textgray-
900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
transition-colors ${
            error
              ? "border-red-300 dark:border-red-600"
              : "border-gray-300 dark:border-gray-600"
          }`}
        />
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2
flex items-center space-x-1"
        >
          {isLoading && query && (
            <div
              className="animate-spin rounded-full h-4 w-4 border-2 bordergray-
300 border-t-blue-500"
            />
          )}
          {error && <AlertCircle className="w-4 h-4 text-red-500" />}
          {query && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:hover:textgray-
300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
