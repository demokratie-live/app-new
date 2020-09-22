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
  CommunityVotesPieChartFragmentDoc,
  GovernmentVotesPieChartFragmentDoc,
} from 'generated/graphql';
import { ListItem } from 'components/ListItem';
import { filter } from 'graphql-anywhere';
import { RouteProp } from '@react-navigation/native';
import { BundestagTabNavigatorParamList } from 'navigation/Sidebar/Bundestag/TabNavigation';
import { CommunityPieChart } from './components/CommunityPieChart';
import { GovernmentPieChart } from './components/GovernmentPieChart';
import { ListItemSeperator } from 'components/ListItem/components/ListItemSeperator';

type ProfileScreenRouteProp = RouteProp<
  BundestagTabNavigatorParamList,
  'Sitzungswoche' | 'Top' | 'Vergangen'
>;

type Props = {
  route: ProfileScreenRouteProp;
};

const LoadingContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

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
    return (
      <LoadingContainer>
        <Text>…Loading</Text>
      </LoadingContainer>
    );
  }

  const renderItem: ListRenderItem<Procedure> = ({ item }) => (
    <ListItem
      key={item.procedureId}
      {...filter(ListItemFragmentDoc, item)}
      renderPieCharts={[
        <GovernmentPieChart
          key={`government-piechart-${item.procedureId}`}
          {...filter(GovernmentVotesPieChartFragmentDoc, item)}
        />,
        <CommunityPieChart
          key={`community-piechart-${item.procedureId}`}
          {...filter(CommunityVotesPieChartFragmentDoc, item)}
        />,
      ]}
    />
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
      ItemSeparatorComponent={ListItemSeperator}
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
