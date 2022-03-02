import { mainConstant } from 'helpers';
import { content } from 'i18n';

export const httpError = {
  handleErrorCode,
  getSignInError,
  getSignUpError,
};

function handleErrorCode(res: { isError: boolean; data: any }) {
  const {
    data: { status, statusText },
  } = res;

  const { en, vi } = content;

  switch (status) {
    case 400:
      return { en: en.error.badRequest, vi: vi.error.badRequest };
    case 401:
      localStorage.clearItem(mainConstant.TOKEN_KEY);
      return { en: en.error.unauthorizedUser, vi: vi.error.unauthorizedUser };
    case 404:
      return { en: en.error.methodNotAllowed, vi: vi.error.methodNotAllowed };
    case 500:
      //errorStore.update(error);
      return {
        en: en.error.internalServerError,
        vi: vi.error.internalServerError,
      };
    default:
      return {
        en: '',
        vi: '',
      };
  }
}

function getSignUpError(res: { isError: boolean; data: any }) {
  const {
    data: { status, statusText,data },
  } = res;

  const { en, vi } = content;

  switch (data) {
    case 'User already existed':
      return { en: en.error.alreadyEmailExist, vi: vi.error.alreadyEmailExist };
    default:
      return {
        en: '',
        vi: '',
      };
  }
}

function getSignInError(res: { isError: boolean; data: any }) {
  const {
    data: { status, statusText,data },
  } = res;

  const { en, vi } = content;

  switch (data) {
    case 'Credential failed':
      return { en: en.error.credentialFailed, vi: vi.error.credentialFailed };
    default:
      return {
        en: '',
        vi: '',
      };
  }
}
