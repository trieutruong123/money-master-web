import { httpService } from '../../services/http-service';
import { action, observable, runInAction } from 'mobx';
import { makeAutoObservable } from 'mobx';
import { RPFormContants } from 'shared/constants';
import { rootStore } from './root.store';

class AccountStore {
  currentForm: string = RPFormContants.sendEmail;
  email: string = '';
  constructor() {
    makeAutoObservable({
      currentForm: observable,
      email: observable,

      setNextForm: action,
      setEmail: action,
      sendEmail: action,
      verifyOTPCode: action,
      resetNewPassword: action,
      resetInitialState: action,
    });
  }

  setNextForm(type: string) {
    this.currentForm = type;
    console.log(type);
  }

  setEmail(email: string) {
    this.email = email;
  }

  async sendEmail(payload: { email: string; lang: string }) {
    rootStore.startLoading();

    const url = '/account/forgetPassword';
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      payload,
    );

    rootStore.stopLoading();

    if (!res.isError) {
      runInAction(() => {
        this.email = res.data.email;
        this.currentForm = RPFormContants.verifyOTP;
      });
    } else {
    }
    return res;
  }

  async verifyOTPCode(payload: { otpCode: string; email: string }) {
    rootStore.startLoading();

    const url = '/account/otp';
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      payload,
    );
    rootStore.stopLoading();

    return res;
  }

  async resetNewPassword(payload: { email: string; newPassword: string }) {
    rootStore.startLoading();
    const url = '/account/resetPassword';
    const res: { isError: boolean; data: any } = await httpService.put(
      url,
      payload,
    );
    rootStore.stopLoading();
    return res;
  }

  resetInitialState() {
    this.currentForm = RPFormContants.sendEmail;
    this.email = '';
  }
}

export const accountStore = new AccountStore();
