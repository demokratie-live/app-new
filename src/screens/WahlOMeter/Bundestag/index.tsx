import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { WomBundestagHeader } from './Header';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const List = styled(FlatList as new () => FlatList<any>)`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const WomBundestagScreen: React.FC = () => {
  return (
    <Wrapper>
      <List
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={WomBundestagHeader}
      />
    </Wrapper>
  );
};
