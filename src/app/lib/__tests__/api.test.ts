import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "@/app/lib/api";
describe("API Utilities", () => {
  describe("formatCurrency", () => {
    it("should format currency correctly", () => {
      expect(formatCurrency(1234.56)).toContain("1.234,56");
      expect(formatCurrency(1234.56)).toMatch(/US\$?\s?1\.234,56/);
      expect(formatCurrency(0.123456)).toContain("0,123456");
      expect(formatCurrency(0.123456)).toMatch(/US\$?\s?0,123456/);
    });
  });
  describe("formatLargeNumber", () => {
    it("should format large numbers correctly", () => {
      expect(formatLargeNumber(1500000000)).toBe("$1.50B");
      expect(formatLargeNumber(1500000)).toBe("$1.50M");
      expect(formatLargeNumber(1500)).toBe("$1.50K");
    });
  });
  describe("formatPercentage", () => {
    it("should format percentages correctly", () => {
      expect(formatPercentage(5.67)).toBe("+5.67%");
      expect(formatPercentage(-3.45)).toBe("-3.45%");
    });
  });
});
