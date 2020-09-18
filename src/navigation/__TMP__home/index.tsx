import React, { FC } from 'react';
import { Text, Button } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../index';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Sidebar'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const HomeScreen: FC<Props> = ({ navigation }) => {
  return (
    <Container>
      <Text>Home Screen</Text>
      <Button
        onPress={() => navigation.navigate('Instructions')}
        title="Instructions"
      />
    </Container>
  );
};
