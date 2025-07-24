"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCoinChart, getCoinDetails } from "@/app/lib/api";
import { MarketChartData, CoinDetails } from "@/app/types";
import { PriceChart } from "@/app/components/PriceChart";
import { CoinStats } from "@/app/components/CoinStats";

export default function CoinDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [chartData, setChartData] = useState<MarketChartData>({
    prices: [],
    market_caps: [],
    total_volumes: [],
  });
  const [coinDetails, setCoinDetails] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [chartRes, coinRes] = await Promise.all([
          getCoinChart(id as string),
          getCoinDetails(id as string),
        ]);

        setChartData(chartRes);
        setCoinDetails(coinRes);
      } catch {
        setError("Erro ao carregar os dados do gráfico ou da moeda.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (error) {
    return <div className="p-4 text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          ← Voltar
        </button>
      </div>
      <div className="mt-8">
        <PriceChart
          data={chartData}
          coinName={(id as string).toUpperCase()}
          isLoading={loading}
        />
      </div>

      <div className="mt-8">
        {coinDetails && <CoinStats coinDetails={coinDetails} />}
      </div>
    </div>
  );
}
