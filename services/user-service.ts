import  Router  from "next/router";
import { mainConstant } from 'helpers';
import { httpService, storageService } from "services";

export const userService = {
  register,
  login,
  logout,
  authenticate,
};

async function register(params: { email: string; password: string }) {
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  const url = "/user";
  const res:any = await httpService.post(url, {
    email: params.email,
    password: params.password,
  });
  console.log(res);
  if(!res.isError){
    storageService.setLocalStorage(mainConstant.TOKEN_KEY,res.data.token)
  }
  return res;
}

async function login(params: { email: string; password: string }) {
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  const url = "/authentication";
  const res :any= await httpService
    .post(url, { email: params.email, password: params.password })
  console.log(res);
    if(!res.isError){
    storageService.setLocalStorage(mainConstant.TOKEN_KEY,res.data.token)
  }
  return res;
}


async function authenticate(param:any)
{

}

async function logout() {
  storageService.deleteLocalStorage(mainConstant.TOKEN_KEY);
  Router.push('/login');
}

