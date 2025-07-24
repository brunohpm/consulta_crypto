"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { MarketChartData } from "@/app/types";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

interface ChartDataPointPrice {
  price: number;
  formattedDate: string;
}

interface ExtendedTooltipProps extends TooltipProps<ValueType, NameType> {
  payload?: {
    payload: ChartDataPointPrice;
  }[];
}

interface PriceChartProps {
  data: MarketChartData;
  coinName: string;
  isLoading?: boolean;
  className?: string;
}

interface ChartDataPoint {
  timestamp: number;
  date: string;
  price: number;
  formattedDate: string;
}

export function PriceChart({
  data,
  coinName,
  isLoading,
  className = "",
}: PriceChartProps) {
  const chartData = useMemo(() => {
    if (!data?.prices) return [];

    const grouped = new Map<string, ChartDataPoint>();

    data.prices.forEach(([timestamp, price]) => {
      const date = new Date(timestamp);
      const key = date.toISOString().split("T")[0]; // yyyy-mm-dd

      grouped.set(key, {
        timestamp,
        date: key,
        price,
        formattedDate: date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }),
      });
    });

    return Array.from(grouped.values());
  }, [data]);

  const priceRange = useMemo(() => {
    if (chartData.length === 0) return { min: 0, max: 0 };
    const prices = chartData.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1;
    return {
      min: Math.max(0, min - padding),
      max: max + padding,
    };
  }, [chartData]);

  const isPositiveTrend = useMemo(() => {
    if (chartData.length < 2) return true;
    const firstPrice = chartData[0].price;
    const lastPrice = chartData[chartData.length - 1].price;
    return lastPrice >= firstPrice;
  }, [chartData]);

  const CustomTooltip = ({ active, payload }: ExtendedTooltipProps) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;

      return (
        <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm">
          <div>Data: {data.formattedDate}</div>
          <div>Preço: ${data.price.toFixed(2)}</div>
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-4"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Gráfico de Preços - 7 Dias
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <p>Dados do gráfico não disponíveis</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {coinName} - Preços dos Últimos 7 Dias
        </h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <span>
            Período: {chartData[0]?.formattedDate} -{" "}
            {chartData[chartData.length - 1]?.formattedDate}
          </span>
          <span
            className={`font-medium ${
              isPositiveTrend
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            Tendência: {isPositiveTrend ? "Alta" : "Baixa"}
          </span>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isPositiveTrend ? "#10B981" : "#EF4444"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isPositiveTrend ? "#10B981" : "#EF4444"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="formattedDate"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis
              domain={[priceRange.min, priceRange.max]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.toFixed(2)}
              className="text-gray-600 dark:text-gray-400"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositiveTrend ? "#10B981" : "#EF4444"}
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: isPositiveTrend ? "#10B981" : "#EF4444",
                strokeWidth: 2,
                stroke: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
