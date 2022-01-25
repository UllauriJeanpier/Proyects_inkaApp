import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    margin: string;
    padding: string;
    colors: {
      text: {
        primary: string;
        secondary: string;
        copy: string,
        error: string;
      };
      buttons: {
        primary: string;
        secondary: string;
        link: string;
        default: string;
        outline: string;
      };
      error: string;
      background: string;
      primary: string;
      secondary: string;
      copy: string;
      third: string;
    };
    fonts: {
      nunito: {
        bold: string;
        light: string;
        regular: string;
      },
      nunitosans: {
        bold: string;
        light: string;
        regular: string;
      }
    };
  }
}
