export type TransactionType =
  | 'newAsset'
  | 'addValue'
  | 'withdrawValue'
  | 'buyFromOutside'
  | 'buyFromFund'
  | 'buyFromCash'
  | 'sellAsset'
  | 'moveToFund';

export type TransactionRequestType =
  | 'buyAsset'
  | 'withdrawValue'
  | 'moveToFund';

export interface ITransactionRequest {
  amount: number;
  amountInDestinationAssetUnit: number;
  currencyCode: string;
  transactionType: TransactionType;
  destinationAssetId: number;
  destinationAssetType: string;
  isTransferringAll: boolean;
}
