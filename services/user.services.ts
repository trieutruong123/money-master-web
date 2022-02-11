import { httpService } from './http.services';

class UserService {
  async register(params:{email:string, password:string}) {
    const url = 'autheticate/register';
    const response = await httpService.sendPost(url, { email:params.email, password:params.password });
  }

  async login(params:{email:string, password:string}) {
    const url = 'user/login';
    const reponse = await httpService
      .sendPost(url, { email:params.email, password:params.password })
      .then((response: any) => {
        this.storeUser(response);
      });
  }

  async logout()
  {
    this.deleteItemStorage('user');
  }

  deleteItemStorage(name:string)
  {
    localStorage.setItem(name, '')
  }

  storeUser(response: any) {
    localStorage.setItem('user', JSON.stringify(response));
  }
}

export const userService = new UserService();
