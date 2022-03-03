import { action, makeAutoObservable, observable } from 'mobx';
import { UserInfo } from 'models';
import { PortfolioAllocation, PortfolioItem } from 'types';

class PortfolioDetailStore {
  portfolioAllocationData: Array<PortfolioAllocation> = [];
  portfolioDetailData: Array<PortfolioItem> = [];
  portfolioValue: number = 0;
  todaysChange: number = 0;
  isOpenAddNewAssetModal: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      portfolioAllocationData: observable,
      portfolioDetailData: observable,
      portfolioValue: observable,
      todaysChange: observable,
      isOpenAddNewAssetModal: observable,
      setOpenAddNewAssetModal: action,
      fetchPortfolioDetailData: action,
    });
  }

  setOpenAddNewAssetModal(isOpen: boolean) {
    this.isOpenAddNewAssetModal = isOpen;
  }

  async fetchPortfolioDetailData() {
    this.portfolioAllocationData = portfolioData.portfolioAllocation;
    this.portfolioDetailData = portfolioData.portfolioData;
    this.portfolioValue = portfolioData.portfolioValue;
    this.todaysChange = portfolioData.todaysChange;
    return true;
  }

  updatePortfolioDetailData() {
    return true;
  }
}

export const portfolioDetailStore = new PortfolioDetailStore();

//template data;
export const portfolioData = {
  portfolioData: [
    {
      symbol: 'AAPL',
      description: 'Apple Inc',
      price: 165.12,
      pricePaid: '99.99',
      priceChange: '0.27',
      percentChange: '0.16',
      profitLossAmount: '4.05',
      quantity: 15,
      marketValue: '2476.80',
      portfolioAllocation: '0.02',
    },
    {
      symbol: 'BTC/USD',
      description: 'Bitcoin / U.S. Dollar',
      price: 43276.28,
      pricePaid: '20000.00',
      priceChange: '5690.54',
      percentChange: '15.14',
      profitLossAmount: '1422.63',
      quantity: 0.25,
      marketValue: '10819.07',
      portfolioAllocation: '0.08',
    },
    {
      symbol: 'CRM',
      description: 'Salesforce.com, Inc',
      price: 210.53,
      pricePaid: '222.22',
      priceChange: '2.44',
      percentChange: '1.17',
      profitLossAmount: '85.40',
      quantity: 35,
      marketValue: '7368.55',
      portfolioAllocation: '0.05',
    },
    {
      symbol: 'DIS',
      description: 'The Walt Disney Company',
      price: 148.46,
      pricePaid: '115.00',
      priceChange: '-1.07',
      percentChange: '-0.72',
      profitLossAmount: '-53.50',
      quantity: 50,
      marketValue: '7423.00',
      portfolioAllocation: '0.05',
    },
    {
      symbol: 'ETH/USD',
      description: 'Ethereum / U.S. Dollar',
      price: 2943.65,
      pricePaid: '1500.00',
      priceChange: '337.54',
      percentChange: '12.95',
      profitLossAmount: '337.54',
      quantity: 1,
      marketValue: '2943.65',
      portfolioAllocation: '0.02',
    },
    {
      symbol: 'FB',
      description: 'Facebook, Inc',
      price: 211.03,
      pricePaid: '185.00',
      priceChange: '0.55',
      percentChange: '0.26',
      profitLossAmount: '8.25',
      quantity: 15,
      marketValue: '3165.45',
      portfolioAllocation: '0.02',
    },
    {
      symbol: 'GOOGL',
      description: 'Alphabet Inc Class A',
      price: 2701.14,
      pricePaid: '1725.00',
      priceChange: '11.95',
      percentChange: '0.44',
      profitLossAmount: '83.65',
      quantity: 7,
      marketValue: '18907.98',
      portfolioAllocation: '0.14',
    },
    {
      symbol: 'NFLX',
      description: 'Netflix Inc',
      price: 394.52,
      pricePaid: '500.00',
      priceChange: '3.72',
      percentChange: '0.95',
      profitLossAmount: '55.80',
      quantity: 15,
      marketValue: '5917.80',
      portfolioAllocation: '0.04',
    },
    {
      symbol: 'PYPL',
      description: 'PayPal Holdings, Inc',
      price: 111.93,
      pricePaid: '175.00',
      priceChange: '0.99',
      percentChange: '0.89',
      profitLossAmount: '4.95',
      quantity: 5,
      marketValue: '559.65',
      portfolioAllocation: '0.00',
    },
    {
      symbol: 'SPOT',
      description: 'Spotify Technology S.A.',
      price: 156.19,
      pricePaid: '333.33',
      priceChange: '4.28',
      percentChange: '2.82',
      profitLossAmount: '21.40',
      quantity: 5,
      marketValue: '780.95',
      portfolioAllocation: '0.01',
    },
    {
      symbol: 'VGT',
      description: 'Vanguard Information Technology',
      price: 403.91,
      pricePaid: '300.00',
      priceChange: '0.09',
      percentChange: '0.02',
      profitLossAmount: '4.50',
      quantity: 50,
      marketValue: '20195.50',
      portfolioAllocation: '0.15',
    },
    {
      symbol: 'VTI',
      description: 'Vanguard Total Stock Market',
      price: 221.17,
      pricePaid: '155.00',
      priceChange: '-0.24',
      percentChange: '-0.11',
      profitLossAmount: '-60.00',
      quantity: 250,
      marketValue: '55292.50',
      portfolioAllocation: '0.41',
    },
  ],
  portfolioAllocation: [
    { symbol: 'AAPL', portfolioAllocation: '0.02' },
    { symbol: 'BTC/USD', portfolioAllocation: '0.08' },
    { symbol: 'CRM', portfolioAllocation: '0.05' },
    { symbol: 'DIS', portfolioAllocation: '0.05' },
    { symbol: 'ETH/USD', portfolioAllocation: '0.02' },
    { symbol: 'FB', portfolioAllocation: '0.02' },
    { symbol: 'GOOGL', portfolioAllocation: '0.14' },
    { symbol: 'NFLX', portfolioAllocation: '0.04' },
    { symbol: 'PYPL', portfolioAllocation: '0.00' },
    { symbol: 'SPOT', portfolioAllocation: '0.01' },
    { symbol: 'VGT', portfolioAllocation: '0.15' },
    { symbol: 'VTI', portfolioAllocation: '0.41' },
  ],
  portfolioValue: 135850.9,
  todaysChange: 1.4093907364618126,
};
