import { AssetType } from 'shared/types';

interface IAssetType {
  [index: string]: AssetType;
}

export const AssetTypeName: IAssetType = {
  cryptoCurrency: 'crypto',
  stock: 'stock',
  cash: 'cash',
  bankSaving: 'bankSaving',
  realEstate: 'realEstate',
  comodity: 'comodity',
  others: 'custom',
};

export const PDBreadcrumbTabs = {
  holdings: 'holdings',
  report: 'report',
  investFund: 'investFund',
  settings: 'settings',
};
