import axios from 'axios';
import { mainConstant } from 'shared/constants';
import { SearchingCryptoItem } from 'shared/models';
import { SearchingDataItem } from 'shared/types';

export const coinGeckoService = {
  getCoinInfoByCode,
  searchForCoin,
  getCoinOHCL,
};

const BASE_URL = mainConstant.CRYPTO_API_URL;

async function getCoinInfoByCode(params: any) {
  const url = `/coins/${params?.coinCode}?${
    params?.exclude?.localization ? 'localization=false' : ''
  }${params?.exclude?.tickers ? '&tickers=false' : ''}${
    params?.exclude?.marketData ? '&market_data=false' : ''
  }${params?.exclude?.communityData ? '&community_data=false' : ''}&${
    params?.exclude?.developerData ? '&developer_data=false' : ''
  }${params?.exclude?.sparkline ? '&sparkline=false' : ''}`;
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
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

async function searchForCoin(searchingText: string) {
  const url = `/search?query=${searchingText}`;
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

async function getCoinOHCL(params: any) {
  const url = `/coins/${params?.coinCode}/ohlc?vs_currency=${params.vsCurrency}&days=${params.days}`;
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

const parseSearchingData = (searchingResult: any): Array<SearchingDataItem> => {
  const { categories, coins, exchanges, icos, nfts } = searchingResult;
  const coinsResult: Array<SearchingDataItem> = coins.map(
    (item: SearchingCryptoItem) => {
      return { id: item.id, name: item.name, symbol: item.symbol };
    },
  );

  const nftsResult: Array<SearchingDataItem> = nfts.map(
    (item: SearchingCryptoItem) => {
      return { id: item.id, name: item.name, symbol: item.symbol };
    },
  );
  const result = coinsResult.concat(nftsResult);
  return result;
};
