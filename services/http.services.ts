import axios from 'axios';

class HttpService {
  BASE_URL = process.env.NEXT_APP_BASE_URL;

  LOCAL_URL = process.env.NEXT_APP_LOCAL_URL;

  async sendGet(url: any, token?: string) {
    try {
      const response = await axios.get(`${this.BASE_URL}${url}`, {
        headers: this.getHeader(token),
      });

      return response.data;
    } catch (error: any) {}
  }

  async sendPost(url: any, body: object, token?: string) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}${url}`,
        JSON.stringify(body),
        {
          headers: this.getHeader(token),
        }
      );
      return response.data;
    } catch (error: any) {}
  }

  async sendPut(url: any, body: object, token?: string) {
    try {
      const response = await axios.put(
        `${this.BASE_URL}${url}`,
        JSON.stringify(body),
        {
          headers: this.getHeader(token),
        }
      );
      return response.data;
    } catch (error: any) {}
  }

  async sendDelete(url: any, token?: string) {
    try {
      const response = await axios.delete(`${this.BASE_URL}${url}`, {
        headers: this.getHeader(token),
      });

      return response.data;
    } catch (error: any) {}
  }

  getBearerToken() {
    const token = localStorage.getLocalStorage('TOKEN');

    return `Bearer ${token}`;
  }

  getHeader(token: string | undefined) {
    const headers: any = token
      ? {
          Authorization: token,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        };
    return headers;
  }

}

export const httpService = new HttpService();
