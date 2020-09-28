import { Appearance } from 'react-native';
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
      communityVotes: {
        voted: {
          yes: string;
          abstination: string;
          no: string;
        };
        notVoted: {
          yes: string;
          abstination: string;
          no: string;
        };
      };
      governmentVotes: {
        yes: string;
        abstination: string;
        no: string;
        notVoted: string;
      };
    };
    paddings: {
      outer: string;
    };
  }
}

const paddings: DefaultTheme['paddings'] = {
  outer: '11px',
};

export const lightTheme: DefaultTheme = {
  primaryColor: '#333',
  secondaryColor: '#666',
  backgroundColor: '#fff',
  colors: {
    header: '#4494d3',
    white: '#fff',
    primaryText: '#333',
    secondaryText: '#8f8e94',
    primaryColoredText: '#4494d3',
    communityVotes: {
      voted: {
        yes: '#59BC6C',
        abstination: '#4183DD',
        no: '#DA4C3D',
      },
      notVoted: {
        yes: '#C7C7CC',
        abstination: '#D8D8D8',
        no: '#B0AFB7',
      },
    },
    governmentVotes: {
      yes: '#A1C655',
      abstination: '#65AED4',
      no: '#C24392',
      notVoted: '#AFB4B4',
    },
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
    primaryText: '#fff',
    secondaryText: '#fff8',
    primaryColoredText: '#4494d3bb',
    communityVotes: {
      voted: {
        yes: '#59BC6Caa',
        abstination: '#4183DDaa',
        no: '#DA4C3Daa',
      },
      notVoted: {
        yes: '#C7C7CCaa',
        abstination: '#D8D8D8aa',
        no: '#B0AFB7aa',
      },
    },
    governmentVotes: {
      yes: '#A1C655aa',
      abstination: '#65AED4aa',
      no: '#C24392aa',
      notVoted: '#AFB4B4aa',
    },
  },
  paddings,
};

export const getTheme = () =>
  Appearance.getColorScheme() === 'light' ? lightTheme : darkTheme;