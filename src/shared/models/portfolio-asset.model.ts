export class PortfolioItem {
  symbol: string = '';
  description: string = '';
  price: number = 0;
  pricePaid: string = '';
  priceChange: string = '';
  percentChange: string = '';
  profitLossAmount: string = '';
  quantity: number = 0;
  marketValue: string = '';
  portfolioAllocation: string = '';
}

export class PortfolioAllocation {
  symbol: string = '';
  portfolioAllocation: string = '';
}

export class RealEstateItem {
  id: number = 0;
  name: string = '';
  inputDay: string = '';
  inputMoneyAmount: number = 0;
  inputCurrency: string = '';
  lastChanged: string = '';
  description: string = '';
  buyPrice: number = 0;
  currentPrice: number = 0;
}

export class BankSavingItem {
  id: number = 0;
  name: string = '';
  inputDay: string = '';
  inputMoneyAmount: number = 0;
  inputCurrency: string = '';
  lastChanged: string = '';
  bankCode: string = '';
  description: string = '';
  interestRate: number = 0;
  termRange: number = 0;
  isGoingToReinState: boolean = false;
}

export class StockItem {
  id: number = 0;
  name: string = '';
  inputDay: string = '';
  lastChanged: string = '';
  description: string = '';
  currentAmountHolding: number = 0;
  stockCode: string = '';
  marketCode: string = '';
}

export class CryptoItem {
  id: number = 0;
  name: string = '';
  inputDay: string = '';
  currenctAmountHolding: number = 0;
  lastChanged: string = '';
  portfolioId: number = 0;
  description: string = '';
  buyPrice: number = 0;
  currencyCode: string = '';
  cryptoCoinCode: string = '';
  currentPrice: number = 0;
  currentAmountInCurrency: number = 0;
}

export class SearchingStockItem {
  description: string = '';
  displaySymbol: string = '';
  symbol: string = '';
  type: string = '';
}

export class SearchingCryptoItem {
  id: string = '';
  name: string = '';
  symbol: string = '';
  market_cap_rank?: number = 0;
  thumb:string = '';
  large:string = '';
}

