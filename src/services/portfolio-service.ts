import { Portfolio } from "../shared/types";
import { httpService } from "./http-service";

export const portfolioService = {
  getPortfolioList,
  addNewPortfolio,
};

async function getPortfolioList() {
  const url = "/portfolio";
  const raw: any = await httpService.get(url);
  var res: Array<Portfolio> = [];
  if (!raw.isError) {
    res = raw.data.map((portfolio: any) => {
      return portfolio as Portfolio;
    });
    return res;
  }
  return res;
}

async function addNewPortfolio(data: any) {
  const url = "/portfolio";
  const res: any = await httpService.post(url, data);

  if (!res.isError) {
    return res.data;
  }
  return res;
}
