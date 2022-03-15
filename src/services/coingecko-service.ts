import axios from 'axios';

export const coinGeckoService = {
  getCoinInfoByCode,
  searchForCoin,
  getMarketChartData,
};

const BASE_URL = 'https://api.coingecko.com/api/v3';

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
      data: response.data,
    };
  } catch (error: any) {
    return {
      isError: true,
      data: error.response,
    };
  }
}

async function searchForCoin() {}

async function getMarketChartData() {}
