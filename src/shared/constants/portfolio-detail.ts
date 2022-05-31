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

export enum TransactionTypeName {
  NewAsset = 'newAsset',
  AddValue = 'addValue',
  withdrawToOutside = 'withdrawToOutside',
  withdrawToCash = 'withdrawToCash',
  MoveToFund = 'moveToFund',
  BuyFromFund = 'buyFromFund',
  BuyFromCash = 'buyFromCash',
  BuyFromOutside = 'buyFromOutside',
}

export const TransactionTypeConstants = {
  newAsset: 'new asset',
  addValue: 'add value',
  withdrawToOutside: 'withdraw to outside',
  withdrawToCash: 'withdraw to cash',
  moveToFund: 'move to fund',
  buyFromFund: 'buy from fund',
  buyFromCash: 'buy from cash',
  buyFromOutside: 'buy from outside',
};

export enum TransactionRequestType {
  buyAsset = 'buyAsset',
  sellAsset = 'sellAsset',
  moveToFund = 'moveToFund',
}
