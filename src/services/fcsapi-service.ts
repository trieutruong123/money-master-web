import axios from 'axios';

export const fcsapiService = {
  getForexInfoByCode,
  getForexOHCL,
};

const BASE_URL = 'https://fcsapi.com/api-v3';
const ACCESS_KEY=process.env.NEXT_PUBLIC_FCSAPI_ACCESS_KEY|| '';

async function getForexInfoByCode(params: any) {
  const url = `/forex/latest?symbol=${params.symbol}&access_key=${ACCESS_KEY}`
  console.log('My url:',url);
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(`${BASE_URL}${url}`);
    console.log(response.data);

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


async function getForexOHCL(params: any) {
  const url = `/forex/history?symbol=${params.symbol}&period=${params.timeFrame}&access_key=${ACCESS_KEY}`;
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      isError: false,
      data: response.data.response,
    };
  } catch (error: any) {
    return {
      isError: true,
      data: error.response,
    };
  }
}
