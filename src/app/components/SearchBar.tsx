"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClearSearch: () => void;
}

export function SearchBar({ onSearch, onClearSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onClearSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar criptomoedas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-20 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors border-gray-300 dark:border-gray-600"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title="Limpar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
