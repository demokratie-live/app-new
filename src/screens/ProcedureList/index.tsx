import React, { useCallback, useState } from 'react';
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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BundestagTabNavigatorParamList } from 'navigation/Sidebar/Bundestag/TabNavigation';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import { CommunityPieChart } from './components/CommunityPieChart';
import { GovernmentPieChart } from './components/GovernmentPieChart';
import { ListItemSeperator } from 'components/ListItem/components/ListItemSeperator';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NetworkStatus } from '@apollo/client';

type ProfileScreenRouteProp = RouteProp<
  BundestagTabNavigatorParamList,
  'Sitzungswoche' | 'Top' | 'Vergangen'
>;

type NavigationProp = StackNavigationProp<
  BundestagStackNavigatorParamList,
  'Procedure'
>;

const LoadingContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Container = styled(FlatList as new () => FlatList<Procedure>)`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

type Props = {};

export const ProcedureList: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const [hasMoreData, setHasMoreData] = useState(true);

  const {
    data,
    loading,
    fetchMore,
    refetch,
    networkStatus,
  } = useProceduresListQuery({
    variables: {
      listTypes: [route.params.list],
      pageSize: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const currentProcedureLength = data?.procedures.length || 0;

  const keyExtractor = useCallback(({ procedureId }) => procedureId, []);
  const onEndReached = useCallback(() => {
    if (!loading && hasMoreData) {
      fetchMore({
        variables: {
          offset: currentProcedureLength,
        },
      }).then(({ data: fetchMoreData }) => {
        if (fetchMoreData.procedures.length === 0) {
          setHasMoreData(false);
        }
      });
    }
  }, [currentProcedureLength, fetchMore, hasMoreData, loading]);

  const renderItem: ListRenderItem<Procedure> = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          key={item.procedureId}
          onPress={() =>
            navigation.navigate('Procedure', {
              procedureId: item.procedureId,
              title: item.title,
            })
          }>
          <ListItem
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
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  const renderListFooterComponent = useCallback(() => {
    if (loading) {
      return <ActivityIndicator />;
    }
    return null;
  }, [loading]);

  const refreshing = networkStatus === NetworkStatus.refetch;

  if (!data) {
    return (
      <LoadingContainer>
        <Text>…Loading</Text>
      </LoadingContainer>
    );
  }

  return (
    <Container
      data={data.procedures as Procedure[]}
      renderItem={renderItem}
      onRefresh={refetch}
      refreshing={refreshing}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderListFooterComponent}
      scrollIndicatorInsets={{ right: 1 }}
      ItemSeparatorComponent={ListItemSeperator}
      // onEndReachedThreshold={1}
      onEndReached={onEndReached}
    />
  );
};
