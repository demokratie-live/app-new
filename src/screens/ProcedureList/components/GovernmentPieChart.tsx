import React, { useContext, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { arc, pie, scaleOrdinal } from 'd3';
import { PieArcDatum } from 'd3-shape';
import { Group, Shape, Surface } from '@react-native-community/art';
import { GovernmentVotesPieChartFragment } from 'generated/graphql';

const Container = styled.View`
  width: 20px;
  height: 20px;
`;

interface ChartEntry {
  name: string;
  value: number;
}

interface Props extends GovernmentVotesPieChartFragment {}

const domain = ['yes', 'abstination', 'no', 'notVoted'];

export const GovernmentPieChart: React.FC<Props> = ({ voteResults }) => {
  const themeContext = useContext(ThemeContext);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const preparedData = useMemo<ChartEntry[]>(() => {
    if (voteResults) {
      return [
        {
          name: 'yes',
          value: voteResults.yes,
        },
        {
          name: 'abstination',
          value: voteResults.abstination,
        },
        {
          name: 'no',
          value: voteResults.no,
        },
        {
          name: 'notVoted',
          value: voteResults.notVoted || 0,
        },
      ];
    }
    return [];
  }, [voteResults]);

  const pieObj = pie<ChartEntry>()
    .value((d) => {
      return d.value;
    })
    .sort(({ name }) => domain.indexOf(name));

  const arcs = pieObj(preparedData);

  const paths = arcs.map((value) => {
    const path = arc<PieArcDatum<ChartEntry>>()
      .outerRadius(dimensions.width / 2)
      .innerRadius(0)(value);
    //
    return path;
  });

  const votedColors = themeContext.colors.governmentVotes;

  const colorRange = [votedColors.yes, votedColors.abstination, votedColors.no];

  const communityColors = scaleOrdinal<string>()
    .domain(domain)
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
