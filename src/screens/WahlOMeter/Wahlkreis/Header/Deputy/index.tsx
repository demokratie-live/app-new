import React, { useContext } from 'react';
import styled from 'styled-components/native';

// Components
import {
  ProfilFragmentDoc,
  useWomDeputyQuery,
  WomDeputyChartFragmentDoc,
} from 'generated/graphql';
import { ConstituencyContext } from 'context/constituency';
import { DeputyProfile } from './Profil';
import { filter } from 'graphql-anywhere';
import { LocalVotesContext } from 'context/LocalVotes';
import { WomDeputyChart } from './Chart';

const Wrapper = styled.View`
  padding-top: 18px;
`;

const ChartWrapper = styled.View`
  align-items: center;
`;

interface Props {}

export const WomDeputy: React.FC<Props> = () => {
  const { constituency } = useContext(ConstituencyContext);
  const { localVotes } = useContext(LocalVotesContext);
  const { data, error } = useWomDeputyQuery({
    variables: {
      constituency,
      directCandidate: true,
      procedureIds: localVotes.map((lv) => lv.procedureId),
    },
  });
  console.log({ data, error });
  if (!data || !data.womDeputy[0]) {
    return null;
  }
  return (
    <Wrapper>
      <ChartWrapper>
        <DeputyProfile {...filter(ProfilFragmentDoc, data.womDeputy[0])} />
      </ChartWrapper>
      <WomDeputyChart
        {...filter(WomDeputyChartFragmentDoc, data.womDeputy[0])}
      />
    </Wrapper>
  );
};
