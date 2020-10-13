import { scaleLinear, scaleOrdinal, sum } from 'd3';
import React, { useContext } from 'react';
import { G, Rect } from 'react-native-svg';
import { ThemeContext } from 'styled-components';

interface Props {
  data: {
    yes: number;
    abstination: number;
    no: number;
    notVoted?: number | null;
  };
  width: number;
  height: number;
  y?: number;
  active: boolean;
  onPress: () => void;
}

export const FractionBar: React.FC<Props> = ({
  data: { yes, abstination, no, notVoted },
  width,
  height,
  y,
  active,
  onPress,
}) => {
  const themeContext = useContext(ThemeContext);
  const total = sum([yes, abstination, no, notVoted]);
  const xScale = scaleLinear().domain([0, total]).range([0, width]);

  const votedColors = themeContext.colors.governmentVotes;

  const deviantColorRange = scaleOrdinal<string>()
    .domain(['yes', 'abstination', 'no', 'notVoted'])
    .range([
      votedColors.yes,
      votedColors.abstination,
      votedColors.no,
      votedColors.notVoted,
    ]);

  const xAbstination = xScale(yes) || 0;
  const xNo = xAbstination + (xScale(abstination) || 0);
  const xNotVoted = xNo + (xScale(no) || 0);

  return (
    <G y={y} opacity={active ? 1 : 0.5} onPress={onPress}>
      <Rect
        width={xScale(yes)}
        height={height}
        fill={deviantColorRange('yes')}
        onPress={onPress}
      />
      <Rect
        x={xAbstination}
        width={xScale(abstination)}
        height={height}
        fill={deviantColorRange('abstination')}
        onPress={onPress}
      />
      <Rect
        x={xNo}
        width={xScale(no)}
        height={height}
        fill={deviantColorRange('no')}
        onPress={onPress}
      />
      {!!notVoted && (
        <Rect
          x={xNotVoted}
          width={xScale(notVoted)}
          height={height}
          fill={deviantColorRange('notVoted')}
          onPress={onPress}
        />
      )}
    </G>
  );
};
