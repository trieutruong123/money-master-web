export const storageService = {
  getLocalStorage,
  setLocalStorage,
  deleteLocalStorage,
  clearLocalStorage,
  getSessionStorage,
  setSessionStorage,
  deleteSessionStorage,
  clearSessionStorage,
  clearUser,
};

const TOKEN_KEY = 'SSID';

function getLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  return data;
}

function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

function deleteLocalStorage(key: string) {
  localStorage.removeItem(key);
}

function clearLocalStorage() {
  localStorage.clear();
}

function getSessionStorage(key: string) {
  const data = sessionStorage.getItem(key);
  return data;
}

function setSessionStorage(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

function deleteSessionStorage(key: string) {
  sessionStorage.removeItem(key);
}

function clearSessionStorage() {
  sessionStorage.clear();
}

function clearUser() {
  deleteLocalStorage(TOKEN_KEY);
}
