import { facebookAuth,googleAuth } from 'services/firebase-service';
import { cryptoService } from './crypto-service';
import { storageService } from './storage-service';
import { alertService } from './alert-service';
import { userService } from './user-service';
import { httpService } from './http-service';
import { coinGeckoService } from './coingecko-service';

export {
  coinGeckoService,
  httpService,
  userService,
  storageService,
  alertService,
  cryptoService,
  facebookAuth,
  googleAuth,
};
