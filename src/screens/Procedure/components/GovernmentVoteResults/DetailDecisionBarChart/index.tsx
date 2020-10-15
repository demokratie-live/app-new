import React, { useContext, useState } from 'react';
import { DetailDecisionBarChartFragment } from 'generated/graphql';
import { FractionBarChart } from './FractionBarChart';
import styled, { ThemeContext } from 'styled-components/native';
import { ChartLegend } from 'components/Charts/ChartLegend';
import { ChartLegendData } from '../../../../../components/Charts/ChartLegend';

interface DecitionBarPart {
  party: string;
  sum: number;
}

interface DecitionChartData {
  yes: DecitionBarPart[];
  abstination: DecitionBarPart[];
  no: DecitionBarPart[];
  notVoted?: DecitionBarPart[];
}

interface Props extends DetailDecisionBarChartFragment {
  size: number;
}

const Container = styled.View`
  align-items: center;
`;

export const DetailDecisionBarChart: React.FC<Props> = ({
  voteResults,
  size,
}) => {
  const [selectedParty, setSelectedParty] = useState(0);
  const themeContext = useContext(ThemeContext);
  if (!voteResults) {
    return null;
  }

  const votedColors = themeContext.colors.governmentVotes;

  const decisionData = voteResults.partyVotes.reduce<DecitionChartData>(
    (prev, { deviants, party }) => {
      const notVoted = voteResults.namedVote
        ? deviants.notVoted
          ? [
              ...(prev.notVoted || []),
              {
                party,
                sum: deviants.notVoted || 0,
              },
            ]
          : prev.notVoted
        : undefined;
      return {
        ...prev,
        yes: deviants.yes
          ? [
              ...prev.yes,
              {
                party,
                sum: deviants.yes,
              },
            ]
          : prev.yes,
        abstination: deviants.abstination
          ? [
              ...prev.abstination,
              {
                party,
                sum: deviants.abstination,
              },
            ]
          : prev.abstination,
        no: deviants.no
          ? [
              ...prev.no,
              {
                party,
                sum: deviants.no,
              },
            ]
          : prev.no,
        notVoted,
      };
    },
    { yes: [], abstination: [], no: [] },
  );

  const chartLegendData: ChartLegendData[] = [
    {
      label: 'Zugestimmungen',
      value: decisionData.yes.reduce<number>((prev, { sum }) => prev + sum, 0),
      color: votedColors.yes,
    },
    {
      label: 'Enthaltungen',
      value: decisionData.abstination.reduce<number>(
        (prev, { sum }) => prev + sum,
        0,
      ),
      color: votedColors.abstination,
    },
    {
      label: 'Ablehnungen',
      value: decisionData.no.reduce<number>((prev, { sum }) => prev + sum, 0),
      color: votedColors.no,
    },
  ];

  if (decisionData.notVoted) {
    chartLegendData.push({
      label: 'Abwesend',
      value: decisionData.notVoted.reduce<number>(
        (prev, { sum }) => prev + sum,
        0,
      ),
      color: votedColors.notVoted,
    });
  }

  return (
    <Container>
      <FractionBarChart
        data={voteResults.partyVotes}
        size={size - 48}
        setSelectedParty={setSelectedParty}
        selectedParty={selectedParty}
      />
      <ChartLegend data={chartLegendData} />
    </Container>
  );
};
