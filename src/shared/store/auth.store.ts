import { action, computed, makeAutoObservable, observable } from 'mobx';
import { userService } from 'services';
import { httpError } from 'shared/helpers';
import { rootStore } from 'shared/store';

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

  async ManualSignIn({ email, password }: { email: string; password: string }) {
    rootStore.startLoading();
    const res = await userService.login({
      email: email,
      password: password,
    });
    rootStore.stopLoading();
    if (res.isError) {
      const content = httpError.getSignInError(res);
      return { isError: true, message: content };
    } else return { isError: false, message: { en: '', vi: '' } };
  }

  async SignInWithGoogle() {
    rootStore.startLoading();
    const res = await userService.googleAuthentication();
    rootStore.stopLoading();
    return res;
  }

  async SignInWithFacebook() {
    rootStore.startLoading();
    const res = await userService.facebookAuthentication();
    rootStore.stopLoading();
    return res;
  }

  async ManualSignUp({ email, password }: { email: string; password: string }) {
    rootStore.startLoading();
    const res = await userService.register({
      email: email,
      password: password,
    });
    rootStore.stopLoading();
    if (res.isError) {
      const content = httpError.getSignInError(res);
      return { isError: true, message: content };
    } else return { isError: false, message: { en: '', vi: '' } };
  }

  async SignUpWithGoole() {
    rootStore.startLoading();
    const res = await userService.googleAuthentication();
    rootStore.stopLoading();
    return res;
  }

  async SignUpWithFacebook() {
    rootStore.startLoading();
    const res = await userService.facebookAuthentication();
    rootStore.stopLoading();

    return res;
  }
}

export const authStore = new AuthStore();
