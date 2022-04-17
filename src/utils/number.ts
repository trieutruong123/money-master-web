type SeparatorType = '.'|',';

export const precisionRound = (number: number, precision: number, dot:SeparatorType|undefined = ',') => {
  if (precision < 0) {
    let factor = Math.pow(10, precision);
    return (Math.round(number * factor) / factor)
      .toString()
      .replace(/\./g, dot);
  } else
    return (+(Math.round(Number(number + 'e+' + precision)) + 'e-' + precision))
      .toString()
      .replace(/\./g, dot);
};

export const addDotAndCommaSeparator = (number: number | string) => {
  var x: string = number.toString();
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts.join(',');
};

export const roundAndAddDotAndCommaSeparator = (
  number: number,
  precision: number,
) => {
  return addDotAndCommaSeparator(precisionRound(number, precision,'.'));
};
