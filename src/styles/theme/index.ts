import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    colors: {
      header: string;
      white: string;
      primaryText: string;
      secondaryText: string;
      primaryColoredText: string;
    };
    paddings: {
      outer: string;
    };
  }
}

const paddings: DefaultTheme['paddings'] = {
  outer: '18px',
};

export const lightTheme: DefaultTheme = {
  primaryColor: '#333',
  secondaryColor: '#666',
  backgroundColor: '#fff',
  colors: {
    header: '#4494d3',
    white: '#fff',
    primaryText: '#333',
    secondaryText: '#666',
    primaryColoredText: '#4494d3',
  },
  paddings,
};

export const darkTheme: DefaultTheme = {
  primaryColor: '#fff',
  secondaryColor: '#cacaca',
  backgroundColor: '#333',
  colors: {
    header: '#224b6b',
    white: '#fffb',
    primaryText: '#fffb',
    secondaryText: '#fff8',
    primaryColoredText: '#4494d3bb',
  },
  paddings,
};

export const getTheme = () => darkTheme;
