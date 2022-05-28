export type TransferToInvestFundType = {
  referentialAssetId: number;
  referentialAssetType: string;
  amount: number;
  currencyCode: string;
  isTransferringAll: boolean;
};

export type InvestFundItem = {
  currentAmount: number;
  isDeleted: boolean;
  portfolioId: number;
  initialCurrency: string;
};
