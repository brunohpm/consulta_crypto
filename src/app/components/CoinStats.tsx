"use client";
import { TrendingUp, TrendingDown, BarChart3, DollarSign } from "lucide-react";
import { CoinDetails } from "@/app/types";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "@/app/lib/api";

interface CoinStatsProps {
  coinDetails: CoinDetails;
  className?: string;
}

interface StatItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  description?: string;
}

function StatItem({ label, value, icon, trend, description }: StatItemProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600 dark:text-green-400";
      case "down":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-900 dark:text-white";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {icon && (
            <div className="text-gray-500 dark:text-gray-400">{icon}</div>
          )}
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {label}
          </span>
        </div>
        {getTrendIcon()}
      </div>
      <div className={`text-lg font-bold ${getTrendColor()}`}>{value}</div>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      )}
    </div>
  );
}

export function CoinStats({ coinDetails, className = "" }: CoinStatsProps) {
  const isPositiveChange =
    coinDetails.market_data.price_change_percentage_24h >= 0;

  const trend: "up" | "down" = isPositiveChange ? "up" : "down";

  const stats: StatItemProps[] = [
    {
      label: "Preço Atual",
      value: formatCurrency(coinDetails.market_data.current_price.usd),
      icon: <DollarSign className="h-4 w-4" />,
      trend,
    },
    {
      label: "Variação 24h",
      value: formatPercentage(
        coinDetails.market_data.price_change_percentage_24h
      ),
      icon: <BarChart3 className="h-4 w-4" />,
      trend,
    },
    {
      label: "Market Cap",
      value: formatLargeNumber(coinDetails.market_data.market_cap.usd),
      description: `Ranking: #${coinDetails.market_cap_rank}`,
    },
    {
      label: "Volume 24h",
      value: formatLargeNumber(coinDetails.market_data.total_volume.usd),
      description: "Volume de negociação",
    },
  ];

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Estatísticas de Mercado
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            description={stat.description}
          />
        ))}
      </div>
    </div>
  );
}
