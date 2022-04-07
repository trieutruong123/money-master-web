import { action, computed, makeAutoObservable, observable } from 'mobx';
import { RealEstateItem } from 'types';

class RealEstateDetailStore {
  portfolioId: string = '';
  assetId: string = '';
  assetDetail: RealEstateItem | undefined = undefined;

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

export const realEstateDetailStore = new RealEstateDetailStore();
