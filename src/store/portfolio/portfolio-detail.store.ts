import { action, makeAutoObservable, observable } from 'mobx';
import { PortfolioAllocation, RealEstateItem, BankSavingItem } from 'types';
import { coinGeckoService, httpService } from 'services';
import { portfolioData } from './portfolio-data';

class PortfolioDetailStore {
  portfolioId: string = '';
  portfolioAllocationData: Array<PortfolioAllocation> = [];
  stockDetail: Array<Object> | undefined = undefined;
  cryptoDetail: Array<any> = [];
  cashDetail: Array<Object> | undefined = undefined;
  realEstateDetail: Array<RealEstateItem> | undefined = undefined;
  bankingDetail: Array<BankSavingItem> | undefined = undefined;
  portfolioValue: number = 0;
  todaysChange: number = 0;
  isOpenAddNewAssetModal: boolean = false;
  currencyCode: string = '';
  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      portfolioAllocationData: observable,
      stockDetail: observable,
      cryptoDetail: observable,
      cashDetail: observable,
      realEstateDetail: observable,
      bankingDetail: observable,
      portfolioValue: observable,
      todaysChange: observable,
      isOpenAddNewAssetModal: observable,

      setOpenAddNewAssetModal: action,
      fetchPortfolioDetailData: action,
      fetchCoinData: action,
      setPortfolioId: action,
      fetchRealEstate: action,
    });
  }

  setOpenAddNewAssetModal(isOpen: boolean) {
    this.isOpenAddNewAssetModal = isOpen;
  }

  setPortfolioId(id: string) {
    this.portfolioId = id;
  }

  async fetchPortfolioDetailData() {
    this.currencyCode = 'usd';
    this.portfolioAllocationData = portfolioData.portfolioAllocation;
    this.portfolioValue = portfolioData.portfolioValue;
    this.todaysChange = portfolioData.todaysChange;
    const portfolioDetail = portfolioData.portfolioData;
    this.stockDetail = portfolioDetail.stocks;
    this.cashDetail = portfolioDetail.cash;
    this.cryptoDetail = portfolioDetail.crypto;
    return true;
  }

  updatePortfolioDetailData(coins: any) {
    const res = coins.map();
    return true;
  }

  async fetchCoinData() {
    const coins = this.cryptoDetail;
    const data = await coins.map(async (coin: any) => {
      const res: any = await this.fetchCoinInfoByCode({ code: coin.coinName });
      if (!res.isError) {
        const coinInfo = res.data;
        return {
          ...coin,
          price: coinInfo.price,
          priceChange: coinInfo.priceChange,
          percentChange: coinInfo.percentChange,
          profitLossAmount: coinInfo.priceChange * coin.quantity,
          totalValue: coinInfo.price * coin.quantity,
        };
      } else return coin;
    });
    Promise.all(data).then((arr) => {
      this.cryptoDetail = arr;
    });
  }

  async fetchCoinInfoByCode({ code }: { code: string }) {
    const res: any = await coinGeckoService.getCoinInfoByCode({
      coinCode: code,
      exclude: {
        localization: true,
        ticker: true,
        communityData: true,
        developerData: true,
      },
    });
    if (!res.isError) {
      const { market_data } = res.data;
      return {
        isError: false,
        data: {
          price: market_data?.current_price[this.currencyCode],
          priceChange:
            market_data?.price_change_24h_in_currency[this.currencyCode],
          percentChange:
            market_data?.price_change_percentage_24h_in_currency[
              this.currencyCode
            ],
        },
      };
    } else return res;
  }

  async fetchBankSaving() {
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: any = await httpService.get(url);
    if (!res.isError) {
      this.bankingDetail = res.data;
    } else {
      this.bankingDetail = undefined;
    }
  }

  async fetchRealEstate() {
    const url = `/portfolio/${this.portfolioId}/realEstate`;
    const res: any = await httpService.get(url);
    if (!res.isError) {
      this.realEstateDetail = res.data;
    } else {
      this.realEstateDetail = undefined;
    }
  }

  async addNewRealEstate(params: any) {
    const url = `/portfolio/${this.portfolioId}/realEstate`;
    const res: any = await httpService.post(url, {
      name: params.name,
      inputDay: params.inputDay,
      inputMoneyAmount: params.inputMoneyAmount,
      inputCurrency: params.inputCurrency,
      buyPrice: params.inputMoneyAmount,
      currentPrice: params.currentPrice,
      description: params.description,
    });
    if (!res.isError) {
      await this.fetchRealEstate();
    }
  }

  async addNewBankSaving(params: any) {
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: any = await httpService.post(url, {
      name: params.name,
      bankCode: params.bankCode,
      inputDay: params.inputDay,
      inputMoneyAmount: params.inputMoneyAmount,
      inputCurrency: params.inputCurrency,
      isGoingToReinState: params.isGoingToReinState,
      interestRate: params.interestRate,
      description: params.description,
      termRange: params.termRange,
    });
    if (!res.isError) {
      await this.fetchBankSaving();
    }
  }
}

export const portfolioDetailStore = new PortfolioDetailStore();
