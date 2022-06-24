import { AssetType, TransactionType } from "shared/types";

export class InvestFundTransactionItem {
  singleAssetTransactionType: TransactionType | null = null;
  id: number = 0;
  referentialAssetId: number = 0;
  referentialAssetType: AssetType | null = null;
  referentialAssetName: string = "";
  destinationAssetId: number = 0;
  destinationAssetType: AssetType | null = null;
  destinationAssetName: string = "";
  destinationAmount: number = 0;
  destinationCurrency: string = "";
  amount: number = 0;
  currencyCode: string = "";
  createdAt: string = "";
  lastChanged: string = "";
  fee: number = 0;
  tax: number = 0;
}

export type InvestFundTransactionList = Array<InvestFundTransactionItem>;
