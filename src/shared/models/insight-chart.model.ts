import { AssetType } from 'shared/types';
import { TransactionType } from '../types';

export class PieChartItem {
  assetType: string = '';
  sumValue: number = 0;
}

export class TransactionItem {
  singleAssetTransactionType: TransactionType | undefined = undefined;
  id: number = 0;
  referentialAssetId: number = 0;
  referentialAssetType: AssetType | undefined = undefined;
  destinationAssetId: number = 0;
  destinationAssetType: AssetType | undefined = undefined;
  amount: number = 0;
  currencyCode: string = '';
  createdAt: string = '';
  lastChanged: string = '';
}

export type RealEstateTransactionList = Array<TransactionItem>;
export type CryptoTransactionList = Array<TransactionItem>;
export type CashTransactionList = Array<TransactionItem>;
export type BankSavingsTransactionList = Array<TransactionItem>;
export type StockTransactionList = Array<TransactionItem>;
export type CustomAssetTransactionList = Array<TransactionItem>;
