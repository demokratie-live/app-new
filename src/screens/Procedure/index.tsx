import { RouteProp } from '@react-navigation/native';
import { ListItem } from 'components/ListItem';
import {
  ListItemFragmentDoc,
  useProcedureDetailQuery,
  CommunityVotesPieChartFragmentDoc,
  GovernmentVotesPieChartFragmentDoc,
} from 'generated/graphql';
import { filter } from 'graphql-anywhere';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import React from 'react';
import { CommunityPieChart } from 'screens/ProcedureList/components/CommunityPieChart';
import { GovernmentPieChart } from 'screens/ProcedureList/components/GovernmentPieChart';
import styled from 'styled-components/native';

type ProfileScreenRouteProp = RouteProp<
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
};

export const ProcedureDetailScreen: React.FC<Props> = ({
  route: {
    params: { title, procedureId },
  },
}) => {
  const { data } = useProcedureDetailQuery({
    variables: {
      id: procedureId,
    },
  });
  if (!data) {
    return <Text>…loading</Text>;
  }
  const { procedure } = data;
  return (
    <Container>
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
      <Text>{title}</Text>
      <Text>{procedure.procedureId}</Text>
    </Container>
  );
};
