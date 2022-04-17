import { CryptoItem, StockItem } from './../../models/portfolio-asset.model';
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
  stockDetail: Array<StockItem> | undefined = undefined;
  cryptoDetail: Array<CryptoItem> | undefined = undefined;
  cashDetail: Array<CashItem> | undefined = undefined;
  realEstateDetail: Array<RealEstateItem> | undefined = undefined;
  bankingDetail: Array<BankSavingItem> | undefined = undefined;
  searchedStockDetail: any = undefined;
  searchedCryptoDetail: any = undefined;
  portfolioValue: number = 0;
  todaysChange: number = 0;
  isOpenAddNewAssetModal: boolean = false;
  currencyCode: string = '';
  sankeyFlowData: Array<SankeyDataLink> = [];

  constructor() {
    makeAutoObservable(this, {
      searchedStockDetail: observable,
      searchedCryptoDetail: observable,
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
      setPortfolioId: action,
      fetchRealEstate: action,
      addNewBankSaving: action,
      addNewRealEstate: action,
      addNewCryptoCurrency: action,
      addNewStock: action,
      fetchSankeyFlowData: action,
      getStockInfoById: action,
      getCryptoInfoById: action,
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
    const portfolioDetail = portfolioData.portfolioData;
    return true;
  }

  async fetchStock() {
    const url = `/portfolio/${this.portfolioId}/stock`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.stockDetail = res.data;
    } else {
      this.stockDetail = undefined;
    }
  }

  async fetchCryptoCurrency() {
    const url = `/portfolio/${this.portfolioId}/crypto`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.cryptoDetail = res.data;
    } else {
      this.cryptoDetail = undefined;
    }
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
    const url = `/portfolio/${this.portfolioId}/crypto`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      await this.fetchBankSaving();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewStock(params: NewStockAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/stock`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
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
        break;
      case 'cryptoCurrency':
        res = await coinGeckoService.searchForCoin(searchingText);
        break;
      case 'currency':
        res = { isError: true, data: [] };
        break;
      case 'gold':
        res = { isError: true, data: [] };
        break;
      default:
        res = { isError: true, data: [] };
        break;
    }
    rootStore.stopLoading();
    if (!res.isError) return res.data.slice(0, 100);
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

  async getStockInfoById(stockId: string) {
    rootStore.startLoading();
    const res = await finhubService.getStockInfoByCode({
      symbol: stockId.toUpperCase(),
    });
    rootStore.stopLoading();
    if (!res.isError) {
      this.searchedStockDetail = res.data;
    } else this.searchedStockDetail = undefined;
  }

  async getCryptoInfoById(coinCode: string) {
    rootStore.startLoading();
    const res = await coinGeckoService.getCoinInfoByCode({
      coinCode: coinCode.toLowerCase(),
      exclude: {
        localization: true,
        ticker: true,
        communityData: true,
        developerData: true,
      },
    });
    rootStore.stopLoading();
    if (!res.isError) {
      this.searchedCryptoDetail = res.data?.market_data?.current_price;
    } else this.searchedCryptoDetail = undefined;
  }
}

export const portfolioDetailStore = new PortfolioDetailStore();
