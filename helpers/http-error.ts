import { mainConstant } from 'helpers';
import { useRouter } from 'next/router';
export const httpError = { handleResponseError };

function handleResponseError(res: { isError: boolean; data: any }) {
  const {
    data: { status, statusText },
  } = res;
  switch (status) {
    case 400:
      return 'Bad request';
    case 401:
      localStorage.clearItem(mainConstant.TOKEN_KEY);
      return 'Unotherized User';
    case 404:
      return 'Method now allowed';
    case 500:
      //errorStore.update(error);
      return 'Internal server error';
  }
}
