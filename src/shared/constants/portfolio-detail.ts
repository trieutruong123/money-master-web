import { AssetType } from 'shared/types';

export interface IAssetType {
  [index: string]: AssetType;
}

export enum AssetTypeName {
  cryptoCurrency = 'cryptoCurrency',
  stock = 'stock',
  cash = 'cash',
  bankSaving = 'bankSaving',
  realEstate = 'realEstate',
  custom = 'custom',
  fund = 'fund',
}

export const AssetTypeConstants = {
  cryptoCurrency: 'crypto currency',
  stock: 'stock',
  cash: 'cash',
  bankSaving: 'bank saving',
  realEstate: 'real estate',
  custom: 'custom',
  fund: 'fund',
};

export const PDBreadcrumbTabs = {
  holdings: 'Holdings',
  report: 'Report',
  investFund: 'InvestFund',
  settings: 'Settings',
};

export enum TransactionItemType {
  NewAsset = 'newAsset',
  AddValue = 'addValue',
  WithdrawValue = 'withdrawValue',
  SellAsset = 'sellAsset',
  MoveToFund = 'moveToFund',
  BuyFromFund = 'buyFromFund',
}
