import dayjs from 'dayjs';

export const convertMilisecondsToString = (miliseconds: number): string => {
  const seconds = Math.floor((miliseconds / 1000) % 60);
  const minutes = Math.floor((miliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);

  const hoursInString = hours < 10 ? '0' + hours : hours;
  const minutesInString = minutes < 10 ? '0' + minutes : minutes;
  const secondsInString = seconds < 10 ? '0' + seconds : seconds;

  if (hours < 1) return minutesInString + ':' + secondsInString;
  else return hoursInString + ':' + minutesInString + ':' + secondsInString;
};

//DD//MM/YYYY HH:mm:ss
export const convertUTCToLocalTimeZone = (
  date: string | Date | null | undefined,
) => {
  if (!date) {
    return new Date();
  }
  if (typeof date === 'string') {
    const time = new Date();

    return dayjs(
      Date.parse(date) - time.getTimezoneOffset() * 60 * 1000,
    ).toDate();
  } else if (typeof date === 'object') {
    const time = new Date();

    return dayjs(
      date.getTime() - time.getTimezoneOffset() * 60 * 1000,
    ).toDate();
  }
  return new Date();
};

//MM/DD/YYYY HH:mm:ss
export const convertUTCToLocalTimeZone2 = (
  date: string | Date | null | undefined,
) => {
  if (!date) {
    return null;
  }
  const time = new Date();
  if (typeof date === 'string') {
    const time = new Date();

    return dayjs(
      Date.parse(date) - time.getTimezoneOffset() * 60 * 1000,
    ).toDate();
  } else if (typeof date === 'object') {
    const time = new Date();

    return dayjs(
      date.getTime() - time.getTimezoneOffset() * 60 * 1000,
    ).toDate();
  }
  return null;
};
