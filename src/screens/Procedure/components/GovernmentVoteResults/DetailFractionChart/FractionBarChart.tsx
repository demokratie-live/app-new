import { scaleBand } from 'd3';
import React, { useContext } from 'react';
import Svg, { G, Text } from 'react-native-svg';
import { ThemeContext } from 'styled-components';
import { FractionBar } from './FractionBar';

export interface PartyData {
  party: string;
  deviants: {
    yes: number;
    abstination: number;
    no: number;
    notVoted?: number | null;
  };
}

interface Props {
  data: PartyData[];
  size: number;
  setSelectedParty: (i: number) => void;
  selectedParty: number;
}

export const FractionBarChart: React.FC<Props> = ({
  data,
  size,
  selectedParty,
  setSelectedParty,
}) => {
  const themeContext = useContext(ThemeContext);
  const margin = {
    top: 11,
    right: 11,
    bottom: 0,
    left: 80,
  };
  const innerWidth = size - margin.right - margin.left;
  const innerHeight = size - margin.top - margin.bottom - 13;

  const yValue = ({ party }: { party: string }) => party;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.2);

  return (
    <Svg width={size} height={size - 13}>
      <G translate={[margin.left, margin.top]}>
        {data.map(({ party, deviants }, i) => (
          <FractionBar
            onPress={() => setSelectedParty(i)}
            active={i === selectedParty}
            key={`bar-${party}`}
            y={yScale(party)}
            data={deviants}
            width={innerWidth}
            height={yScale.bandwidth()}
          />
        ))}
      </G>
      <G y={margin.top + 3}>
        {data.map(({ party }, i) => (
          <Text
            opacity={i === selectedParty ? 1 : 0.5}
            onPress={() => setSelectedParty(i)}
            key={`axis-${party}`}
            y={
              yScale.bandwidth() +
              ((yScale(party) || 0) - yScale.bandwidth() / 2)
            }
            fill={themeContext.colors.primaryText}>
            {party}
          </Text>
        ))}
      </G>
    </Svg>
  );
};
