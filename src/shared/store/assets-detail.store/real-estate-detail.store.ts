import { httpError } from 'shared/helpers';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { httpService } from 'services';
import { RealEstateItem } from 'shared/models';

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
      fetchRealEstateDetail: action,
      updateAssetDetail: action,
    });
  }

  setPortfolioId(val: string) {
    this.portfolioId = val;
  }

  setAssetId(val: string) {
    this.assetId = val;
  }

  async fetchRealEstateDetail({
    portfolioId,
    assetId,
  }: {
    portfolioId: string;
    assetId: string;
  }) {
    const url = `/portfolio/${portfolioId}/realEstate`;
    const res: any = await httpService.get(url);
    if (!res.isError) {
      this.assetDetail = res.data.find((item: any) => item.id == assetId);
    } else {
      this.assetDetail = undefined;
    }
  }

  async updateAssetDetail(params: any) {
    const url = `/portfolio/${this.portfolioId}/realEstate/${this.assetId}`;
    const res: any = await httpService.put(url, {
      name: params.name,
      inputDay: params.inputDay,
      inputMoneyAmount: params.inputMoneyAmount,
      buyPrice: params.inputMoneyAmount,
      inputCurrency: params.inputCurrency,
      description: params.description,
      currentPrice: params.currentPrice,
    });
    if (!res.isError) {
      this.assetDetail = res.data;
      return { isError: false, data: httpError.handleSuccessMessage('update') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }
}

export const realEstateDetailStore = new RealEstateDetailStore();
