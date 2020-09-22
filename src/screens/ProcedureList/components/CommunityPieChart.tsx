import React, { useContext, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { arc, pie, scaleOrdinal } from 'd3';
import { PieArcDatum } from 'd3-shape';
import { Group, Shape, Surface } from '@react-native-community/art';
import { CommunityVotesPieChartFragment } from 'generated/graphql';

const Container = styled.View`
  width: 20px;
  height: 20px;
`;

interface ChartEntry {
  name: string;
  value: number;
}

interface Props extends CommunityVotesPieChartFragment {}

const domain = ['yes', 'abstination', 'no'];

export const CommunityPieChart: React.FC<Props> = ({
  communityVotes,
  voted,
}) => {
  const themeContext = useContext(ThemeContext);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const preparedData = useMemo<ChartEntry[]>(() => {
    if (communityVotes) {
      return [
        {
          name: 'yes',
          value: communityVotes.yes,
        },
        {
          name: 'abstination',
          value: communityVotes.abstination,
        },
        {
          name: 'no',
          value: communityVotes.no,
        },
      ];
    }
    return [];
  }, [communityVotes]);

  const pieObj = pie<ChartEntry>()
    .value((d) => {
      return d.value;
    })
    .sort(({ name }) => domain.indexOf(name));

  const arcs = pieObj(preparedData);

  const paths = arcs.map((value, i) => {
    const path = arc<PieArcDatum<ChartEntry>>()
      .outerRadius(
        dimensions.width / 2 -
          dimensions.width / 15 +
          (i === 0 ? dimensions.width / 15 : 0),
      )
      .innerRadius(0)(value);
    //
    return path;
  });

  const {
    voted: votedColors,
    notVoted: notVotedColors,
  } = themeContext.colors.communityVotes;

  const colorRange = voted
    ? [votedColors.yes, votedColors.abstination, votedColors.no]
    : [notVotedColors.yes, notVotedColors.abstination, notVotedColors.no];

  const communityColors = scaleOrdinal<string>()
    .domain(['yes', 'abstination', 'no'])
    .range(colorRange);

  return (
    <Container
      onLayout={({ nativeEvent }) => {
        const { width, height } = nativeEvent.layout;
        setDimensions({ width: width, height: height });
      }}>
      <Surface {...dimensions}>
        <Group x={dimensions.width / 2} y={dimensions.height / 2}>
          {
            // pieChart has all the svg paths calculated in step 2)
            paths.map((item, index) =>
              item ? (
                <Shape
                  key={'pie_shape_' + index}
                  fill={communityColors(preparedData[index].name)}
                  strokeWidth={dimensions.width / 100}
                  d={item}
                />
              ) : null,
            )
          }
        </Group>
      </Surface>
    </Container>
  );
};
