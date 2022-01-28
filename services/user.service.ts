import { httpService } from './http.services';

class UserService {
  async register(user: object) {
    const url = 'autheticate/register';
    const response = await httpService.sendPost(url, user);
  }

  async login(username: string, password: string) {
    const url = 'authenticate/login';
    const reponse = await httpService
      .sendPost(url, { username, password })
      .then((response: any) => {
        this.storeUser(response);
      });
  }

  storeUser(response: any) {
    localStorage.setItem('TOKEN', JSON.stringify(response.token));
    localStorage.setItem('token', JSON.stringify(response.user));
  }
}

export const userService = new UserService();
