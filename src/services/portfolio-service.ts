import { Portfolio } from "../shared/types";
import { httpService } from "./http-service";

export const portfolioService = {
  getPortfolioList,
  addNewPortfolio,
  getCashFlowData,
};

function getCashFlowData(portfolioId: string) {
  return [
    {
      sourceType: "banking",
      sourceName: "ACB Bank",
      targetType: "crypto",
      targetName: "Bitcoin",
      date: "26/01/2022",
      amount: 100,
      price: 23000,
    },
    {
      sourceType: "banking",
      sourceName: "ACB Bank",
      targetType: "banking",
      targetName: "Techcombank",
      date: "26/01/2022",
      amount: 120,
      price: 23000,
    },
    {
      sourceType: "banking",
      sourceName: "Techcombank",
      targetType: "cash",
      targetName: "USD",
      date: "26/01/2022",
      amount: 130,
      price: 23000,
    },
    {
      sourceType: "crypto",
      sourceName: "Bitcoin",
      targetType: "cash",
      targetName: "USD",
      date: "26/01/2022",
      amount: 80,
      price: 23000,
    },
    {
      sourceType: "banking",
      sourceName: "ACB Bank",
      targetType: "cash",
      targetName: "EUR",
      date: "26/01/2022",
      amount: 70,
      price: 23000,
    },
    {
      sourceType: "cash",
      sourceName: "EUR",
      targetType: "cash",
      targetName: "USD",
      date: "26/01/2022",
      amount: 70,
      price: 23000,
    },
  ];
}

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
