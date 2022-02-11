import { cryptoService } from "./crypto-service";
import axios from "axios";
import { mainConstant } from "helpers";
import { storageService } from "services";

export const httpService = {
  get: sendGet,
  post: sendPost,
  put: sendPut,
  delete: sendDelete,
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function sendGet(url: string) {
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: getHeader(),
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

async function sendPost(url: string, body: object) {
  try {
    const response = await axios.post(
      `${BASE_URL}${url}`,
      JSON.stringify(body),
      { headers: getHeader() }
    );

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

async function sendPut(url: string, body: object) {
  try {
    const response = await axios.put(
      `${BASE_URL}${url}`,
      JSON.stringify(body),
      { headers: getHeader() }
    );

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

async function sendDelete(url: string) {
  try {
    const response = await axios.delete(`${BASE_URL}${url}`, {
      headers: getHeader(),
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

function authHeader() {
  const token: any = storageService.getLocalStorage(mainConstant.TOKEN_KEY);
  //const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (token !== undefined && token != null) {
    const decryptedToken = cryptoService.decrypt(token);
    return { Authorization: `Bearer ${decryptedToken}` };
  } else {
    return {};
  }
}

function getHeader() {
  const Headers: any = {
    "Content-Type": "application/json",
  };
  return Headers;
}
