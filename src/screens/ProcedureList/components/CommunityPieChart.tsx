import React, { useContext, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { arc, pie, scaleOrdinal } from 'd3';
import { PieArcDatum } from 'd3-shape';
import { Group, Shape, Surface } from '@react-native-community/art';
import { CommunityVotesPieChartFragment } from 'generated/graphql';
import { LocalVotesContext } from 'context/LocalVotes';

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
  procedureId,
}) => {
  const themeContext = useContext(ThemeContext);
  const { getLocalVoteSelection } = useContext(LocalVotesContext);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const voteDecision = useMemo(() => {
    if (voted) {
      return getLocalVoteSelection(procedureId);
    }
    return;
  }, [getLocalVoteSelection, procedureId, voted]);

  const preparedData = useMemo<ChartEntry[]>(() => {
    if (communityVotes) {
      return [
        {
          name: 'YES',
          value: communityVotes.yes,
        },
        {
          name: 'ABSTINATION',
          value: communityVotes.abstination,
        },
        {
          name: 'NO',
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

  const paths = arcs.map((value) => {
    const path = arc<PieArcDatum<ChartEntry>>()
      .outerRadius(
        dimensions.width / 2 -
          dimensions.width / 10 +
          (value.data.name === voteDecision ? dimensions.width / 10 : 0),
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
    .domain(['YES', 'ABSTINATION', 'NO'])
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
