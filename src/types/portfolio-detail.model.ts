export type PortfolioItem = {
  symbol: string;
  description: string;
  price: number;
  pricePaid: string;
  priceChange: string;
  percentChange: string;
  profitLossAmount: string;
  quantity: number;
  marketValue: string;
  portfolioAllocation: string;
};

export type PortfolioAllocation = {
  symbol: string;
  portfolioAllocation: string;
};
