import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CoinCard } from "@/app/components/CoinCard";
import { Coin } from "@/app/types/crypto";
const mockCoin: Coin = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  image: "https://example.com/bitcoin.png",
  current_price: 45000,
  market_cap: 850000000000,
  market_cap_rank: 1,
  price_change_percentage_24h: 2.5,
  total_volume: 25000000000,
};
describe("CoinCard", () => {
  it("should render coin information correctly", () => {
    render(<CoinCard coin={mockCoin} />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText(/btc/i)).toBeInTheDocument(); // corrigido
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText(/US\$ 45\.000,00/)).toBeInTheDocument(); // com regex
  });
  it("should display positive change with correct styling", () => {
    render(<CoinCard coin={mockCoin} />);
    const percentageElement = screen.getByText("+2.50%");
    expect(percentageElement).toHaveClass("text-green-600");
  });
});
