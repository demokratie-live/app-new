import { max, scaleLinear } from 'd3';
import { useCountryMapConstituenciesLazyQuery } from 'generated/graphql';
import React, { useContext, useEffect } from 'react';
import { G } from 'react-native-svg';
import styled, { ThemeContext } from 'styled-components/native';
import { constituencySvgs } from './Constituencies';
import { CountryMapSvg } from './CountryMapSvg';

const Container = styled.View`
  align-items: center;
`;

interface Props {
  procedureId: string;
}

export const CountryMap: React.FC<Props> = ({ procedureId }) => {
  const [loadConstituencies, { data }] = useCountryMapConstituenciesLazyQuery({
    variables: {
      procedureId,
    },
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    loadConstituencies();
  }, [loadConstituencies]);
  const theme = useContext(ThemeContext);
  if (!data?.procedure.communityVotes) {
    return null;
  }
  const allConstituencies = data.procedure.communityVotes;

  const maxVotersConstituency = max(
    allConstituencies.constituencies.map(({ total }) => total),
  );

  return (
    <Container>
      <CountryMapSvg width={300}>
        {allConstituencies.constituencies.map(
          ({ constituency, yes, abstination, no, total }) => {
            const yesNoValue = (yes - no) / total;
            const abstinationValue = abstination / total / 2;

            const colorValue =
              yesNoValue === 0
                ? 0
                : yesNoValue > 0
                ? yesNoValue - abstinationValue
                : yesNoValue + abstinationValue;
            const colorRange = scaleLinear()
              .domain([-1, 0, 1])
              .range([
                theme.colors.communityVotes.voted.no,
                theme.colors.communityVotes.voted.abstination,
                theme.colors.communityVotes.voted.yes,
              ]);
            const opacityRange = scaleLinear().domain([0, 1]).range([0.1, 1]);
            return (
              <G
                key={`constituency-${procedureId}-${constituency}`}
                opacity={opacityRange(
                  total / (maxVotersConstituency as number),
                )}>
                {constituencySvgs[constituency](colorRange(colorValue))}
              </G>
            );
          },
        )}
      </CountryMapSvg>
    </Container>
  );
};
