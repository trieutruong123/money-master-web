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

export type RealEstateItem = 
{
  id:number,
  name:string,
  inputDay:string,
  inputMoneyAmount:number,
  inputCurrency:string,
  lastChanged:string,
  description:string,
  buyPrice:number,
  currentPrice:number,
}

export type BankSavingItem = {
  id:number,
  name:string,
  inputDay:string,
  inputMoneyAmount:number,
  inputCurrency:string,
  lastChanged:string,
  bankCode:string,
  description:string,
  interestRate:number,
  termRange:number,
  isGoingToReinState:boolean
}