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

export const convertUTCToLocalTimeZone = (date: string | Date | null) => {
  if (!date) {
    return new Date();
  } else if (typeof date === 'string') {
    var offset = new Date().getTimezoneOffset();

    return new Date();
  } else if (typeof date === 'object') {
    var offset = new Date().getTimezoneOffset();
    return new Date();
  }
};
