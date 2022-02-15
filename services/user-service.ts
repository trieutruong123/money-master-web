import { firebaseService } from 'services/firebase-service';
import Router from 'next/router';
import { mainConstant } from 'helpers';
import { httpService, storageService } from 'services';

export const userService = {
  register,
  login,
  logout,
  googleAuthentication,
  facebookAuthentication,
};

async function register(params: { email: string; password: string }) {
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  const url = '/user';
  const res: any = await httpService.post(url, {
    email: params.email,
    password: params.password,
  });
  console.log(res);
  if (!res.isError) {
    storageService.setLocalStorage(mainConstant.TOKEN_KEY, res.data.token);
  }
  return res;
}

async function login(params: { email: string; password: string }) {
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  const url = '/authentication';
  const res: any = await httpService.post(url, {
    email: params.email,
    password: params.password,
  });
  if (!res.isError) {
    storageService.setLocalStorage(mainConstant.TOKEN_KEY, res.data.token);
  }
  return res;
}

async function googleAuthentication() {
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  const response: any = await firebaseService
    .googleLogin()
    .then(async (data: any) => {
      /*const url = "/authentication/google";
      const res: any = await httpService.post(url, { token: data?.token });
      if (!res?.isError) {
        storageService.setLocalStorage(mainConstant.TOKEN_KEY, res.data.token);
      }*/
      return data;
    })
    .catch((error) => {
      return error;
    });
}

async function facebookAuthentication() {}

async function logout() {
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  Router.push('/login');
}
