import {
  NewStockAsset,
  NewCryptoCurrencyAsset,
} from '../../types/portfolio-detail.type';
import { action, makeAutoObservable, observable } from 'mobx';
import {
  PortfolioAllocation,
  RealEstateItem,
  BankSavingItem,
  CashItem,
} from 'shared/models';
import {
  coinGeckoService,
  httpService,
  finhubService,
  portfolioService,
} from 'services';
import { httpError } from 'shared/helpers';
import {
  SearchingDataItem,
  NewBanksSavingAsset,
  NewRealEstateAsset,
  NewCashAsset,
} from 'shared/types';
import { SankeyDataLink } from 'shared/types';
import { portfolioData } from './portfolio-data';
import { rootStore } from '../root.store';

class PortfolioDetailStore {
  portfolioId: string = '';
  portfolioAllocationData: Array<PortfolioAllocation> = [];
  stockDetail: Array<Object> | undefined = undefined;
  cryptoDetail: Array<Object> = [];
  cashDetail: Array<CashItem> | undefined = undefined;
  realEstateDetail: Array<RealEstateItem> | undefined = undefined;
  bankingDetail: Array<BankSavingItem> | undefined = undefined;
  portfolioValue: number = 0;
  todaysChange: number = 0;
  isOpenAddNewAssetModal: boolean = false;
  currencyCode: string = '';
  sankeyFlowData: Array<SankeyDataLink> = [];
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
      sankeyFlowData: observable,

      setOpenAddNewAssetModal: action,
      fetchPortfolioDetailData: action,
      fetchCoinData: action,
      setPortfolioId: action,
      fetchRealEstate: action,
      addNewBankSaving: action,
      addNewRealEstate: action,
      addNewCryptoCurrency: action,
      addNewStock: action,
      fetchSankeyFlowData: action,
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
    this.cryptoDetail = portfolioDetail.crypto;
    return true;
  }

  async fetchCoinData() {
    // const coins = this.cryptoDetail;
    // const data = await coins.map(async (coin: any) => {
    //   const res: any = await this.fetchCoinInfoByCode({ code: coin.coinName });
    //   if (!res.isError) {
    //     const coinInfo = res.data;
    //     return {
    //       ...coin,
    //       price: coinInfo.price,
    //       priceChange: coinInfo.priceChange,
    //       percentChange: coinInfo.percentChange,
    //       profitLossAmount: coinInfo.priceChange * coin.quantity,
    //       totalValue: coinInfo.price * coin.quantity,
    //     };
    //   } else return coin;
    // });
    // Promise.all(data).then((arr) => {
    //   this.cryptoDetail = arr;
    // });
  }

  async fetchCoinInfoByCode({ code }: { code: string }) {
    const res: any = await coinGeckoService.getCoinInfoByCode({
      coinCode: code.toLowerCase(),
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
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.bankingDetail = res.data;
    } else {
      this.bankingDetail = undefined;
    }
  }

  async fetchRealEstate() {
    const url = `/portfolio/${this.portfolioId}/realEstate`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.realEstateDetail = res.data;
    } else {
      this.realEstateDetail = undefined;
    }
  }

  async fetchCash() {
    const url = `/portfolio/${this.portfolioId}/cash`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.cashDetail = res.data;
    } else {
      this.cashDetail = undefined;
    }
  }

  async addNewRealEstate(params: NewRealEstateAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/realEstate`;
    const res: { isError: boolean; data: any } = await httpService.post(url, {
      name: params.name,
      inputDay: params.inputDay,
      inputMoneyAmount: params.inputMoneyAmount,
      inputCurrency: params.inputCurrency,
      buyPrice: params.inputMoneyAmount,
      currentPrice: params.currentPrice,
      description: params.description,
    });
    rootStore.stopLoading();
    if (!res.isError) {
      await this.fetchRealEstate();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewBankSaving(params: NewBanksSavingAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: { isError: boolean; data: any } = await httpService.post(url, {
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
    rootStore.stopLoading();
    if (!res.isError) {
      await this.fetchBankSaving();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewCryptoCurrency(params: NewCryptoCurrencyAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      {},
    );
    rootStore.stopLoading();
    if (!res.isError) {
      await this.fetchBankSaving();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewStock(params: NewStockAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      {},
    );
    rootStore.stopLoading();
    if (!res.isError) {
      await this.fetchBankSaving();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewCash(params: NewCashAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/cash`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      await this.fetchCash();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async searchData({
    type,
    searchingText,
  }: {
    type: string;
    searchingText: string;
  }): Promise<Array<SearchingDataItem>> {
    rootStore.startLoading();
    var res: { isError: boolean; data: any };
    switch (type) {
      case 'stocks':
        res = await finhubService.searchForStock(searchingText);
      case 'crypto':
        res = await coinGeckoService.searchForCoin(searchingText);
      case 'currency':
        res = { isError: true, data: [] };
      case 'gold':
        res = { isError: true, data: [] };
      default:
        res = { isError: true, data: [] };
    }
    rootStore.stopLoading();
    if (!res.isError) return res.data;
    else return [];
  }

  async fetchSankeyFlowData() {
    var raw = await portfolioService.getCashFlowData(this.portfolioId);
    this.sankeyFlowData = raw.map((link) => {
      return {
        source: `${link.sourceType}@@${link.sourceName}`,
        target: `${link.targetType}@@${link.targetName}`,
        //error: type 'string' is incompatible with 'string',
        // value: link.amount.toString(),
        value: link.amount,
      };
    });
  }
}

export const portfolioDetailStore = new PortfolioDetailStore();
