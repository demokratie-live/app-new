import Folding from 'components/Folding';
import { useGovernmentVoteResultsQuery } from 'generated/graphql';
import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { PieChart } from '../PieChart';
import Carousel from 'pinar';
import { getTheme } from 'styles/theme';
import { Dimensions, View } from 'react-native';
import { ChartLegend, ChartLegendData } from 'components/Charts/ChartLegend';

const Container = styled(Carousel).attrs({
  activeDotStyle: {
    backgroundColor: getTheme().colors.primaryText,
    width: 8,
    height: 8,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },

  dotsContainerStyle: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    backgroundColor: getTheme().colors.secondaryText,
    width: 8,
    height: 8,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
})``;

const Description = styled.Text`
  align-self: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 12px;
`;

const Highlighted = styled(Description)`
  color: ${({ theme }) => theme.colors.primaryText};
`;

interface Props {
  procedureId: string;
}

export const GovernmentVoteResults: React.FC<Props> = ({ procedureId }) => {
  const themeContext = useContext(ThemeContext);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const { data } = useGovernmentVoteResultsQuery({
    variables: {
      procedureId,
    },
  });

  useEffect(() => {
    const width = Dimensions.get('window').width;
    setDimensions({ width, height: width });
  }, []);

  const votedColors = themeContext.colors.governmentVotes;

  const colorRange = [votedColors.yes, votedColors.abstination, votedColors.no];

  if (!data || data.procedure.voteResults?.yes === undefined) {
    return null;
  }

  const votesData = data.procedure.voteResults
    ? {
        yes: data.procedure.voteResults.yes,
        abstination: data.procedure.voteResults.abstination,
        no: data.procedure.voteResults.no,
      }
    : {
        yes: 0,
        abstination: 0,
        no: 0,
      };

  const voteType = data.procedure.voteResults.namedVote
    ? 'namentlich'
    : 'nicht-namentlich';

  const charts: any[] = [];
  if (data.procedure.voteResults) {
    const legendData: ChartLegendData[] = [
      {
        label: 'Zustimmungen',
        value: votesData.yes,
        color: colorRange[0],
      },
      {
        label: 'Enthaltungen',
        value: votesData.abstination,
        color: colorRange[1],
      },
      {
        label: 'Ablehnungen',
        value: votesData.no,
        color: colorRange[2],
      },
    ];

    const total =
      data.procedure.voteResults.yes +
      data.procedure.voteResults.abstination +
      data.procedure.voteResults.no +
      (data.procedure.voteResults.notVoted || 0);

    const innerTextTop =
      voteType === 'namentlich'
        ? total
        : data.procedure.voteResults.partyVotes.length;

    charts.push(
      <View key="governmentChart">
        <PieChart
          innerTextBottom={
            voteType === 'namentlich' ? 'Abgeordnete' : 'Fraktionen'
          }
          innerTextTop={`${innerTextTop}`}
          votesData={votesData}
          colors={colorRange}
          size={dimensions.width}
          total={total}
        />
        <ChartLegend data={legendData} />
      </View>,
    );
  }

  return (
    <Folding
      title="Bundestagsergebnis"
      // opened={data.procedure.voted}
      opened>
      <Container
        showsControls={false}
        style={{ height: dimensions.width + 30 }}>
        {charts}
      </Container>
      <Description>
        Diese Abstimmung wurde <Highlighted>{voteType}</Highlighted> abgestimmt
      </Description>
    </Folding>
  );
};
