import { AssetType } from 'shared/types';

export class PersonalInterestCustomAssetItem {
  id: number = 0;
  name: string = '';
}

export class InvestFundResponse {
  currentAmount: number = 0;
  isDeleted: boolean = true;
  portfolioId: number = 0;
  initialCurrency: string = '';
}

export class InvestFundTransactionResponse {
  id: number = 0;
  referentialAssetId: number = 0;
  referentialAssetType: AssetType = '';
  amount: number = 0;
  currencyCode: string = '';
  createdAt: string = '';
  lastChanged: string = '';
  investFundId: number = 0;
  isIngoing: boolean = true;
}
