import { AssetType } from 'shared/types';

export class InvestFundTransactionItem {
  id: number = 0;
  referentialAssetId: number = 0;
  referentialAssetType: AssetType | undefined = undefined;
  amount: number = 0;
  currencyCode: string = '';
  createdAt: string = '';
  lastChanged: string = '';
  investFundId: number = 0;
  isIngoing: boolean = false;
}
