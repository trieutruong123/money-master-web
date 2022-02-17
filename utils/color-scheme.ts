export const colorScheme = {
  white: '#ffffff',
  loading: 'rgba(0, 0, 0, 0.5)',
  theme: '#2D7CF3',
  black200: '#282727',
  red400: '#ef5350',
  red500: '#FA0606',
  blue300: '#08459A',
  gray600: '#5E5656',
  gray400: '#ABABAB',
  bg: '#FCFBFC',
  blue200: '#166CED',
  blue400: '#4ba9c8',
  purple600: '#D41789',
  facebook: '#4267B2',
  gray200: '#e0e0e0',
};

export const getRandomPallete = () => {
  const categories = [
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
  ];

  const types = ['main', 'light', 'dark'];
  const cateLen = categories.length;
  const typesLen = types.length;
  return `${categories[Math.floor(Math.random() * cateLen)]}.${
    types[Math.floor(Math.random() * typesLen)]
  }`;
};
