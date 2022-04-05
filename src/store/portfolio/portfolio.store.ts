import { action, makeAutoObservable, observable } from "mobx";
import { Portfolio } from "types";
import { portfolioService } from "services";

class PortfolioStore {
  portfolio: Array<Portfolio> = [];
  isOpenAddNewPortfolioModal: boolean = false;
  constructor() {
    makeAutoObservable(this, {
      portfolio: observable,
      isOpenAddNewPortfolioModal: observable,
      setOpenAddNewPortfolioModal: action,
      fetchPortfolioData: action,
      addNewPortfolio: action,
    });
  }

  setOpenAddNewPortfolioModal(isOpen: boolean) {
    this.isOpenAddNewPortfolioModal = isOpen;
  }

  async fetchPortfolioData() {
    this.portfolio = await portfolioService.getPortfolioList();
  }

  async addNewPortfolio(data: any) {
    portfolioService
      .addNewPortfolio(data)
      .then((portfolio) => this.portfolio.push(portfolio));
  }
}

export const portfolioStore = new PortfolioStore();
