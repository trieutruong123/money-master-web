import Router from "next/router";
import { httpError } from "shared/helpers";
import { mainConstant } from "shared/constants";
import { cryptoService, httpService, storageService } from "services";
import { userStore, authStore } from "shared/store";
import { facebookAuth, googleAuth } from "services";
import { UserInfo } from "shared/models";
export const userService = {
  register,
  login,
  logout,
  googleAuthentication,
  facebookAuthentication,
  isLoggedIn,
  fetchUserInfo,
  isAuthToken,
};

function isLoggedIn() {
  return (
    storageService.getLocalStorage(mainConstant.TOKEN_KEY) && userStore.user
  );
}

function isAuthToken() {
  return !!storageService.getLocalStorage(mainConstant.TOKEN_KEY);
}

async function register(params: { email: string; password: string }) {
  authStore.setAuthenticating(true);
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  const url = "/user";
  const res: any = await httpService.post(url, {
    email: params.email,
    password: params.password,
  });
  if (!res.isError) {
    storageService.setLocalStorage(mainConstant.TOKEN_KEY, res.data.token);
  }
  return res;
}

async function login(params: { email: string; password: string }) {
  authStore.setAuthenticating(true);
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  const url = "/authentication";
  const res: any = await httpService.post(url, {
    email: params.email,
    password: params.password,
  });
  if (!res.isError) {
    const encryptedToken = cryptoService.encrypt(res.data.token);
    storageService.setLocalStorage(mainConstant.TOKEN_KEY, encryptedToken);
    userStore.updateUser({ ...res.data });
  }
  authStore.setAuthenticating(false);
  return res;
}

async function googleAuthentication() {
  authStore.setAuthenticating(true);
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  const res: any = await googleAuth.googleLogin();
  if (res.isError) {
    const url = "/authentication/google";
    const res2: any = await httpService.post(url, {
      externalToken: res.data?.token,
      provider: "google",
    });
    if (!res2?.isError) {
      storageService.setLocalStorage(mainConstant.TOKEN_KEY, res2.data.token);
      userStore.updateUser({ ...res2.data });
    }
    authStore.setAuthenticating(false);
    return res2;
  } else {
    authStore.setAuthenticating(false);
    return res;
  }
}

async function facebookAuthentication() {
  authStore.setAuthenticating(true);
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  const res: any = await facebookAuth.facebookLogin();
  if (res.isError) {
    const url = "/authentication/facebook";
    const res2: any = await httpService.post(url, {
      externalToken: res.data?.token,
      provider: "facebook",
    });
    if (!res2?.isError) {
      storageService.setLocalStorage(mainConstant.TOKEN_KEY, res2.data.token);
      userStore.updateUser({ ...res2.data });
    }
    authStore.setAuthenticating(false);
    return res2;
  } else {
    authStore.setAuthenticating(false);
    return res;
  }
}

async function logout() {
  googleAuth.signOut();
  facebookAuth.signOut();
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
}

async function fetchUserInfo() {
  authStore.setAuthenticating(true);
  const url = "/user/me";
  const res: any = await httpService.get(url);
  if (!res.isError) {
    userStore.updateUser({ ...res.data });
    authStore.setAuthenticating(false);
    return true;
  } else {
    const status = res.data?.status;
    authStore.setAuthenticating(false);
    if (status in [401, 500]) {
      return false;
    }
  }
  return true;
}
