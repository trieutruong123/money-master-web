import { action, computed, makeAutoObservable, observable } from 'mobx';

class AuthStore {
  isAuthenticating: boolean = false;
  errorMessage: string = '';
  constructor() {
    makeAutoObservable(this, {
      isAuthenticating: observable,
      errorMessage: observable,
      setAuthenticating: action,
      setErrorMessage: action,
    });
  }

  setAuthenticating(state: boolean) {
    this.isAuthenticating = state;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}

export const authStore = new AuthStore();
