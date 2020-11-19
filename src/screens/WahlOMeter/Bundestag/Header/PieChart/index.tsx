import { ChartLegend, ChartLegendData } from 'components/Charts/ChartLegend';
import { useWomBundestagPieChartQuery } from 'generated/graphql';
import React, { useMemo } from 'react';
import {
  PieChart,
  VotesDataEntry,
} from 'screens/Procedure/components/PieChart';
import styled, { useTheme } from 'styled-components/native';

const Container = styled.View`
  background-color: teal;
  height: 500px;
`;

interface ChartData extends VotesDataEntry {
  matches: number;
  differences: number;
}

interface LocalVote {
  procedureId: string;
  selection: 'YES' | 'NO' | 'ABSTINATION';
}

interface Props {
  localVotes: LocalVote[];
}

export const WomBundestagPieChart: React.FC<Props> = ({ localVotes }) => {
  const theme = useTheme();
  const { data } = useWomBundestagPieChartQuery({
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: Infinity,
    },
  });

  const chartData = useMemo(() => {
    return (
      data?.womBundestagPieChart.procedures.reduce<ChartData>(
        (prev, { procedureId, voteResults }) => {
          if (voteResults) {
            const localDecision = localVotes.find(
              (v) => v.procedureId === procedureId,
            );
            if (voteResults.governmentDecision === localDecision?.selection) {
              return { ...prev, matches: prev.matches + 1 };
            }
            return { ...prev, differences: prev.differences + 1 };
          }
          return prev;
        },
        {
          matches: 0,
          differences: 0,
        },
      ) || {
        matches: 0,
        differences: 0,
      }
    );
  }, [data, localVotes]);

  const colors = [
    theme.colors.womCharts.matching,
    theme.colors.womCharts.notMatching,
  ];

  const legendData: ChartLegendData[] = [
    {
      label: 'Übereinstimmungen',
      value: chartData.matches,
      color: theme.colors.womCharts.matching,
    },
    {
      label: 'Differenzen',
      value: chartData.differences,
      color: theme.colors.womCharts.notMatching,
    },
  ];

  return (
    <Container>
      <PieChart
        colors={colors}
        innerTextBottom="Wahl-O-Meter"
        innerTextTop="Bundestag"
        votesData={chartData}
        size={500}
        total={15}
      />
      <ChartLegend data={legendData} />
    </Container>
  );
};
