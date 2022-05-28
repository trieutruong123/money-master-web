export type NewPortfolioItem = {
  name: string;
  initialCash: number;
  initialCurrency: string;
};

export type NewPersonalAssetType = {
  name: string;
};

export type NewBanksSavingAsset = {
  name: string;
  bankCode: string;
  inputDay: string;
  inputMoneyAmount: number;
  inputCurrency: string;
  isGoingToReinState: boolean;
  description: string;
  interestRate: number;
  termRange: number;
  isUsingInvestFund: boolean;
};

export type NewRealEstateAsset = {
  name: string;
  inputDay: string;
  inputMoneyAmount: number;
  inputCurrency: string;
  buyPrice: number;
  currentPrice: number;
  description: string;
  isUsingInvestFund: boolean;
};

export type NewStockAsset = {
  name: string;
  inputDay: string;
  description: string;
  currentAmountHolding: number;
  stockCode: string;
  marketCode: string;
  purchasePrice: 0;
  currencyCode: string;
  isUsingInvestFund: boolean;
};

export type NewCryptoCurrencyAsset = {
  name: string;
  inputDay: string;
  description: string;
  currentAmountHolding: number;
  buyPrice: number;
  cryptoCoinCode: string;
  isUsingInvestFund: boolean;
};

export type NewCashAsset = {
  name: string;
  amount: string;
  description: string;
  currencyCode: number;
  inputDay: string;
  isUsingInvestFund: boolean;
};

export type NewPortfolioCustomAsset = {
  name: string;
  inputDay: string;
  inputMoneyAmount: number;
  inputCurrency: string;
  description: string;
  interestRate: number;
  termRange: number;
  isUsingInvestFund: boolean;
};

export type UpdatedRealEstateItem = {
  name: string;
  inputDay: string;
  inputMoneyAmount: number;
  inputCurrency: string;
  buyPrice: number;
  currentPrice: number;
  description: string;
};

export type UpdatedBankSavingItem = {
  name: string;
  bankCode: string;
  inputDay: string;
  inputMoneyAmount: number;
  inputCurrency: string;
  isGoingToReinState: boolean;
  description: string;
  interestRate: number;
  changeInterestRateType: string;
  termRange: number;
};

export type SearchingDataItem = {
  id: string;
  symbol: string;
  name: string;
};

export type SankeyDataLink = {
  source: string;
  target: string;
  value: number;
};

export type AssetType =
  | 'cryptoCurrency'
  | 'stock'
  | 'cash'
  | 'bankSaving'
  | 'realEstate'
  | 'custom'
  | 'fund'
  | '';

//Type for portfolio detail tabs
//export type PDTabsType = 'holdings' | 'report' | 'investFund' | 'settings';
