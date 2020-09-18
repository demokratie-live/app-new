import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import {
  useProceduresListQuery,
  ListItemFragmentDoc,
  Procedure,
} from 'generated/graphql';
import { ListItem } from 'components/ListItem';
import { filter } from 'graphql-anywhere';
import { RouteProp } from '@react-navigation/native';
import { BundestagTabNavigatorParamList } from 'navigation/Sidebar/Bundestag/TabNavigation';

type ProfileScreenRouteProp = RouteProp<
  BundestagTabNavigatorParamList,
  'Sitzungswoche' | 'Top' | 'Vergangen'
>;

type Props = {
  route: ProfileScreenRouteProp;
};

const Container = styled(FlatList as new () => FlatList<Procedure>)`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const ProcedureList: React.FC<Props> = ({ route }) => {
  const { data, loading, fetchMore } = useProceduresListQuery({
    variables: {
      listTypes: [route.params.list],
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!data) {
    return <Text>…Loading</Text>;
  }

  const renderItem: ListRenderItem<Procedure> = ({ item }) => (
    <ListItem key={item.procedureId} {...filter(ListItemFragmentDoc, item)} />
  );

  const renderListFooterComponent = () => {
    if (loading) {
      return <ActivityIndicator />;
    }
    return null;
  };

  return (
    <Container
      data={data.procedures as Procedure[]}
      renderItem={renderItem}
      keyExtractor={({ procedureId }) => procedureId}
      ListFooterComponent={renderListFooterComponent}
      scrollIndicatorInsets={{ right: 1 }}
      onResponderEnd={() => {
        if (!loading) {
          fetchMore({
            variables: {
              offset: data.procedures.length,
            },
          });
        }
      }}
    />
  );
};
