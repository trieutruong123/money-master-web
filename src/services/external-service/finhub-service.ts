import axios from 'axios';
import { mainConstant } from 'helpers';

export const finhubService = {
  getStockInfoByCode,
  searchForStock,
  getStockOHCL,
};

const BASE_URL = mainConstant.STOCK_API_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_FINHUB_TOKEN;

async function getStockInfoByCode(params: any) {
  const url = `/quote?symbol=${params.symbol}&token=${ACCESS_TOKEN}`;
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
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

async function searchForStock() {}

async function getStockOHCL(params: any) {
  const url = `/stock/candle?symbol=${params?.stockId}&resolution=${params.resolution}&from=${params.startDate}&to=${params.endDate}&token=${ACCESS_TOKEN}`;
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
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
