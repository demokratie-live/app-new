import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'components/Botton';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: blue;
`;

export const DevScreen: React.FC = () => {
  const clearAsyncStorage = () => {
    AsyncStorage.clear();
  };

  return (
    <Container>
      <Button
        onPress={clearAsyncStorage}
        text="clear AsyncStorage"
        textColor="white"
        backgroundColor="red"
      />
    </Container>
  );
};
