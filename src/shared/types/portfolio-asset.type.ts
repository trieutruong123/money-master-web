export type TransactionType =
  | 'newAsset'
  | 'addValue'
  | 'withdrawValue'
  | 'sellAsset'
  | 'moveToFund';

export type NewTransactionRequestBody = {
  amount: number;
  currencyCode: string;
  transactionType: string;
  destinationAssetId: number;
  destinationAssetType: string;
  isTransferringAll: boolean;
};
