import { action, makeAutoObservable, observable } from 'mobx';
import { UserInfo } from 'models';

class UserStore {
  user: UserInfo | null = null;
  constructor() {
    makeAutoObservable(this, {
      user: observable,
      updateUser: action,
    });
  }

  getUser(): UserInfo|null {
    return this.user;
  }

  updateUser(newUser: UserInfo) {
    this.user = new UserInfo(newUser);
  }
}

export const userStore = new UserStore();
