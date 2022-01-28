import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const AlertType = {
  Success: 'Success',
  Error: 'Error',
  Info: 'Info',
  Warning: 'Warning',
};
class AlerServices {
  alertSubject = new Subject();
  defaultId = 'default-alert';

  onAlert(id: string = this.defaultId) {
    return this.alertSubject.asObservable().pipe(filter((x:any) => x && x.id === id));
  }

  success(message: string, options: any) {
    alert({ ...options, type: AlertType.Success, message });
  }

  error(message: string, options: any) {
    alert({ ...options, type: AlertType.Error, message });
  }

  info(message: string, options: any) {
    alert({ ...options, type: AlertType.Info, message });
  }

  warn(message: string, options: any) {
    alert({ ...options, type: AlertType.Warning, message });
  }

  alert(alert: any) {
    alert.id = alert.id || this.defaultId;
    alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
    this.alertSubject.next(alert);
  }

  clear(id: string = this.defaultId) {
    this.alertSubject.next({ id });
  }
}

export const alertService = new AlerServices();
