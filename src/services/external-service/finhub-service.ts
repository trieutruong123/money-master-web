import { SearchingStockItem } from "../../shared/models/portfolio-asset.model";
import axios from "axios";
import { mainConstant } from "shared/constants";
import { SearchingDataItem } from "shared/types";

export const finhubService = {
  getStockInfoByCode,
  searchForStock,
  getStockOHCL,
  getMarketNews
};

const BASE_URL = mainConstant.STOCK_API_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_FINHUB_TOKEN;

async function getStockInfoByCode(params: any) {
  const url = `/quote?symbol=${params.symbol}&token=${ACCESS_TOKEN}`;
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      isError: false,
      data: response.data,
    };
  } catch (error: any) {
    return {
      isError: true,
      data: error.response,
    };
  }
}

async function searchForStock(searchingText: string) {
  const url = `/search?q=${searchingText}&token=${ACCESS_TOKEN}`;
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      isError: false,
      data: parseSearchingData(response.data),
    };
  } catch (error: any) {
    return {
      isError: true,
      data: error.response,
    };
  }
}

async function getStockOHCL(params: any) {
  const url = `/stock/candle?symbol=${params?.stockId}&resolution=${params.resolution}&from=${params.startDate}&to=${params.endDate}&token=${ACCESS_TOKEN}`;
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      isError: false,
      data: response.data,
    };
  } catch (error: any) {
    return {
      isError: true,
      data: error.response,
    };
  }
}

const parseSearchingData = (searchingResult: any): Array<SearchingDataItem> => {
  try {
    const { count, result } = searchingResult;
    const searchingData: Array<SearchingDataItem> = result.map(
      (item: SearchingStockItem) => {
        return {
          id: item.symbol,
          name: item.description,
          symbol: item.symbol,
        };
      }
    );
    return searchingData;
  } catch (ex: any) {
    return [];
  }
};

async function getMarketNews(){
  const url = `/news?category=general&token=${ACCESS_TOKEN}`;
  console.log(`${BASE_URL}${url}`)
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      isError: false,
      data: response.data,
    };
  } catch (error: any) {
    return {
      isError: true,
      data: error.response,
    };
  }
}
