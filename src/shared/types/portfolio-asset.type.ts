export type TransactionType =
  | "newAsset"
  | "addValue"
  | "withdrawValue"
  | "buyFromOutside"
  | "buyFromFund"
  | "buyFromCash"
  | "sellAsset"
  | "moveToFund";

export type TransactionRequestType =
  | "addvalue"
  | "withdrawToCash"
  | "moveToFund"
  | "buyFromFund"
  | "buyFromCash"
  | "buyFromOutside";

export interface ITransactionRequest {
  amount: number;
  amountInDestinationAssetUnit: number;
  currencyCode: string;
  transactionType: TransactionType;
  referentialAssetType: string;
  referentialAssetId: number;
  destinationAssetId: number;
  destinationAssetType: string;
  isTransferringAll: boolean;
  fee: number;
  tax: number;
}
