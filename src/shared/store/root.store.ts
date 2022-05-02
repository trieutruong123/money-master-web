import { action, computed, makeAutoObservable, observable } from 'mobx';
import { NotificationType, SupportedLanguage } from 'shared/types';

class RootStore {
  isLoading: boolean = false;
  message: string = '';
  isNotified: boolean = false;
  variant: NotificationType = 'error';
  locale: SupportedLanguage = 'en';
  constructor() {
    makeAutoObservable(this, {
      isLoading: observable,
      message: observable,
      isNotified: observable,
      setLoading: action,
      setMessage: action,
      setNotified: action,
      setLocale: action,
    });
  }

  setLocale(locale: SupportedLanguage) {
    this.locale = locale;
  }

  setLoading(state: boolean) {
    this.isLoading = state;
  }
  startLoading() {
    this.setLoading(true);
  }

  stopLoading() {
    this.setLoading(false);
  }

  setNotified(state: boolean) {
    this.isNotified = state;
  }

  setMessage(message: string) {
    this.message = message;
  }

  setVariant(variant: NotificationType) {
    this.variant = variant;
  }

  raiseError(errorMessage?: string) {
    this.setNotified(true);
    this.setVariant('error');
    const message =
      typeof errorMessage !== 'string' || errorMessage?.length !== 0
        ? 'Error! :('
        : errorMessage;
    this.setMessage(message);
  }

  raiseNotification(message: string, variant: NotificationType) {
    this.setNotified(true);
    this.setVariant(variant);
    this.setMessage(message);
  }

  deleteNotification() {
    this.setNotified(false);
    this.setMessage('');
  }
}

export const rootStore = new RootStore();
