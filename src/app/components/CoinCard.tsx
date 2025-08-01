import { Coin } from "@/app/types/crypto";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "@/app/lib/api";
import { TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CoinCardProps {
  coin: Coin;
}

export function CoinCard({ coin }: CoinCardProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <Link href={`/coin/${coin.id}`}>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border
        border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow
        duration-200 min-h-[320px] flex flex-col justify-between"
      >
        {/* Header com imagem, nome e ranking */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Image
              src={coin.image}
              alt={coin.name}
              width={48}
              height={48}
              className="rounded-full mr-3"
            />
            <div className="min-w-0">
              <h3
                className="font-semibold text-sm text-gray-900 dark:text-white
        whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]"
              >
                {coin.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 uppercase text-xs font-medium truncate">
                {coin.symbol}
              </p>
            </div>
          </div>
          <span
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600
    dark:text-gray-300 px-2 py-1 rounded-full font-medium"
          >
            #{coin.market_cap_rank}
          </span>
        </div>

        {/* Preço atual */}
        <div className="mb-3">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(coin.current_price)}
          </div>
        </div>

        {/* Variação de 24h */}
        <div className="flex items-center mb-4">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        </div>

        {/* Informações adicionais */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Market Cap:
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatLargeNumber(coin.market_cap)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Volume 24h:
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatLargeNumber(coin.total_volume)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
