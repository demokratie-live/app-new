import React from 'react';
import { Navigation } from './navigation';
import { InstructionsProvider } from './context/instructions';
import { lightTheme, darkTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { useColorScheme } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { client } from 'lib/apollo';

declare const global: { HermesInternal: null | {} };

const App = () => {
  const themeMode = useColorScheme();

  return (
    <InstructionsProvider>
      <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
        <ApolloProvider client={client}>
          <Navigation />
        </ApolloProvider>
      </ThemeProvider>
    </InstructionsProvider>
  );
};

export default App;
