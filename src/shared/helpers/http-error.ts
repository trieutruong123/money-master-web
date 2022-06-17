import { mainConstant } from "shared/constants";
import { content } from "i18n";

export const httpError = {
  handleErrorCode,
  getSignInError,
  getSignUpError,
  handleSuccessMessage,
  getResetPasswordError,
};

type IMessageType = "edit" | "update" | "delete" | "create" | "add";
function handleSuccessMessage(type: IMessageType) {
  const { en, vi } = content;

  switch (type) {
    case "edit":
      return { en: en.success.edit, vi: vi.success.edit };
    case "update":
      return { en: en.success.update, vi: vi.success.update };
    case "delete":
      return { en: en.success.delete, vi: vi.success.delete };
    case "create":
      return { en: en.success.create, vi: vi.success.create };
    case "add":
      return { en: en.success.add, vi: vi.success.add };

    default:
      return { en: en.success.default, vi: vi.success.default };
  }
}

function handleErrorCode(res: { isError: boolean; data: any }) {
  if (typeof res.data === "undefined")
    return {
      en: "",
      vi: "",
    };

  const {
    data: { status, statusText },
  } = res;

  const { en, vi } = content;

  switch (status) {
    case 400:
      return { status, en: en.error.badRequest, vi: vi.error.badRequest };
    case 401:
      localStorage.clearItem(mainConstant.TOKEN_KEY);
      return {
        status,
        en: en.error.unauthorizedUser,
        vi: vi.error.unauthorizedUser,
      };
    case 404:
      return {
        status,
        en: en.error.methodNotAllowed,
        vi: vi.error.methodNotAllowed,
      };
    case 500:
      //errorStore.update(error);
      return {
        status,
        en: en.error.internalServerError,
        vi: vi.error.internalServerError,
      };
    default:
      return {
        status,
        en: en.success.default,
        vi: vi.success.default,
      };
  }
}

function getSignUpError(res: { isError: boolean; data: any }) {
  if (typeof res.data === "undefined")
    return {
      en: "",
      vi: "",
    };

  const {
    data: { status, statusText, data },
  } = res;

  const { en, vi } = content;

  switch (data) {
    case "User already existed":
      return { en: en.error.alreadyEmailExist, vi: vi.error.alreadyEmailExist };
    default:
      return {
        en: "",
        vi: "",
      };
  }
}

function getSignInError(res: { isError: boolean; data: any }) {
  if (typeof res.data === "undefined")
    return {
      en: "",
      vi: "",
    };

  const {
    data: { status, statusText, data },
  } = res;

  const { en, vi } = content;

  switch (data) {
    case "Credential failed":
      return { en: en.error.credentialFailed, vi: vi.error.credentialFailed };
    default:
      return {
        en: "",
        vi: "",
      };
  }
}

function getResetPasswordError(res: { isError: boolean; data: any }) {
  if (typeof res.data === "undefined")
    return {
      en: "",
      vi: "",
    };

  const {
    data: { status, statusText, data },
  } = res;

  const { en, vi } = content;

  switch (data) {
    case "Old password not correct":
      return {
        en: en.error.oldPasswordNotCorrect,
        vi: vi.error.oldPasswordNotCorrect,
      };
    default:
      return {
        en: "",
        vi: "",
      };
  }
}
