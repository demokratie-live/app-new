import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItem } from 'components/ListItem';
import { ListItemSeperator } from 'components/ListItem/components/ListItemSeperator';
import {
  ListItemFragmentDoc,
  useProcedureDetailQuery,
  CommunityVotesPieChartFragmentDoc,
  GovernmentVotesPieChartFragmentDoc,
  ProcedureDetailsFragmentDoc,
  ImportantDocumentsFragmentDoc,
  ProcedureHistoryFragmentDoc,
} from 'generated/graphql';
import { filter } from 'graphql-anywhere';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import React, { useEffect } from 'react';
import { CommunityPieChart } from 'screens/ProcedureList/components/CommunityPieChart';
import { GovernmentPieChart } from 'screens/ProcedureList/components/GovernmentPieChart';
import styled from 'styled-components/native';
import { CommuntiyVoteResults } from './components/CommunityVoteResults';
import { ProcedureDetails } from './components/Details';
import Documents from './components/Documents';
import { History } from './components/History';
import { SafeAreaView } from 'react-native';
import { GovernmentVoteResults } from './components/GovernmentVoteResults';

type ProfileScreenRouteProp = RouteProp<
  BundestagStackNavigatorParamList,
  'Procedure'
>;

type ProfileScreenNavigationProps = StackNavigationProp<
  BundestagStackNavigatorParamList,
  'Procedure'
>;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Text = styled.Text``;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProps;
};

export const ProcedureDetailScreen: React.FC<Props> = ({
  route: {
    params: { title, procedureId },
  },
  navigation,
}) => {
  const { data } = useProcedureDetailQuery({
    variables: {
      id: procedureId,
    },
  });
  useEffect(() => {
    if (title) {
      navigation.setOptions({ title });
    }
  }, [navigation, title]);

  if (!data) {
    return <Text>…loading</Text>;
  }
  const { procedure } = data;
  console.log('render Procedure');

  return (
    <Container scrollIndicatorInsets={{ right: 1 }}>
      <SafeAreaView>
        <ListItem
          {...filter(ListItemFragmentDoc, procedure)}
          renderPieCharts={[
            <GovernmentPieChart
              key={`government-piechart-${procedure.procedureId}`}
              {...filter(GovernmentVotesPieChartFragmentDoc, procedure)}
            />,
            <CommunityPieChart
              key={`community-piechart-${procedure.procedureId}`}
              {...filter(CommunityVotesPieChartFragmentDoc, procedure)}
            />,
          ]}
        />
        <ListItemSeperator />
        <ProcedureDetails {...filter(ProcedureDetailsFragmentDoc, procedure)} />
        <ListItemSeperator />
        <Documents {...filter(ImportantDocumentsFragmentDoc, procedure)} />
        <History {...filter(ProcedureHistoryFragmentDoc, procedure)} />
        <CommuntiyVoteResults procedureId={procedureId} />
        <GovernmentVoteResults procedureId={procedureId} />
      </SafeAreaView>
    </Container>
  );
};
