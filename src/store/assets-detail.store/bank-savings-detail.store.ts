import { action, computed, makeAutoObservable, observable } from 'mobx';
import { BankSavingItem } from 'types';

class BankSavingsDetailStore {
  portfolioId: string = '';
  assetId: string = '';
  assetDetail: BankSavingItem | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      assetId: observable,
      assetDetail: observable,

      setPortfolioId: action,
      setAssetId: action,
      fetchAssetDetail: action,
      updateAssetDetail: action,
    });
  }

  setPortfolioId(val: string) {
    this.portfolioId = val;
  }

  setAssetId(val: string) {
    this.assetId = val;
  }

  async fetchAssetDetail({
    portfolioId,
    assetId,
  }: {
    portfolioId: string;
    assetId: string;
  }) {}

  async updateAssetDetail(params: any) {}
}

export const bankSavingsDetailStore = new BankSavingsDetailStore();
