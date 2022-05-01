import { action, computed, makeAutoObservable, observable } from 'mobx';
import {
  coinGeckoService,
  httpService,
  finhubService,
  portfolioService,
} from 'services';
import { content } from 'i18n';
import {
  PortfolioAllocation,
  RealEstateItem,
  BankSavingItem,
  CashItem,
  CryptoItem,
  PieChartItem,
  StockItem,
  PersonalInterestCustomAssetItem,
  CustomAssetItemByCategory,
} from 'shared/models';
import {
  Portfolio,
  NewStockAsset,
  NewCryptoCurrencyAsset,
  SearchingDataItem,
  NewBanksSavingAsset,
  NewRealEstateAsset,
  NewCashAsset,
  SankeyDataLink,
  NewPortfolioCustomAsset,
  AssetType,
} from 'shared/types';
import { AssetTypeName } from 'shared/constants';
import { portfolioStore, rootStore } from 'shared/store';
import { httpError } from 'shared/helpers';
import { portfolioData } from './portfolio-data';

class PortfolioDetailStore {
  portfolioId: number = 0;
  portfolioName: string = '';
  currencyCode: string = '';
  selectedTabs: string = 'holdings';

  portfolioValue: number = 0;
  todaysChange: number = 0;
  customAssetList: Array<PersonalInterestCustomAssetItem> | undefined =
    undefined;

  stockDetail: Array<StockItem> | undefined = undefined;
  cryptoDetail: Array<CryptoItem> | undefined = undefined;
  cashDetail: Array<CashItem> | undefined = undefined;
  realEstateDetail: Array<RealEstateItem> | undefined = undefined;
  bankingDetail: Array<BankSavingItem> | undefined = undefined;
  customAssetDetail: Array<CustomAssetItemByCategory> | undefined = undefined;

  isOpenAddNewAssetModal: boolean = false;
  searchedStockDetail: any = undefined;
  searchedCryptoDetail: any = undefined;

  isOpenDeleteAssetModal: boolean = false;
  deletedAssetInfo:
    | { assetType: AssetType; assetId: number; portfolioId: number }
    | undefined = undefined;

  sankeyFlowData: Array<SankeyDataLink> = [];
  pieChartData: Array<PieChartItem> | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      portfolioName: observable,
      currencyCode: observable,
      selectedTabs: observable,

      stockDetail: observable,
      cryptoDetail: observable,
      cashDetail: observable,
      realEstateDetail: observable,
      bankingDetail: observable,
      customAssetDetail: observable,

      isOpenAddNewAssetModal: observable,
      searchedStockDetail: observable,
      searchedCryptoDetail: observable,

      isOpenDeleteAssetModal: observable,
      deletedAssetInfo: observable,

      sankeyFlowData: observable,
      pieChartData: observable,

      setOpenAddNewAssetModal: action,
      setOpenDeleteAssetModal: action,
      setPortfolioId: action,

      fetchRealEstate: action,
      fetchPersonalCustomAsset: action,
      fetchSankeyFlowData: action,
      fetchBankSaving: action,
      fetchCryptoCurrency: action,
      fetchStock: action,
      fetchCash: action,

      addNewBankSaving: action,
      addNewRealEstate: action,
      addNewCryptoCurrency: action,
      addNewStock: action,

      getStockInfoById: action,
      getCryptoInfoById: action,

      getDeletedAssetDetail: computed,
      isMissingHoldingsData: computed,
      isMissingReportData: computed,
    });
  }

  setOpenAddNewAssetModal(isOpen: boolean) {
    this.isOpenAddNewAssetModal = isOpen;
  }

  setOpenDeleteAssetModal(isOpen: boolean) {
    this.isOpenDeleteAssetModal = isOpen;
  }

  setPortfolioId(id: string) {
    this.portfolioId = Number.parseInt(id);
  }

  setSelectedTabs(newTab: string) {
    this.selectedTabs = newTab;
  }

  setPortfolioName(portfolioId: string) {
    this.portfolioName =
      portfolioStore.portfolio.find(
        (item: Portfolio) => item.id === portfolioId,
      )?.name || '';
  }

  setDeletedAssetInfo(
    assetType: AssetType,
    assetId: string,
    portfolioId: string,
  ) {
    this.deletedAssetInfo = {
      assetType: assetType,
      assetId: Number.parseInt(assetId),
      portfolioId: Number.parseInt(portfolioId),
    };
  }

  get getDeletedAssetDetail() {
    switch (this.deletedAssetInfo?.assetType) {
      case AssetTypeName.cryptoCurrency:
        var crypto = this.cryptoDetail?.find(
          (item) => item.id === this.deletedAssetInfo?.assetId,
        );
        return crypto;
      case AssetTypeName.cash:
        var cash = this.cashDetail?.find(
          (item) => item.id === this.deletedAssetInfo?.assetId,
        );
        return cash;
      case AssetTypeName.stock:
        var stock = this.stockDetail?.find(
          (item) => item.id === this.deletedAssetInfo?.assetId,
        );
        return stock;
      case AssetTypeName.bankSavings:
        var bankSaving = this.bankingDetail?.find(
          (item) => item.id === this.deletedAssetInfo?.assetId,
        );
        return bankSaving;
      case AssetTypeName.realEstate:
        var realEstate = this.realEstateDetail?.find(
          (item) => item.id === this.deletedAssetInfo?.assetId,
        );
        return realEstate;
      default:
        return undefined;
    }
  }

  async fetchInitialData() {
    this.currencyCode = 'usd';
    await this.fetchBankSaving();
    await this.fetchCash();
    await this.fetchCryptoCurrency();
    await this.fetchStock();
    await this.fetchRealEstate();
    await this.fetchOtherCustomAsset();
  }

  async fetchPersonalCustomAsset() {
    const url = '/personalAsset/interest/custom';
    const res: { isError: boolean; data: any } = await httpService.get(url);

    if (!res.isError) {
      this.customAssetList = res.data;
    } else {
      rootStore.raiseError(content[rootStore.locale].error.default);
      this.customAssetList = undefined;
    }
  }

  async fetchStock() {
    const url = `/portfolio/${this.portfolioId}/stock`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.stockDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.stockDetail = undefined;
    }
  }

  async fetchCryptoCurrency() {
    const url = `/portfolio/${this.portfolioId}/crypto`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.cryptoDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.cryptoDetail = undefined;
    }
  }

  async fetchBankSaving() {
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.bankingDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.bankingDetail = undefined;
    }
  }

  async fetchRealEstate() {
    const url = `/portfolio/${this.portfolioId}/realEstate`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.realEstateDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.realEstateDetail = undefined;
    }
  }

  async fetchCash() {
    const url = `/portfolio/${this.portfolioId}/cash`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.cashDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.cashDetail = undefined;
    }
  }

  async fetchOtherCustomAsset() {
    const url = `/portfolio/${this.portfolioId}/custom`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.customAssetDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.customAssetDetail = undefined;
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
      this.realEstateDetail?.push(res.data);
      this.fetchPieChartData();
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
      this.bankingDetail?.push(res.data);
      this.fetchPieChartData();
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
      this.cryptoDetail?.push(res.data);
      this.fetchPieChartData();
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
      this.stockDetail?.push(res.data);
      this.fetchPieChartData();
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
      this.cashDetail?.push(res.data);
      this.fetchPieChartData();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewOtherCustomAsset(params: NewPortfolioCustomAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/custom/${params.customInterestAssetInfoId}`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      this.customAssetDetail?.push(res.data);
      this.fetchOtherCustomAsset();
      this.fetchPieChartData();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async searchData({
    type,
    searchingText,
  }: {
    type: AssetType;
    searchingText: string;
  }): Promise<Array<SearchingDataItem>> {
    rootStore.startLoading();
    var res: { isError: boolean; data: any };
    switch (type) {
      case AssetTypeName.stock:
        res = await finhubService.searchForStock(searchingText);
        break;
      case AssetTypeName.cryptoCurrency:
        res = await coinGeckoService.searchForCoin(searchingText);
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
    var raw = await portfolioService.getCashFlowData(
      this.portfolioId.toString(),
    );
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

  async fetchPieChartData() {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/pieChart`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    rootStore.stopLoading();
    if (!res.isError) {
      this.pieChartData = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.pieChartData = undefined;
    }
  }

  async deleteAsset() {
    if (this.deletedAssetInfo !== undefined) {
      rootStore.startLoading();
      const url = `/portfolio/${this.portfolioId}/${this.deletedAssetInfo.assetType}/${this.deletedAssetInfo.assetId}`;
      const res: { isError: boolean; data: any } = await httpService.delete(
        url,
      );
      rootStore.stopLoading();
      if (!res.isError) {
        rootStore.raiseNotification(
          content[rootStore.locale].success.delete,
          'success',
        );
        switch (this.deletedAssetInfo.assetType) {
          case AssetTypeName.cryptoCurrency:
            this.cryptoDetail = this.cryptoDetail?.filter(
              (item) => item.id !== res.data.id,
            );
            break;
          case AssetTypeName.stock:
            this.stockDetail = this.stockDetail?.filter(
              (item) => item.id !== res.data.id,
            );
            break;
          case AssetTypeName.bankSaving:
            this.bankingDetail = this.bankingDetail?.filter(
              (item) => item.id !== res.data.id,
            );
            break;
          case AssetTypeName.realEstate:
            this.realEstateDetail = this.realEstateDetail?.filter(
              (item) => item.id !== res.data.id,
            );
            break;
          case AssetTypeName.cash:
            this.cashDetail = this.cashDetail?.filter(
              (item) => item.id !== res.data.id,
            );
            break;
          case AssetTypeName.other:
            this.customAssetDetail = this.customAssetDetail?.map((item) => {
              const assetList = item.assets.filter(
                (cur) => cur.id !== res.data.id,
              );
              return {
                ...item,
                assets: assetList,
              };
            });
            break;
          default:
            break;
        }
        this.fetchPieChartData();
      } else {
        rootStore.raiseError(content[rootStore.locale].error.default);
      }
    }
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

  get isMissingHoldingsData(): boolean {
    return (
      this.bankingDetail === undefined &&
      this.cryptoDetail === undefined &&
      this.cashDetail === undefined &&
      this.stockDetail === undefined &&
      this.cryptoDetail === undefined &&
      this.realEstateDetail === undefined &&
      this.customAssetDetail === undefined
    );
  }

  get isMissingReportData(): boolean {
    return this.pieChartData === undefined;
  }
}

export const portfolioDetailStore = new PortfolioDetailStore();
