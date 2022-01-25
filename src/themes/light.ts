import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  borderRadius: '16px',
  margin: '5px 0px',
  padding: '5px 8px',
  colors: {
    text: {
      primary: '#FE761E',
      secondary: '#36798C',
      copy: '#848484',
      error: '#EB5757',
    },
    buttons: {
      primary: '#FE761E',
      secondary: '#36798C',
      link: 'transparent',
      default: '#FFF',
      outline: '#FFF',
    },
    error: '#EB5757',
    background: '#ecf1f7',
    primary: '#FE761E',
    secondary: '#CCD8E5',
    copy: '#DBE3EC',
    third: '#6483A5',
  },
  fonts: {
    nunito: {
      bold: 'Nunito-Bold',
      light: 'Nunito-Light',
      regular: 'Nunito-Regular',
    },
    nunitosans: {
      bold: 'NunitoSans-Bold',
      light: 'NunitoSans-Light',
      regular: 'NunitoSans-Regular',
    },
  },
};
