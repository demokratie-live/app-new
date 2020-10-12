import Folding from 'components/Folding';
import { ConstituencyContext } from 'context/constituency';
import { useCommunityVoteResultsQuery } from 'generated/graphql';
import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { PieChart } from '../PieChart';
import Carousel from 'pinar';
import { getConstituencySvg } from 'assets/svgs/constituencies';
import { getTheme } from 'styles/theme';
import GermanySvgComponent from 'assets/svgs/GermanySVG';
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

interface Props {
  procedureId: string;
}

export const CommuntiyVoteResults: React.FC<Props> = ({ procedureId }) => {
  const themeContext = useContext(ThemeContext);
  const { constituency } = useContext(ConstituencyContext);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const { data } = useCommunityVoteResultsQuery({
    variables: {
      procedureId,
      constituencies: constituency ? [constituency] : [],
    },
  });

  useEffect(() => {
    const width = Dimensions.get('window').width;
    setDimensions({ width, height: width });
  }, []);

  const { voted: votedColors } = themeContext.colors.communityVotes;

  const colorRange = [votedColors.yes, votedColors.abstination, votedColors.no];

  if (!data || data.procedure.communityVotes?.total === undefined) {
    return null;
  }

  const votesData = data.procedure.communityVotes
    ? {
        yes: data.procedure.communityVotes.yes,
        abstination: data.procedure.communityVotes.abstination,
        no: data.procedure.communityVotes.no,
      }
    : {
        yes: 0,
        abstination: 0,
        no: 0,
      };

  const votesDataConstituency = data.procedure.communityVotes?.constituencies[0]
    ? {
        yes: data.procedure.communityVotes?.constituencies[0].yes,
        abstination:
          data.procedure.communityVotes?.constituencies[0].abstination,
        no: data.procedure.communityVotes?.constituencies[0].no,
      }
    : {
        yes: 0,
        abstination: 0,
        no: 0,
      };

  const charts: any[] = [];
  if (data.procedure.communityVotes) {
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

    charts.push(
      <View key="communityChart">
        <PieChart
          topLeftText="Bundesweit"
          innerTextBottom="Abstimmende"
          innerTextTop={`${data.procedure.communityVotes.total}`}
          votesData={votesData}
          colors={colorRange}
          size={dimensions.width}
          total={data.procedure.communityVotes.total}
          topRightSvg={
            <GermanySvgComponent
              width={60}
              height={50}
              childProps={{
                fill: `${getTheme().colors.secondaryText}`,
                stroke: getTheme().colors.secondaryText,
                strokeWidth: '2%',
              }}
            />
          }
        />
        <ChartLegend data={legendData} />
      </View>,
    );
  }
  if (data.procedure.communityVotes?.constituencies[0]) {
    const DynComp = getConstituencySvg(
      data.procedure.communityVotes?.constituencies[0].constituency,
    );
    const legendData: ChartLegendData[] = [
      {
        label: 'Zustimmungen',
        value: votesDataConstituency.yes,
        color: colorRange[0],
      },
      {
        label: 'Enthaltungen',
        value: votesDataConstituency.abstination,
        color: colorRange[1],
      },
      {
        label: 'Ablehnungen',
        value: votesDataConstituency.no,
        color: colorRange[2],
      },
    ];

    charts.push(
      <View key="communityConstituencyChart">
        <PieChart
          topLeftText={`Wahlkreis ${data.procedure.communityVotes?.constituencies[0].constituency}`}
          colors={colorRange}
          innerTextBottom="Abstimmende"
          innerTextTop={`${data.procedure.communityVotes?.constituencies[0].total}`}
          total={data.procedure.communityVotes?.constituencies[0].total}
          votesData={votesDataConstituency}
          size={dimensions.width}
          topRightSvg={
            <DynComp.default
              width={60}
              height={50}
              childProps={{
                fill: `${getTheme().colors.secondaryText}`,
                stroke: getTheme().colors.secondaryText,
                strokeWidth: '2%',
              }}
            />
          }
        />
        <ChartLegend data={legendData} />
      </View>,
    );
  }
  return (
    <Folding title="Communityergebis" opened={data.procedure.voted}>
      <Container
        showsControls={false}
        style={{ height: dimensions.width + 30 }}>
        {charts}
      </Container>
      <Description>
        Dieses Ergebnis wurde nicht auf seine Repräsentativität überprüft
      </Description>
    </Folding>
  );
};
