import { TransactionType } from "shared/types";

export type TransferToInvestFundType = {
  amount: number;
  amountInDestinationAssetUnit: number | null;
  currencyCode: string;
  transactionType: TransactionType;
  referentialAssetType: string | null;
  referentialAssetId: number | null;
  destinationAssetId: number | null;
  destinationAssetType: string | null;
  isTransferringAll: boolean;
  isUsingFundAsSource: boolean;
  fee: number;
  tax: number;
};

export type InvestFundItem = {
  currentAmount: number;
  isDeleted: boolean;
  portfolioId: number;
  initialCurrency: string;
};
