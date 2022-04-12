import { mainConstant } from 'shared/constants';
export const previousPath = {
  getPreviousPath,
  setRedirect,
  getRedirect,
  clearRedirect,
};

function getPreviousPath() {
  const redirect = getRedirect();
  //return page which redirected to login or default protected page;
  return redirect || '/dashboard';
}

function setRedirect(redirect: string) {
  window.sessionStorage.setItem(mainConstant.REDIRECT_KEY, redirect);
}

function getRedirect(): string | null {
  return window.sessionStorage.getItem(mainConstant.REDIRECT_KEY);
}

function clearRedirect() {
  return window.sessionStorage.removeItem(mainConstant.REDIRECT_KEY);
}
